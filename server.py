import sqlite3
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import time
import os
import psycopg2
from openai import OpenAI
import re
import io
import time
import logging
import textwrap
from datetime import datetime
import requests
import json
import schedule
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from typing import List, Tuple, Union # Already imported if in same file
import csv
app = Flask(__name__)
CORS(app)

# API Key are here just for testing purposes, please use environment variables in production
client = OpenAI(api_key="your-api-key")
ASSISTANT_ID = "asst_672kAZvipQVYC8EkIRnJR420"

responses = {}
threads = {}
messageToPDF = ""

# Configuration – consider loading these from environment variables for security
DELIVER_API_URL = os.getenv("DELIVER_API_URL", "http://localhost:8080/send-pdf")
DAILY_TIME      = os.getenv("DAILY_TIME", "02:00")  # 24‑hour HH:MM when the job runs
OUTPUT_DIR      = os.getenv("OUTPUT_DIR", "./pdf_output")
DB_CONFIG = {
    'host': 'localhost',
    'database': 'ayeshi',
    'user': 'postgres',
    'password': 'H@mza2300settW'
}
CSV_FILE = r"C:\\Users\\omars\\Desktop\\jordan_transactions.csv"
# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Connect to the SQLite database (it will create the file if it doesn't exist)
def load_csv_to_postgres():
    connection = psycopg2.connect(**DB_CONFIG)
    cursor = connection.cursor()
    cursor.execute("SELECT COUNT(*) FROM jordan_transactions;")
    count = cursor.fetchone()[0]

    if count > 0:
        print("Data already loaded. Skipping CSV import.")
        cursor.close()
        connection.close()
        return

    with open(CSV_FILE, 'r', newline='', encoding='utf-8') as f:
        reader = csv.reader(f)
        headers = next(reader)
        cursor.execute(f"CREATE TABLE IF NOT EXISTS jordan_transactions ({', '.join([f'{h} TEXT' for h in headers])});")
        insert_query = f"INSERT INTO jordan_transactions ({', '.join(headers)}) VALUES ({', '.join(['%s'] * len(headers))});"
        for row in reader:
            cursor.execute(insert_query, row)

    connection.commit()
    cursor.close()
    connection.close()


load_csv_to_postgres()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)
logger = logging.getLogger(__name__)

# Sample messages (string or list)
listMessages = "hi, my name is John Doe. I am a software engineer. I love coding. hello hello"

# Ensure messages is a list of strings
def normalize_messages(messages):
    if isinstance(messages, str):
        return [messages]
    if isinstance(messages, list):
        return [str(m) for m in messages]
    return [str(messages)]


def messages_to_pdf_bytes(messages):
    """Render messages into a PDF and return it as bytes, wrapping text normally."""
    messages = normalize_messages(messages)
    buffer = io.BytesIO()
    c = canvas.Canvas(buffer, pagesize=A4)
    width, height = A4

    x_margin = 50
    y = height - 50
    line_height = 14
    max_width = width - 2 * x_margin
    # Approximate character count per line (monospace approx)
    wrap_chars = int(max_width / 7)

    for msg in messages:
        # wrap long text into lines
        wrapped = textwrap.wrap(msg, width=wrap_chars)
        for line in wrapped:
            if y < 50:
                c.showPage()
                y = height - 50
            c.drawString(x_margin, y, line)
            y -= line_height
        # add a blank line between messages
        y -= line_height

    c.showPage()
    c.save()
    buffer.seek(0)
    return buffer


def save_pdf_locally(buffer, prefix="messages"):
    timestamp = datetime.utcnow().strftime("%Y%m%dT%H%M%SZ")
    filename = f"{prefix}_{timestamp}.pdf"
    filepath = os.path.join(OUTPUT_DIR, filename)
    with open(filepath, "wb") as f:
        f.write(buffer.getvalue())
    logger.info(f"Saved PDF locally: %s", filepath)
    return filepath


def deliver_pdf(pdf_buffer):
    pdf_buffer.seek(0)  # Make sure pointer is at the start
    files = {'file': ('report.pdf', pdf_buffer, 'application/pdf')}
    resp = requests.post('http://localhost:8080/send-pdf', files=files)
    resp.raise_for_status()
    return resp.json()


def daily_job():
    try:
        logger.info("Starting daily job")
        thread = client.beta.threads.create(messages=[{"role": "user", "content": "Give me a summary for the past day about the failed transactions with details."}])

        client.beta.assistants.retrieve(ASSISTANT_ID)
        run = client.beta.threads.runs.create(thread_id=thread.id, assistant_id=ASSISTANT_ID)

        # while run != "completed":
        #     run = client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)
        #     time.sleep(1)

        messages = client.beta.threads.messages.list(thread_id=thread.id)
        new_message = messages.data[0].content[0].text.value

        toolused = 0
        while True:
            print(f"Run Status: {run.status}")
            
            if run.status == "requires_action":
                toolused = 1
                required_tool_calls = run.required_action.submit_tool_outputs.tool_calls

                tool_outputs = []
                for tool_call in required_tool_calls:
                    tool_id = tool_call.id
                    tool_name = tool_call.function.name
                    tool_args = tool_call.function.arguments

                    print(f"Handling tool call: {tool_name} with args: {tool_args}")

                    # For now, respond with a placeholder (or process tool_args as needed)
                    query_string = json.loads(tool_args).get("query")
                    query_result = run_sql_query(query_string)

                    tool_outputs.append({
                        "tool_call_id": tool_id,
                        "output": str(query_result)  # Convert the result to string or JSON
                    })


                run = client.beta.threads.runs.submit_tool_outputs(
                    thread_id=thread.id,
                    run_id=run.id,
                    tool_outputs=tool_outputs
                )

            elif run.status == "completed":
                break

            else:
                time.sleep(1)
                run = client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)


        # Retrieve the generated message
        messages = client.beta.threads.messages.list(thread_id=thread.id)
        new_message = messages.data[0].content[0].text.value

        # new_message = clean_text(new_message)
        if(toolused == 1):
            new_message = run_sql_query(new_message)
            
        msgs = new_message
        if not msgs:
            logger.info("No messages fetched – skipping PDF generation.")
            return

        logger.info("Generating PDF for messages...")
        pdf_buf = messages_to_pdf_bytes(msgs)

        # Save locally
        save_pdf_locally(pdf_buf)

        # Deliver downstream
        logger.info("Delivering PDF to API...")
        result = deliver_pdf(pdf_buf)
        logger.info("Delivery succeeded: %s", result)

    except Exception:
        logger.exception("Error in daily job")
        
def get_mall_transactions():
    return

# Clean up the output text
def clean_text(text):
    if not text:
        return ""
    text = re.sub(r'【.*?】', '', text)  # Remove text within 【】 brackets
    text = text.replace('*', '')        # Remove asterisks
    text = text.replace('#', '')        # Remove hash symbols
    return text

# Function to generate audio using OpenAI and store it
def process_audio(response_id):
    text_answer = responses[response_id]['answer']
    print("audio")
    # Generate speech from text
    audio_response = client.audio.speech.create(
        model="tts-1",
        # model="gpt-4o-mini-tts",
        voice="onyx",
        # voice="coral",
        input=text_answer,
    )
    
    audio_file_path = f"output_{response_id}.mp3"
    
    # Save the audio to a file
    with open(audio_file_path, "wb") as f:
        f.write(audio_response.content)

    # Store the path in the responses dictionary
    responses[response_id]['audio_file'] = audio_file_path


def run_sql_query(query: str) -> Union[List[Tuple], str]:
    """
    Executes a read-only SQL query on the given SQLite database.
    """
    print(f"Executing SQL: {query.strip()}")
    if not query.strip().lower().startswith("select"):
        return query.strip().lower()
    try:
        connection = psycopg2.connect(**DB_CONFIG)
        cursor = connection.cursor()
        cursor.execute(query)
        results = cursor.fetchall()
        columns = [desc[0] for desc in cursor.description]
        cursor.close()
        connection.close()
        return {"columns": columns, "rows": results}

    except sqlite3.Error as e:
        return f"SQL execution error: {str(e)}" # Return error as a string
    except Exception as e:
        return f"An unexpected error occurred during SQL execution: {str(e)}"
# Endpoint to handle user questions
@app.route('/ask', methods=['POST'])
def ask():
    user_question = request.json.get('question')
    blind_mode = request.json.get('blind_mode', False)
    thread_id = request.json.get('thread_id')  # <== Get thread_id from frontend

    print(f"Received thread_id: {thread_id}")


    if not user_question:
        return jsonify({'error': 'No question provided--------------++++++++++++++++++++++'}), 400

    print(f"User Question: {user_question}")
    print(f"Blind Mode: {blind_mode}")
    print(f"Thread ID: {thread_id}")

    # Create a new thread only if none was provided
    if not thread_id:
        thread = client.beta.threads.create(messages=[{"role": "user", "content": user_question}])
        thread_id = thread.id
    else:
        client.beta.threads.messages.create(thread_id=thread_id, role="user", content=user_question)

    my_assistant = client.beta.assistants.retrieve(ASSISTANT_ID)
    print(my_assistant)
    run = client.beta.threads.runs.create(thread_id=thread_id, assistant_id=ASSISTANT_ID)
    toolused = 0
    while True:
        print(f"Run Status: {run.status}")
        
        if run.status == "requires_action":
            toolused = 1
            required_tool_calls = run.required_action.submit_tool_outputs.tool_calls

            tool_outputs = []
            for tool_call in required_tool_calls:
                tool_id = tool_call.id
                tool_name = tool_call.function.name
                tool_args = tool_call.function.arguments

                print(f"Handling tool call: {tool_name} with args: {tool_args}")

                # For now, respond with a placeholder (or process tool_args as needed)
                query_string = json.loads(tool_args).get("query")
                query_result = run_sql_query(query_string)

                tool_outputs.append({
                    "tool_call_id": tool_id,
                    "output": str(query_result)  # Convert the result to string or JSON
                })


            run = client.beta.threads.runs.submit_tool_outputs(
                thread_id=thread_id,
                run_id=run.id,
                tool_outputs=tool_outputs
            )

        elif run.status == "completed":
            break

        else:
            time.sleep(1)
            run = client.beta.threads.runs.retrieve(thread_id=thread_id, run_id=run.id)


    # Retrieve the generated message
    messages = client.beta.threads.messages.list(thread_id=thread_id)
    new_message = messages.data[0].content[0].text.value

    # new_message = clean_text(new_message)
    if(toolused == 1):
       new_message = run_sql_query(new_message)
        

    print(f"Generated Answer: {new_message}")

    response_id = str(time.time())

    responses[response_id] = {
        'answer': new_message,
        'audio_file': None
    }

    if blind_mode:
        process_audio(response_id)
        while 'audio_file' not in responses[response_id] or not responses[response_id]['audio_file']:
            time.sleep(0.5)

        return jsonify({
            'answer': new_message,
            'response_id': response_id,
            'audio_file': f"/audio/{responses[response_id]['audio_file']}",
            'thread_id': thread_id  # return it so frontend can reuse
        })
    else:
        return jsonify({
            'answer': new_message,
            'response_id': response_id,
            'thread_id': thread_id  # return it so frontend can reuse
        })

# New route to upload files to the assistant
@app.route('/upload', methods=['POST'])
def upload_file():
    # Check if the post request has the files part
    if 'files[]' not in request.files:
        return jsonify({'error': 'No files part in the request'}), 400
    
    files = request.files.getlist('files[]')
    
    # Check if any files were selected
    if not files or all(file.filename == '' for file in files):
        return jsonify({'error': 'No files selected'}), 400
    
    try:
        # 1. First get the current vector_store_id from the assistant
        my_assistant = client.beta.assistants.retrieve(ASSISTANT_ID)
        
        # Extract the current vector store ID
        current_vector_store_ids = []
        if (hasattr(my_assistant, 'tool_resources') and 
            my_assistant.tool_resources and 
            hasattr(my_assistant.tool_resources, 'file_search') and
            my_assistant.tool_resources.file_search and
            hasattr(my_assistant.tool_resources.file_search, 'vector_store_ids')):
            current_vector_store_ids = my_assistant.tool_resources.file_search.vector_store_ids
        
        current_vector_store_id = current_vector_store_ids[0] if current_vector_store_ids else None
        
        # 2. Upload all files to OpenAI
        uploaded_file_ids = []
        uploaded_filenames = []
        
        for file in files:
            if file.filename != '':
                file_content = file.read()
                file_io = io.BytesIO(file_content)
                file_io.name = file.filename
                
                uploaded_file = client.files.create(
                    file=file_io,
                    purpose="assistants"
                )
                
                uploaded_file_ids.append(uploaded_file.id)
                uploaded_filenames.append(file.filename)
        
        # Get all existing files if we have a current vector store
        all_file_ids = []
        if current_vector_store_id:
            try:
                vector_store_files = client.beta.vector_stores.files.list(
                    vector_store_id=current_vector_store_id
                )
                # Extract existing file IDs
                all_file_ids = [file.id for file in vector_store_files.data]
            except Exception as e:
                print(f"Error retrieving files from current vector store: {str(e)}")
        
        # Add the new file IDs to the list
        all_file_ids.extend(uploaded_file_ids)
        
        # 3. Create a new vector store that holds the previous + the new files
        new_vector_store = client.beta.vector_stores.create(
            file_ids=all_file_ids
        )
        
        new_vector_store_id = new_vector_store.id
        
        # 4. Attach the new vector_store_id to the assistant
        assistant = client.beta.assistants.update(
            assistant_id=ASSISTANT_ID,
            tool_resources={
                "file_search": {
                    "vector_store_ids": [new_vector_store_id]
                }
            }
        )
        
        return jsonify({
            'message': f'{len(uploaded_file_ids)} files uploaded successfully',
            'uploaded_file_ids': uploaded_file_ids,
            'uploaded_filenames': uploaded_filenames,
            'previous_vector_store_id': current_vector_store_id,
            'new_vector_store_id': new_vector_store_id,
            'assistant_updated': True,
            'total_files': len(all_file_ids)
        })
        
    except Exception as e:
        # If there's an error anywhere in the process
        print(f"Error processing file uploads: {str(e)}")
        return jsonify({
            'error': f'Error processing file uploads: {str(e)}'
        }), 500

# Endpoint to retrieve the response
@app.route('/get_response/<response_id>', methods=['GET'])
def get_response(response_id):
    if response_id not in responses:
        return jsonify({'error': 'Invalid response ID'}), 404
    
    # If audio is still being processed, return a status update
    if 'audio_file' not in responses[response_id] or not responses[response_id]['audio_file']:
        return jsonify({
            'answer': responses[response_id]['answer'],
            'status': 'Processing audio'
        }), 202
    
    # Return the response along with the audio file path
    return jsonify({
        'answer': responses[response_id]['answer'],
        'audio_file': f"/audio/{responses[response_id]['audio_file']}"
    })

# Endpoint to stream audio directly from the server
@app.route('/audio/<filename>', methods=['GET'])
def stream_audio(filename):
    file_path = os.path.join(os.getcwd(), filename)
    
    if os.path.exists(file_path):
        # Return the audio file for direct playback (not download)
        return send_file(file_path, mimetype='audio/mpeg')
    
    return jsonify({'error': 'Audio file not found'}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)
    logger.info("Scheduler started, will run daily at %s", DAILY_TIME)
    daily_job()
    schedule.every().day.at(DAILY_TIME).do(daily_job)
    while True:
        schedule.run_pending()
        time.sleep(30)