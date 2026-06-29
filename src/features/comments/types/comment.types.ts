export interface Comment {
    id: number;
    content: string;
    userId: string;
    userName: string;
    createdAt: string;
}

export interface CreateCommentDto {
    announcementId: number;
    content: string;
}