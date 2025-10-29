// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";

// ✅ Global styles
import "./index.css";
import "./App.css";
import "./config.css";
import "./styles.css";

// ✅ Context Providers
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import ErrorBoundary from "./components/ErrorBoundary";

// ✅ Define routes
const router = createBrowserRouter(
  [
    {
      path: "/*", // Catch all routes
      element: <App />,
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true, // React Router v7 prep
    },
  }
);

// ✅ Render the app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
