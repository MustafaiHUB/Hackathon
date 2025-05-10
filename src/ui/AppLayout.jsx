import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function AppLayout() {
  // const location = useLocation();
  // const displayHeader =
  //   location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className=''>
      <Header />
      <main className='h-full grid place-items-center'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
