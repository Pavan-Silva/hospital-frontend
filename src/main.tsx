import React from "react";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import LoginPage from "./pages/LoginPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Dashboard from "./features/dashboard/index.tsx";
import Doctors from "./features/doctors/index.tsx";
import Patients from "./features/patients/index.tsx";
import Appointments from "./features/appointments/index.tsx";
import DoctorForm from "./features/doctors/form.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
        path: "/doctors/:query",
        element: <DoctorForm />,
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

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
