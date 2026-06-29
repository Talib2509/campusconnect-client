import { axiosInstance } from "../../../api/axiosInstance";
import { ENDPOINTS } from "../../../api/endpoints";

export const adminService = {

    async approveAnnouncement(id: number) {
        const response = await axiosInstance.patch(
            ENDPOINTS.ADMIN.APPROVE_ANNOUNCEMENT(id)
        );

        return response.data;
    },

    async rejectAnnouncement(id: number) {
        const response = await axiosInstance.patch(
            ENDPOINTS.ADMIN.REJECT_ANNOUNCEMENT(id)
        );

        return response.data;
    },
};