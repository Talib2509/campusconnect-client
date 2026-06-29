export interface AuthorizationEndpoint {
  id?: number;
  actionType?: string;
  httpType?: string;
  definition?: string;
  code: string;
  roles?: string[];
}

export interface AssignRolesRequest {
  roleNames: string[];
  code: string;
}