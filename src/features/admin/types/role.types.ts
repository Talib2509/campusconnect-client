export interface Role {
  id?: string;
  roleId?: string;
  name?: string;
  roleName?: string;
}

export interface CreateRoleRequest {
  name: string;
  roleName: string;
}

export interface UpdateRoleRequest {
  id: string;
  roleId: string;
  name: string;
  roleName: string;
}

export interface AssignRoleToUserRequest {
  userId: string;
  roleName: string;
  roleNames?: string[];
}