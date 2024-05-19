import React from "react";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import LoginPage from "./pages/LoginPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./features/dashboard/index.tsx";
import Doctors from "./features/doctors/index.tsx";
import Patients from "./features/patients/index.tsx";
import Appointments from "./features/appointments/index.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },

      {
        path: "/doctors",
        element: <Doctors />,
      },

      {
        path: "/patients",
        element: <Patients />,
      },

      {
        path: "/appointments",
        element: <Appointments />,
      },
    ],
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
