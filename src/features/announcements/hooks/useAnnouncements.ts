import { useQuery } from "@tanstack/react-query";
import { announcementService } from "../services/announcementService";

export function useAnnouncements() {
  return useQuery({
    queryKey: ["announcements"],
    queryFn: announcementService.getAll,
  });
}