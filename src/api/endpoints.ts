export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
  
 ANNOUNCEMENTS: {
  GET_ALL: "/announcements",
  CREATE: "/announcements",

  APPROVE: (id: number) => `/admin/announcements/${id}/approve`,
  REJECT: (id: number) => `/admin/announcements/${id}/reject`,
},
  COMMENTS: {
    GET_BY_POST: (id: number) => `/comments/post/${id}`,
    CREATE: "/comments",
  },
  ADMIN: {
    APPROVE_ANNOUNCEMENT: (id: number) =>
      `/admin/announcements/${id}/approve`,
    
    REJECT_ANNOUNCEMENT: (id: number) =>
      `/admin/announcements/${id}/reject`,
  },
  LIKES: {
    LIKE: "/likes/like",
    
    DISLIKE: "/likes/dislike",
  },
};