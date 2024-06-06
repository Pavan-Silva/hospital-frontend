import React from "react";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

import LoginPage from "./pages/LoginPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";

import Dashboard from "./features/dashboard/index.tsx";
import Doctors from "./features/doctors/index.tsx";
import Patients from "./features/patients/index.tsx";
import Appointments from "./features/appointments/index.tsx";

import DoctorForm from "./features/doctors/form.tsx";
import PatientForm from "./features/patients/form.tsx";
import AppointmentForm from "./features/appointments/form.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import AuthProvider from "./context/AuthContext.tsx";
import Unauthorized from "./pages/Unauthorized.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute element={<App />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },

      {
        path: "/doctors",
        element: <ProtectedRoute element={<Doctors />} roles={["admin"]} />,
      },

      {
        path: "/doctors/:query",
        element: <ProtectedRoute element={<DoctorForm />} roles={["admin"]} />,
      },

      {
        path: "/patients",
        element: <ProtectedRoute element={<Patients />} roles={["admin"]} />,
      },

      {
        path: "/patients/:query",
        element: <ProtectedRoute element={<PatientForm />} roles={["admin"]} />,
      },

      {
        path: "/appointments",
        element: (
          <ProtectedRoute
            element={<Appointments />}
            roles={["admin", "doctor"]}
          />
        ),
      },

      {
        path: "/appointments/:query",
        element: (
          <ProtectedRoute element={<AppointmentForm />} roles={["admin"]} />
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

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
