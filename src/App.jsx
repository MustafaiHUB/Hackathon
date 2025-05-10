// Packages
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
const Chatbot = lazy(() => import("./pages/Chatbot"));
const ConfirmEmail = lazy(() => import("./pages/ConfirmEmail"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Admin = lazy(() => import("./features/admin/Admin"));
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

// Features
const NewChat = lazy(() => import("./features/Chatbot/Chat/NewChat"));
import Chat from "./features/Chatbot/Chat/Chat";
import LoaderFullPage from "./ui/LoaderFullPage";
// Loader & Actions
import { loader as conversationLoader } from "./features/Chatbot/Chat/Chat";
// Services & Context
import { SidebarProvider } from "./context/SidebarContext";
import ProtectedRoute from "./services/ProtectedRoute";
import ProtectedAdmin from "./services/ProtectedAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<LoaderFullPage />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<LoaderFullPage />}>
        <Signup />
      </Suspense>
    ),
  },
  {
    path: "/chatbot",
    element: (
      // <SidebarProvider>
      <ProtectedRoute>
        <Suspense fallback={<LoaderFullPage />}>
          <Chatbot />
        </Suspense>
      </ProtectedRoute>
      // </SidebarProvider>
    ),
    children: [
      {
        path: ":chatId",
        element: (
          <Suspense fallback={<LoaderFullPage />}>
            <Chat />
          </Suspense>
        ),
        loader: conversationLoader,
      },
      {
        path: "new",
        element: (
          <Suspense fallback={<LoaderFullPage />}>
            <NewChat />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/confirm",
    element: (
      <Suspense fallback={<LoaderFullPage />}>
        <ConfirmEmail />
      </Suspense>
    ),
  },
  {
    path: "/forgot",
    element: (
      <Suspense fallback={<LoaderFullPage />}>
        <ForgotPassword />
      </Suspense>
    ),
  },
  {
    path: "/resetpassword",
    element: (
      <Suspense fallback={<LoaderFullPage />}>
        <ResetPassword />
      </Suspense>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <Suspense fallback={<LoaderFullPage />}>
          <Admin />
        </Suspense>
      </ProtectedAdmin>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
function App() {
  return (
    <SidebarProvider>
      <RouterProvider router={router} />
    </SidebarProvider>
  );
}

export default App;
