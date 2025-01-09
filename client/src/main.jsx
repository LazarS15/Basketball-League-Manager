import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Auth0ProviderWithNavigate } from './auth/Auth0ProviderNavigate.jsx'
import { ToastContainer } from "react-toastify";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Auth0ProviderWithNavigate>
        <App />
        <ToastContainer />
    </Auth0ProviderWithNavigate>
  </BrowserRouter>
);
