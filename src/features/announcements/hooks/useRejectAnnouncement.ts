import { useMutation, useQueryClient } from "@tanstack/react-query";
import { announcementService } from "../services/announcementService";

export function useRejectAnnouncement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: announcementService.reject,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["announcements"],
      });
    },
  });
}