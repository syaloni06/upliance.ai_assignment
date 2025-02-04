/* eslint-disable no-unused-vars */ 
import React, { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import NotFound from "./components/NotFound.jsx";
import Dashboard from "./components/Dashboard.jsx";

// Lazy Load Components for Performance Optimization
const Editor = lazy(() => import("./components/TextEditor/Editor.jsx"));
const Counter = lazy(() => import("./components/Counter.jsx")); // Outside TextEditor folder
const UserDataForm = lazy(() => import("./components/UserDataForm.jsx")); // Outside TextEditor folder

// Define the Application Router
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Main application component
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Dashboard /> {/* Lazy load VideoList component */}
          </Suspense>
        ),
      },
      {
        path: "/editor",
        element: (
          <Suspense fallback={<div>Loading Editor...</div>}>
            <Editor />
          </Suspense>
        ),
      },
      {
        path: "/counter",
        element: (
          <Suspense fallback={<div>Loading Counter...</div>}>
            <Counter />
          </Suspense>
        ),
      },
      {
        path: "/userData",
        element: (
          <Suspense fallback={<div>Loading User Data Form...</div>}>
            <UserDataForm />
          </Suspense>
        ),
      },
    ],
    errorElement: <NotFound />, // Handle 404 errors
  },
]);

// Render the React Application
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>
);
