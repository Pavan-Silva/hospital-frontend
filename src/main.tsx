import React from "react";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LoginPage from "./pages/LoginPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Unauthorized from "./pages/Unauthorized.tsx";

import Dashboard from "./features/dashboard/index.tsx";
import Doctors from "./features/doctors/index.tsx";
import Patients from "./features/patients/index.tsx";
import Appointments from "./features/appointments/index.tsx";

import DoctorForm from "./features/doctors/form.tsx";
import PatientForm from "./features/patients/form.tsx";
import AppointmentForm from "./features/appointments/form.tsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <ProtectedRoute element={<App />} />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },

      {
        path: "/doctors",
        element: <ProtectedRoute element={<Doctors />} roles={["ADMIN"]} />,
      },

      {
        path: "/doctors/:query",
        element: <ProtectedRoute element={<DoctorForm />} roles={["ADMIN"]} />,
      },

      {
        path: "/patients",
        element: <ProtectedRoute element={<Patients />} roles={["ADMIN"]} />,
      },

      {
        path: "/patients/:query",
        element: <ProtectedRoute element={<PatientForm />} roles={["ADMIN"]} />,
      },

      {
        path: "/appointments",
        element: (
          <ProtectedRoute
            element={<Appointments />}
            roles={["ADMIN", "DOCTOR"]}
          />
        ),
      },

      {
        path: "/appointments/:query",
        element: (
          <ProtectedRoute element={<AppointmentForm />} roles={["ADMIN"]} />
        ),
      },
    ],
  },

  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
