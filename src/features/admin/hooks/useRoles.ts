import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { roleService } from "../services/roleService";

export function useRoles() {
  return useQuery({
    queryKey: ["roles"],
    queryFn: roleService.getAll,
  });
}

export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (roleName: string) => roleService.create(roleName),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["roles"],
      });
    },
  });
}

export function useUpdateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { roleId: string; roleName: string }) =>
      roleService.update(data.roleId, data.roleName),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["roles"],
      });
    },
  });
}

export function useDeleteRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (roleId: string) => roleService.delete(roleId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["roles"],
      });
    },
  });
}

export function useAssignRoleToUser() {
  return useMutation({
    mutationFn: (data: { userId: string; roleName: string }) =>
      roleService.assignToUser(data.userId, data.roleName),
  });
}