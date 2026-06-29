import { useMutation, useQueryClient } from "@tanstack/react-query";
import { announcementService } from "../services/announcementService";

export function useApproveAnnouncement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: announcementService.approve,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["announcements"],
      });
    },
  });
}