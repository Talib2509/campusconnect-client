export interface ToggleLikeDto {
  postId: number;
  postType: number;
}

export interface ToggleLikeResponse {
  succeeded: boolean;
  message: string;
  isLiked: boolean;
}