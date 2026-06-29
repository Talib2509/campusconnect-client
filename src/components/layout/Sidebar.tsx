import { NavLink } from "react-router-dom";
import { getCurrentRole } from "../../utils/auth";

export function Sidebar() {
  const role = getCurrentRole();
  
  const isAdmin = role === "Admin" || role === "SuperAdmin";
  const isSuperAdmin = role === "SuperAdmin";

  return (
    <aside className="sidebar">
      <h2>CampusConnect</h2>
      
      <nav>
        {/* Базовые ссылки, доступные всем авторизованным пользователям */}
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/announcements">Elanlar</NavLink>
        <NavLink to="/events">Hadisələr</NavLink>
        <NavLink to="/lost-found">İtkin/Tapılan</NavLink>
        <NavLink to="/team-finder">Team Finder</NavLink>
        <NavLink to="/messages">Mesajlar</NavLink>
        
        {/* Ссылки для Модераторов / Админов */}
        {isAdmin && (
          <NavLink to="/admin/announcements">Moderasiya</NavLink>
        )}

        {/* Ссылки строго для SuperAdmin (судя по вашему роутеру) */}
        {isSuperAdmin && (
          <>
            <NavLink to="/admin/authorization-endpoints">
              Authorization Endpoints
            </NavLink>
            <NavLink to="/admin/roles">Roles</NavLink>
          </>
        )}
      </nav>
    </aside>
  );
}