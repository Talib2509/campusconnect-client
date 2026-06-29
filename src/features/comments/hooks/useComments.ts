import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { commentService } from "../services/commentService";
import type { CreateCommentDto } from "../types/comment.types";

export function useComments(announcementId: number) {
  return useQuery({
    queryKey: ["comments", announcementId],
    queryFn: () =>
      commentService.getByAnnouncement(announcementId),
  });
}

export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateCommentDto) =>
      commentService.create(dto),

    onSuccess: (_, dto) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", dto.announcementId],
      });

      queryClient.invalidateQueries({
        queryKey: ["announcements"],
      });
    },
  });
}