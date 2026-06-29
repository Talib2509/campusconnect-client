export interface Announcement {
  id: number;
  title: string;
  content: string;
  category: string;
  authorName: string;
  status: string;
  createdAt: string;

  likeCount: number;
  savedCount: number;
  commentCount: number;

  isLikedByCurrentUser: boolean;
  isSavedByCurrentUser: boolean;
}

export interface CreateAnnouncementDto {
  title: string;
  content: string;
  category: string;
}

export interface UpdateAnnouncementDto {
  title: string;
  content: string;
  category: string;
}