import { axiosInstance } from "../../../api/axiosInstance";
import type {
  AssignRolesRequest,
  AuthorizationEndpoint,
} from "../types/authorizationEndpoint.types";

function unwrapResponse<T>(responseData: any): T {
  return responseData?.data ?? responseData;
}

export const authorizationEndpointService = {
  async getAllEndpoints(): Promise<AuthorizationEndpoint[]> {
    const response = await axiosInstance.get(
      "/AuthorizationEndpoint/get-all-endpoints"
    );

    return unwrapResponse<AuthorizationEndpoint[]>(response.data);
  },

  async assignRoles(data: AssignRolesRequest) {
    const response = await axiosInstance.post(
      "/AuthorizationEndpoint/assign-roles",
      data
    );

    return unwrapResponse(response.data);
  },
};