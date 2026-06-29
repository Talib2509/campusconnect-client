import { createBrowserRouter, Navigate } from "react-router-dom";

import { AuthLayout } from "../components/layout/AuthLayout";
import { MainLayout } from "../components/layout/MainLayout";
import { ProtectedRoute } from "../components/guards/ProtectedRoute";

import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";

import AnnouncementsPage
from "../features/announcements/pages/AnnouncementsPage";

import CreateAnnouncementPage
from "../features/announcements/pages/CreateAnnouncementPage";

import AdminAnnouncementsPage
from "../features/admin/pages/AdminAnnouncementsPage";

import { RoleGuard } from "../components/guards/RoleGuard";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
  
  {
    element: (
      <ProtectedRoute>
      <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/announcements",
        element: <AnnouncementsPage />,
      },
      
      {
        path: "/announcements/create",
        element: <CreateAnnouncementPage />,
      },
      {
        path: "/admin/announcements",
        element: (
          <RoleGuard>
          <AdminAnnouncementsPage />
          </RoleGuard>
        ),
      }
    ],
    
  },
  
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
  
]);