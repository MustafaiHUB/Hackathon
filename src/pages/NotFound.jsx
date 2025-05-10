import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-900 text-white'>
      <h1 className='text-6xl font-bold mb-4'>404</h1>
      <p className='text-2xl mb-8'>Page Not Found</p>
      <Link
        to='/'
        className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300'
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;
