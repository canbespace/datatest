import React from "react";

const Unauthorized = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <h1>🚫 Access Denied</h1>
      <p>You do not have permission to access this page.</p>
      <a href="/login">← Return to Login</a>
    </div>
  );
};

export default Unauthorized;
