function AccountMenuButton({
  handleOpenAccountMenu,
  openAccountMenu,
  firstName,
  lastName,
}) {
  return (
    <button
      onClick={handleOpenAccountMenu}
      className={`flex items-center text-stone-200 w-full max-w-[100%] hover:bg-[#212121] p-2 rounded-xl transition-all duration-300 ${
        openAccountMenu ? "bg-[#212121]" : ""
      }`}
    >
      <span className='rounded-full bg-purple-400 w-10 h-10 mr-3 flex items-center justify-center'>
        {firstName && lastName && firstName[0] + lastName[0]}
      </span>
      <div dir='auto'>
        {firstName} {lastName}
      </div>
    </button>
  );
}

export default AccountMenuButton;
