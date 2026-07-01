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
  EVENTS: {
    GET_ALL: "/events",
    GET_BY_ID: (id: number) => `/events/${id}`,
    CREATE: "/events",
    UPDATE: (id: number) => `/events/${id}`,
    DELETE: (id: number) => `/events/${id}`,
  },
  LIKES: {
    LIKE: "/likes/like",

    DISLIKE: "/likes/dislike",
  },
};