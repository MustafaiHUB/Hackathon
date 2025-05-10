function SpecialText({ children, className }) {
  return (
    <h1
      className={`grid place-items-center text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 bg-clip-text text-transparent px-2 text-center ${
        className && className
      }`}
    >
      {children}
    </h1>
  );
}

export default SpecialText;
