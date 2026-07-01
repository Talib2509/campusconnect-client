import { useState, useEffect, useCallback } from "react";
import { eventService } from "../services/eventService";
import type { Event, CreateEventRequest, UpdateEventRequest } from "../types/event.types";

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await eventService.getAllEvents();
      setEvents(data);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        "Hadisələri yükləyərkən xəta baş verdi"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const createEvent = async (data: CreateEventRequest) => {
    try {
      await eventService.createEvent(data);
      await fetchEvents();
      return true;
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        "Hadisə yaradılarkən xəta baş verdi"
      );
      throw err;
    }
  };

  const updateEvent = async (id: number, data: UpdateEventRequest) => {
    try {
      await eventService.updateEvent(id, data);
      await fetchEvents();
      return true;
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        "Hadisə yenilənərkən xəta baş verdi"
      );
      throw err;
    }
  };

  const deleteEvent = async (id: number) => {
    try {
      await eventService.deleteEvent(id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
      return true;
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        "Hadisə silinərkən xəta baş verdi"
      );
      throw err;
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    refetch: fetchEvents,
  };
};
