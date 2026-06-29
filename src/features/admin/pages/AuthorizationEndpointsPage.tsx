import { useMemo, useState } from "react";
import {
  useAssignRoles,
  useAuthorizationEndpoints,
} from "../hooks/useAuthorizationEndpoints";
import type { AuthorizationEndpoint } from "../types/authorizationEndpoint.types";

function getMethodClass(method?: string) {
  switch ((method || "").toUpperCase()) {
    case "GET":
      return "method-badge get";
    case "POST":
      return "method-badge post";
    case "PUT":
      return "method-badge put";
    case "DELETE":
      return "method-badge delete";
    case "PATCH":
      return "method-badge patch";
    default:
      return "method-badge";
  }
}

export default function AuthorizationEndpointsPage() {
  const { data, isLoading, isError } = useAuthorizationEndpoints();
  const assignRolesMutation = useAssignRoles();

  const [selectedEndpoint, setSelectedEndpoint] =
    useState<AuthorizationEndpoint | null>(null);

  const [roleNamesText, setRoleNamesText] = useState("");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  function handleSelect(endpoint: AuthorizationEndpoint) {
    setSelectedEndpoint(endpoint);

    if (endpoint.roles && endpoint.roles.length > 0) {
      setRoleNamesText(endpoint.roles.join(", "));
    } else {
      setRoleNamesText("");
    }

    setMessage("");
  }

  async function handleAssignRoles() {
    setMessage("");

    if (!selectedEndpoint) {
      setMessage("Əvvəl endpoint seçilməlidir.");
      return;
    }

    if (!selectedEndpoint.code) {
      setMessage("Seçilən endpoint üçün code tapılmadı.");
      return;
    }

    const roleNames = roleNamesText
      .split(",")
      .map((role) => role.trim())
      .filter((role) => role.length > 0);

    if (roleNames.length === 0) {
      setMessage("Ən azı bir rol daxil edilməlidir.");
      return;
    }

    try {
      await assignRolesMutation.mutateAsync({
        code: selectedEndpoint.code,
        roleNames,
      });

      setMessage("Rollar endpoint-ə uğurla təyin edildi.");
    } catch (err: any) {
      setMessage(
        err.response?.data?.message ||
          err.response?.data?.Message ||
          err.message ||
          "Rol təyin edilərkən xəta baş verdi."
      );
    }
  }

  const filteredEndpoints = useMemo(() => {
    if (!data) return [];

    const searchText = search.toLowerCase().trim();

    if (!searchText) return data;

    return data.filter((endpoint) => {
      return (
        endpoint.definition?.toLowerCase().includes(searchText) ||
        endpoint.code?.toLowerCase().includes(searchText) ||
        endpoint.httpType?.toLowerCase().includes(searchText) ||
        endpoint.actionType?.toLowerCase().includes(searchText)
      );
    });
  }, [data, search]);

  if (isLoading) {
    return <p>Endpoint-lər yüklənir...</p>;
  }

  if (isError) {
    return <p>Endpoint-lər yüklənərkən xəta baş verdi.</p>;
  }

  return (
    <div className="authorization-page">
      <div className="page-header">
        <div>
          <h1>Authorization Endpoints</h1>
          <p>
            Buradan endpoint-lərə hansı rolların icazəsi olduğunu təyin edə
            bilərsiniz.
          </p>
        </div>
      </div>

      {message && <p className="info-text">{message}</p>}

      <div className="admin-card">
        <div className="table-toolbar">
          <h2>Endpoint siyahısı</h2>

          <input
            type="text"
            placeholder="Endpoint axtar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="table-wrapper">
          <table className="endpoint-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Method</th>
                <th>Definition</th>
                <th>Code</th>
                <th>Rollar</th>
                <th>Əməliyyat</th>
              </tr>
            </thead>

            <tbody>
              {filteredEndpoints.length > 0 ? (
                filteredEndpoints.map((endpoint, index) => (
                  <tr
                    key={endpoint.code || index}
                    className={
                      selectedEndpoint?.code === endpoint.code
                        ? "selected-row"
                        : ""
                    }
                  >
                    <td>{index + 1}</td>

                    <td>
                      <span className={getMethodClass(endpoint.httpType)}>
                        {endpoint.httpType || endpoint.actionType || "-"}
                      </span>
                    </td>

                    <td>{endpoint.definition || "-"}</td>

                    <td className="code-cell">{endpoint.code}</td>

                    <td>
                      {endpoint.roles && endpoint.roles.length > 0
                        ? endpoint.roles.join(", ")
                        : "-"}
                    </td>

                    <td>
                      <button
                        className="select-btn"
                        onClick={() => handleSelect(endpoint)}
                      >
                        Seç
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="empty-cell">
                    Endpoint tapılmadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="admin-card role-form-card">
        <h2>Rol təyin et</h2>

        {selectedEndpoint ? (
          <div className="role-form">
            <div className="form-group">
              <label>Endpoint code</label>
              <input value={selectedEndpoint.code} readOnly />
            </div>

            <div className="form-group">
              <label>Definition</label>
              <input value={selectedEndpoint.definition || ""} readOnly />
            </div>

            <div className="form-group">
              <label>Method</label>
              <input
                value={selectedEndpoint.httpType || selectedEndpoint.actionType || ""}
                readOnly
              />
            </div>

            <div className="form-group">
              <label>Rollar</label>
              <input
                placeholder="Məsələn: SuperAdmin, Admin"
                value={roleNamesText}
                onChange={(e) => setRoleNamesText(e.target.value)}
              />
              <small>
                Birdən çox rol üçün vergül istifadə et:
                <b> SuperAdmin, Admin</b>
              </small>
            </div>

            <button
              className="save-btn"
              onClick={handleAssignRoles}
              disabled={assignRolesMutation.isPending}
            >
              {assignRolesMutation.isPending
                ? "Yadda saxlanılır..."
                : "Rolları yadda saxla"}
            </button>
          </div>
        ) : (
          <p>Rol təyin etmək üçün cədvəldən endpoint seç.</p>
        )}
      </div>
    </div>
  );
}