import { axiosInstance } from "../../../api/axiosInstance";
import { ENDPOINTS } from "../../../api/endpoints";

import type {
  Comment,
  CreateCommentDto,
} from "../types/comment.types";

export const commentService = {
  async getByAnnouncement(
    announcementId: number
  ): Promise<Comment[]> {
    const response = await axiosInstance.get(
      ENDPOINTS.COMMENTS.GET_BY_POST(announcementId)
    );

    return response.data;
  },

  async create(dto: CreateCommentDto) {
    const response = await axiosInstance.post(
      ENDPOINTS.COMMENTS.CREATE,
      dto
    );

    return response.data;
  },
};