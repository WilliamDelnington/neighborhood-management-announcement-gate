import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { HomePage } from "@/pages/HomePage";
import { NeighborhoodsPage } from "@/pages/NeighborhoodsPage";
import { NewsDetailPage } from "@/pages/NewsDetailPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "dich-vu", element: <Navigate to="/" replace /> },
      { path: "to-dan-pho", element: <NeighborhoodsPage /> },
      { path: "tin-tuc/:id", element: <NewsDetailPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
