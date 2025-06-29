//app.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "pages/Register";
import Login from "pages/Login";
import AdminDashboard from "/pages/admin/AdminDashboard";
import AdminRoute from "./pages/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/register"
          element={
            <AdminRoute>
              <Register />
            </AdminRoute>
          }
        />

        <Route
          path="/AdminDashboard"
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
