function TextareaInput({
  // handleQuestion,
  questionAreaRef,
  setQuestion,
  isMultiline,
  question,
}) {
  return (
    // <form onSubmit={handleQuestion}>
    <div>
      <textarea
        placeholder='Ask a question'
        name='question'
        value={question}
        ref={questionAreaRef}
        onChange={(e) => setQuestion(e.target.value)}
        className={`w-full p-4 pr-12 text-stone-200 ${
          isMultiline ? "rounded-lg" : "rounded-full"
        } shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#282a2c] resize-none textarea`}
      />
    </div>
    // </form>
  );
}

export default TextareaInput;
