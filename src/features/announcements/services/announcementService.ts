import { axiosInstance } from "../../../api/axiosInstance";
import { ENDPOINTS } from "../../../api/endpoints";

import type {
  Announcement,
  CreateAnnouncementDto,
} from "../types/announcement.types";

export const announcementService = {
  async getAll(): Promise<Announcement[]> {
    const response = await axiosInstance.get(
      ENDPOINTS.ANNOUNCEMENTS.GET_ALL
    );
    
    return response.data;
  },
  
  async create(dto: CreateAnnouncementDto) {
    const response = await axiosInstance.post(
      ENDPOINTS.ANNOUNCEMENTS.CREATE,
      dto
    );
    
    return response.data;
  },
  async approve(id: number) {
    const response = await axiosInstance.patch(
      ENDPOINTS.ANNOUNCEMENTS.APPROVE(id)
    );
    
    return response.data;
  },
  
  async reject(id: number) {
    const response = await axiosInstance.patch(
      ENDPOINTS.ANNOUNCEMENTS.REJECT(id)
    );
    
    return response.data;
  },
};