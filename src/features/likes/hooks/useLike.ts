import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeService } from "../services/likeService";

export function useLike() {
  
  const queryClient = useQueryClient();
  
  return useMutation({
    
    mutationFn: likeService.like,
    
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["announcements"],
      });
    },
  });
}

export function useDislike() {
  
  const queryClient = useQueryClient();
  
  return useMutation({
    
    mutationFn: likeService.dislike,
    
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["announcements"],
      });
    },
  });
}