import { useState } from "react";
import {
  useAssignRoleToUser,
  useCreateRole,
  useDeleteRole,
  useRoles,
  useUpdateRole,
} from "../hooks/useRoles";
import type { Role } from "../types/role.types";

function getRoleId(role: Role) {
  return role.id || role.roleId || "";
}

function getRoleName(role: Role) {
  return role.name || role.roleName || "";
}

export default function RolesPage() {
  const { data: roles, isLoading, isError } = useRoles();

  const createRoleMutation = useCreateRole();
  const updateRoleMutation = useUpdateRole();
  const deleteRoleMutation = useDeleteRole();
  const assignRoleMutation = useAssignRoleToUser();

  const [newRoleName, setNewRoleName] = useState("");

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [updatedRoleName, setUpdatedRoleName] = useState("");

  const [userId, setUserId] = useState("");
  const [assignRoleName, setAssignRoleName] = useState("");

  const [message, setMessage] = useState("");

  async function handleCreateRole() {
    setMessage("");

    if (!newRoleName.trim()) {
      setMessage("Rol adı boş ola bilməz.");
      return;
    }

    try {
      await createRoleMutation.mutateAsync(newRoleName.trim());
      setNewRoleName("");
      setMessage("Rol uğurla yaradıldı.");
    } catch (err: any) {
      setMessage(
        err.response?.data?.message ||
          err.response?.data?.Message ||
          err.message ||
          "Rol yaradılarkən xəta baş verdi."
      );
    }
  }

  function handleSelectRole(role: Role) {
    setSelectedRole(role);
    setUpdatedRoleName(getRoleName(role));
    setAssignRoleName(getRoleName(role));
    setMessage("");
  }

  async function handleUpdateRole() {
    setMessage("");

    if (!selectedRole) {
      setMessage("Əvvəl rol seçilməlidir.");
      return;
    }

    const roleId = getRoleId(selectedRole);

    if (!roleId) {
      setMessage("Seçilən rolun ID-si tapılmadı.");
      return;
    }

    if (!updatedRoleName.trim()) {
      setMessage("Yeni rol adı boş ola bilməz.");
      return;
    }

    try {
      await updateRoleMutation.mutateAsync({
        roleId,
        roleName: updatedRoleName.trim(),
      });

      setMessage("Rol uğurla yeniləndi.");
      setSelectedRole(null);
      setUpdatedRoleName("");
    } catch (err: any) {
      setMessage(
        err.response?.data?.message ||
          err.response?.data?.Message ||
          err.message ||
          "Rol yenilənərkən xəta baş verdi."
      );
    }
  }

  async function handleDeleteRole(role: Role) {
    setMessage("");

    const roleId = getRoleId(role);
    const roleName = getRoleName(role);

    if (!roleId) {
      setMessage("Rol ID tapılmadı.");
      return;
    }

    const confirmed = confirm(`"${roleName}" rolunu silmək istəyirsən?`);

    if (!confirmed) return;

    try {
      await deleteRoleMutation.mutateAsync(roleId);
      setMessage("Rol uğurla silindi.");
    } catch (err: any) {
      setMessage(
        err.response?.data?.message ||
          err.response?.data?.Message ||
          err.message ||
          "Rol silinərkən xəta baş verdi."
      );
    }
  }

  async function handleAssignRoleToUser() {
    setMessage("");

    if (!userId.trim()) {
      setMessage("User ID boş ola bilməz.");
      return;
    }

    if (!assignRoleName.trim()) {
      setMessage("Rol adı boş ola bilməz.");
      return;
    }

    try {
      await assignRoleMutation.mutateAsync({
        userId: userId.trim(),
        roleName: assignRoleName.trim(),
      });

      setMessage("Rol istifadəçiyə uğurla təyin edildi.");
      setUserId("");
    } catch (err: any) {
      setMessage(
        err.response?.data?.message ||
          err.response?.data?.Message ||
          err.message ||
          "Rol istifadəçiyə təyin edilərkən xəta baş verdi."
      );
    }
  }

  if (isLoading) {
    return <p>Rollar yüklənir...</p>;
  }

  if (isError) {
    return <p>Rollar yüklənərkən xəta baş verdi.</p>;
  }

  return (
    <div className="roles-page">
      <div className="page-header">
        <div>
          <h1>Roles</h1>
          <p>Buradan rolları yarada, yeniləyə, silə və user-ə təyin edə bilərsiniz.</p>
        </div>
      </div>

      {message && <p className="info-text">{message}</p>}

      <div className="roles-grid">
        <div className="admin-card">
          <h2>Yeni rol yarat</h2>

          <div className="form-group">
            <label>Rol adı</label>
            <input
              placeholder="Məsələn: SuperAdmin"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
            />
          </div>

          <button
            className="save-btn"
            onClick={handleCreateRole}
            disabled={createRoleMutation.isPending}
          >
            {createRoleMutation.isPending ? "Yaradılır..." : "Rol yarat"}
          </button>
        </div>

        <div className="admin-card">
          <h2>Rol yenilə</h2>

          {selectedRole ? (
            <>
              <div className="form-group">
                <label>Rol ID</label>
                <input value={getRoleId(selectedRole)} readOnly />
              </div>

              <div className="form-group">
                <label>Yeni rol adı</label>
                <input
                  value={updatedRoleName}
                  onChange={(e) => setUpdatedRoleName(e.target.value)}
                />
              </div>

              <button
                className="save-btn"
                onClick={handleUpdateRole}
                disabled={updateRoleMutation.isPending}
              >
                {updateRoleMutation.isPending
                  ? "Yenilənir..."
                  : "Rolu yenilə"}
              </button>
            </>
          ) : (
            <p>Yeniləmək üçün cədvəldən rol seç.</p>
          )}
        </div>

        <div className="admin-card">
          <h2>User-ə rol təyin et</h2>

          <div className="form-group">
            <label>User ID</label>
            <input
              placeholder="İstifadəçinin ID-si"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Rol adı</label>
            <input
              placeholder="Məsələn: Admin"
              value={assignRoleName}
              onChange={(e) => setAssignRoleName(e.target.value)}
            />
          </div>

          <button
            className="save-btn"
            onClick={handleAssignRoleToUser}
            disabled={assignRoleMutation.isPending}
          >
            {assignRoleMutation.isPending
              ? "Təyin edilir..."
              : "Rolu user-ə təyin et"}
          </button>
        </div>
      </div>

      <div className="admin-card">
        <div className="table-toolbar">
          <h2>Rol siyahısı</h2>
        </div>

        <div className="table-wrapper">
          <table className="endpoint-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Rol ID</th>
                <th>Rol adı</th>
                <th>Əməliyyatlar</th>
              </tr>
            </thead>

            <tbody>
              {roles && roles.length > 0 ? (
                roles.map((role, index) => (
                  <tr
                    key={getRoleId(role) || index}
                    className={
                      selectedRole && getRoleId(selectedRole) === getRoleId(role)
                        ? "selected-row"
                        : ""
                    }
                  >
                    <td>{index + 1}</td>
                    <td className="code-cell">{getRoleId(role)}</td>
                    <td>{getRoleName(role)}</td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="select-btn"
                          onClick={() => handleSelectRole(role)}
                        >
                          Seç
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteRole(role)}
                          disabled={deleteRoleMutation.isPending}
                        >
                          Sil
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="empty-cell">
                    Rol tapılmadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}