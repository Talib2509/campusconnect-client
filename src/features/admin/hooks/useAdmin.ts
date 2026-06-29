import { useMutation, useQueryClient } from "@tanstack/react-query";

import { adminService } from "../services/adminService";

export function useApproveAnnouncement() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: adminService.approveAnnouncement,

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["announcements"],
            });

        },
    });

}

export function useRejectAnnouncement() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: adminService.rejectAnnouncement,

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["announcements"],
            });

        },
    });

}