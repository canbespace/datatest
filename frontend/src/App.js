import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard"; // or "./pages/AdminDashboard"
import AdminRoute from "./pages/AdminRoute";

// removed the following line so the registration page is only accessible to the admin account
//<Route path="/register" element={<Register />} />

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/knowledge" element={<Knowledge />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
/*--*/
