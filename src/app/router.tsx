import { createBrowserRouter, Navigate } from "react-router-dom";

import { AuthLayout } from "../components/layout/AuthLayout";
import { MainLayout } from "../components/layout/MainLayout";
import { ProtectedRoute } from "../components/guards/ProtectedRoute";
import { RoleBasedRoute } from "../components/guards/RoleBasedRoute";
import { RoleGuard } from "../components/guards/RoleGuard";

import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import ForgotPasswordPage from "../features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "../features/auth/pages/ResetPasswordPage";

import DashboardPage from "../features/dashboard/pages/DashboardPage";
import AnnouncementsPage from "../features/announcements/pages/AnnouncementsPage";
import CreateAnnouncementPage from "../features/announcements/pages/CreateAnnouncementPage";
import EventsPage from "../features/events/pages/EventsPage";
import CreateEventPage from "../features/events/pages/CreateEventPage";
import EditEventPage from "../features/events/pages/EditEventPage";
import AdminAnnouncementsPage from "../features/admin/pages/AdminAnnouncementsPage";
import AuthorizationEndpointsPage from "../features/admin/pages/AuthorizationEndpointsPage";
import RolesPage from "../features/admin/pages/RolesPage";

export const router = createBrowserRouter([
  // 1. Публичные маршруты (Авторизация)
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
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/reset-password",
        element: <ResetPasswordPage />,
      },
    ],
  },

  // 2. Защищенные маршруты (Все объединены под одним MainLayout)
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
      // Объявления
      {
        path: "/announcements",
        element: <AnnouncementsPage />,
      },
      {
        path: "/announcements/create",
        element: <CreateAnnouncementPage />,
      },
      // Hadisələr (Events)
      {
        path: "/events",
        element: <EventsPage />,
      },
      {
        path: "/events/create",
        element: <CreateEventPage />,
      },
      {
        path: "/events/:id/edit",
        element: <EditEventPage />,
      },
      // Панель администратора
      {
        path: "/admin/announcements",
        element: (
          <RoleGuard>
            <AdminAnnouncementsPage />
          </RoleGuard>
        ),
      },
      {
        path: "/admin/authorization-endpoints",
        element: (
          <RoleBasedRoute allowedRoles={["SuperAdmin"]}>
            <AuthorizationEndpointsPage />
          </RoleBasedRoute>
        ),
      },
      {
        path: "/admin/roles",
        element: (
          <RoleBasedRoute allowedRoles={["SuperAdmin"]}>
            <RolesPage />
          </RoleBasedRoute>
        ),
      },
    ],
  },

  // 3. Дефолтный редирект для несуществующих страниц
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);