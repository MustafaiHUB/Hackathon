function HeroSection() {
  return (
    <div className='h-[78dvh]'>
      <section className='py-10 h-full flex justify-center items-center'>
        <div>
          <div className='text-center'>
            <h1 className='text-4xl font-semibold'>Welcome to FinAdvisor</h1>
            <p className='text-sm'>Financial RAG System</p>
          </div>
          <p className='px-10 md:px-28 text-center mt-10 text-xl'>
            Your personal finance assistant, powered by advanced AI technology.
            Get instant answers to your financial questions, personalized
            advice, and insights to help you make informed decisions.
          </p>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;
