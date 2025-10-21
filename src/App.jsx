import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalLayout from "./layouts/GlobalLayout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";

import MgrProduct from "./pages/MgrProduct.jsx";
import MgrStore from "./pages/MgrStore.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "mgr/product", element: <MgrProduct /> },
      { path: "mgr/store", element: <MgrStore /> },
    ],
  },
]);

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
