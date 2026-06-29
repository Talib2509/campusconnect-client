import { jwtDecode } from "jwt-decode";
import { TokenManager } from "./tokenManager";

interface JwtPayload {
    Role?: string;
    role?: string;

    ["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]?: string;
}

export function getCurrentRole() {
    const token = TokenManager.getAccessToken();

    if (!token)
        return null;

    try {
        const decoded = jwtDecode<JwtPayload>(token);

        return (
            decoded.Role ??
            decoded.role ??
            decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ??
            null
        );
    } catch {
        return null;
    }
}