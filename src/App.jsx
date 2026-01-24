import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import DashboardLayout from "./layouts/DashboardLayout";
import CheckIn from "./pages/CheckIn";
import Queue from "./pages/Queue";
import PatientList from "./components/PatientList";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* ---------------- LOGIN PAGE ---------------- */}
          <Route path="/login" element={<Login />} />

          {/* ---------------- CHECK-IN PAGE ---------------- */}
          <Route path="/" element={<CheckIn />} />

          {/* ---------------- DASHBOARD PAGES ---------------- */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* Main Queue Dashboard */}
            <Route path="/dashboard" element={<Queue />} />

            {/* Patient List filtered by status */}
            <Route path="/patients/:filter" element={<PatientList />} />
          </Route>

          {/* Optional: catch-all route redirects to login */}
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>

      {/* ---------------- TOASTER ---------------- */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { background: "#363636", color: "#fff" },
          success: { duration: 3000, style: { background: "#10b981" } },
          error: { duration: 4000, style: { background: "#ef4444" } },
        }}
      />
    </>
  );
};

export default App;
