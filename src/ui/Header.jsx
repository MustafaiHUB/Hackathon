import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";

function Header() {
  return (
    <header className='flex items-center justify-between px-10 py-3 bg-[#192836] shadow-xl shadow-slate-700'>
      <span className='text-stone-300 text-2xl font-mono'>FinAdvisor</span>
      <Logo className='h-[75px]' />
      <HeaderMenu />
    </header>
  );
}

export default Header;
