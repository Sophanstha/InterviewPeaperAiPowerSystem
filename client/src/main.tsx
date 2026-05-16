import { Toaster } from "sonner";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from './App.tsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Login from "./features/auth/pages/Login.tsx";
import Register from "./features/auth/pages/Register.tsx";
import { AuthProvider } from "./features/auth/authContext.tsx";
import { useAuth } from "./features/auth/hooks/useAuth.ts";
import Protected from "./features/auth/component/Protected.tsx";
import Home from "./features/interview/pages/Home.tsx";
import Interview from "./features/interview/pages/Interview.tsx";
import ReportContextProvider from "./features/interview/InterviewContext.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        element={
          <Protected>
            <Home/>
          </Protected>
        }
        path="/"
      />
      <Route
        element={
          <Protected>
            <Interview/>
          </Protected>
        }
        path="/interview/:id"
      />
      <Route element={<Login />} path="/login" />
      <Route element={<Register />} path="/register" />
    </Route>,
  ),
);

createRoot(document.getElementById("root")!).render(

<AuthProvider>
    <ReportContextProvider>
    <Toaster/>
    <RouterProvider router={router} />,
    </ReportContextProvider>
  </AuthProvider>,
);
