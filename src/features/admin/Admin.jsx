import { lazy, useEffect } from "react";
import { replace, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import AdminLogin from "./AdminLogin";
const AdminUpload = lazy(() => import("./AdminUpload"));

// import AdminUpload from "./AdminUpload";

function Admin() {
  return (
    <div className='bg-[#212121] h-[100dvh] w-full flex relative'>
      <main className='bg-red-50 w-full '>
        <AdminUpload />
      </main>
    </div>
  );
}

export default Admin;
