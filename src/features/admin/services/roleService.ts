import { axiosInstance } from "../../../api/axiosInstance";
import type {
  AssignRoleToUserRequest,
  CreateRoleRequest,
  Role,
  UpdateRoleRequest,
} from "../types/role.types";

function unwrapResponse<T>(responseData: any): T {
  return responseData?.data ?? responseData;
}

export const roleService = {
  async getAll(): Promise<Role[]> {
    const response = await axiosInstance.get("/Roles");
    return unwrapResponse<Role[]>(response.data);
  },

  async create(roleName: string) {
    const data: CreateRoleRequest = {
      name: roleName,
      roleName: roleName,
    };

    const response = await axiosInstance.post("/Roles/create", data);
    return unwrapResponse(response.data);
  },

  async update(roleId: string, roleName: string) {
    const data: UpdateRoleRequest = {
      id: roleId,
      roleId: roleId,
      name: roleName,
      roleName: roleName,
    };

    const response = await axiosInstance.put("/Roles/update", data);
    return unwrapResponse(response.data);
  },

  async delete(roleId: string) {
    const response = await axiosInstance.delete(`/Roles/delete/${roleId}`);
    return unwrapResponse(response.data);
  },

  async assignToUser(userId: string, roleName: string) {
    const data: AssignRoleToUserRequest = {
      userId,
      roleName,
      roleNames: [roleName],
    };

    const response = await axiosInstance.post("/Roles/assign-to-user", data);
    return unwrapResponse(response.data);
  },
};