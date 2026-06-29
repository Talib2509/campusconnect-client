import { useMutation, useQueryClient } from "@tanstack/react-query";
import { announcementService } from "../services/announcementService";

export function useCreateAnnouncement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: announcementService.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["announcements"],
      });
    },
  });
}