// ## IMPORTS ##
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./auth/AuthProvider.jsx";

// ## RENDER ##
createRoot(document.getElementById("root")).render(
  // ## STRICT MODE ##
  <StrictMode>
    {/* ## PROVIDER AUTH ## */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
