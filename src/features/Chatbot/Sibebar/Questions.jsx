import { useSelector } from "react-redux";
import QuestionItem from "./QuestionItem";

function Questions() {
  const questions = useSelector((state) => state.chat.questions);
  console.log(questions);

  return (
    <>
      {questions.length !== 0 && (
        <h2 className='text-purple-400 text-xl font-semibol'>Chat History</h2>
      )}
      <ul className='flex flex-1 relative flex-col mt-2 h-[calc(100vh-14.5rem)] overflow-y-auto'>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            title={question.title}
            id={question.id}
          />
        ))}
      </ul>
    </>
  );
}
export default Questions;
