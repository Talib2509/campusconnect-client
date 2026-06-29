import { Navigate } from "react-router-dom";
import { getCurrentRole } from "../../utils/auth";

interface Props {
    children: React.ReactNode;
}

export function RoleGuard({ children }: Props) {

    const role = getCurrentRole();

    if (
        role !== "Admin" &&
        role !== "SuperAdmin"
    ) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}