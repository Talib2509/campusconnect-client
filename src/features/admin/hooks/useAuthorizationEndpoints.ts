import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authorizationEndpointService } from "../services/authorizationEndpointService";
import type { AssignRolesRequest } from "../types/authorizationEndpoint.types";

export function useAuthorizationEndpoints() {
  return useQuery({
    queryKey: ["authorization-endpoints"],
    queryFn: authorizationEndpointService.getAllEndpoints,
  });
}

export function useAssignRoles() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AssignRolesRequest) =>
      authorizationEndpointService.assignRoles(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["authorization-endpoints"],
      });
    },
  });
}