import { axiosInstance } from "../../../api/axiosInstance";
import { ENDPOINTS } from "../../../api/endpoints";
import type { Event, CreateEventRequest, UpdateEventRequest } from "../types/event.types";

export const eventService = {
  getAllEvents: async (): Promise<Event[]> => {
    const response = await axiosInstance.get(ENDPOINTS.EVENTS.GET_ALL);
    // API may return array directly or wrapped in { data: [...] }
    const raw = response.data;
    if (Array.isArray(raw)) return raw;
    if (Array.isArray(raw?.data)) return raw.data;
    return [];
  },

  getEventById: async (id: number): Promise<Event> => {
    const response = await axiosInstance.get(ENDPOINTS.EVENTS.GET_BY_ID(id));
    const raw = response.data;
    return raw?.data ?? raw;
  },

  createEvent: async (data: CreateEventRequest): Promise<any> => {
    const response = await axiosInstance.post(ENDPOINTS.EVENTS.CREATE, data);
    return response.data;
  },

  updateEvent: async (id: number, data: UpdateEventRequest): Promise<any> => {
    const response = await axiosInstance.put(ENDPOINTS.EVENTS.UPDATE(id), data);
    return response.data;
  },

  deleteEvent: async (id: number): Promise<any> => {
    const response = await axiosInstance.delete(ENDPOINTS.EVENTS.DELETE(id));
    return response.data;
  },
};
