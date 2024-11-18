import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

const supabase = createClient(
  "https://gqyszjejvbxsxnyxtjyy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxeXN6amVqdmJ4c3hueXh0anl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk5MTM3NTUsImV4cCI6MjA0NTQ4OTc1NX0.c0837AMoDFkiCI4G9B3PUmh1L2IDFu5lJgxAOLjf1zU"
);
// Initialize the Supabase client

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    {/* Wrap your App in the SessionContextProvider */}
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </React.StrictMode>
);
