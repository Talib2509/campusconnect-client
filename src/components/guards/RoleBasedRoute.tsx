import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { TokenManager } from "../../utils/tokenManager";

interface Props {
  children: ReactNode;
  allowedRoles: string[];
}

function decodeJwtPayload(token: string): any {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((char) => {
          return "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

function getRolesFromToken(): string[] {
  const token = TokenManager.getAccessToken();

  if (!token) return [];

  const payload = decodeJwtPayload(token);

  if (!payload) return [];

  const roleClaim =
    payload.role ||
    payload.roles ||
    payload.Role ||
    payload.Roles ||
    payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

  if (!roleClaim) return [];

  if (Array.isArray(roleClaim)) return roleClaim;

  if (typeof roleClaim === "string") return [roleClaim];

  return [];
}

export function RoleBasedRoute({ children, allowedRoles }: Props) {
  const roles = getRolesFromToken();

  const hasAccess = roles.some((role) => allowedRoles.includes(role));

  if (!hasAccess) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}