import { axiosInstance } from "../../../api/axiosInstance";
import { ENDPOINTS } from "../../../api/endpoints";
import type { ToggleLikeDto } from "../types/like.types";

export const likeService = {

    like(dto: ToggleLikeDto) {
        return axiosInstance.post(
            ENDPOINTS.LIKES.LIKE,
            dto
        );
    },

    dislike(dto: ToggleLikeDto) {
        return axiosInstance.post(
            ENDPOINTS.LIKES.DISLIKE,
            dto
        );
    }
};