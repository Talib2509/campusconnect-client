import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEvents } from "../hooks/useEvents";
import { EventForm } from "../components/EventForm";
import type { Event, UpdateEventRequest } from "../types/event.types";

const EditEventPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { updateEvent, error } = useEvents();

  const [saving, setSaving] = useState(false);

  // Event data passed via router state (from EventCard navigate)
  const stateEvent = (location.state as { event?: Event } | null)?.event;

  const [initialData, setInitialData] = useState<UpdateEventRequest | null>(null);

  useEffect(() => {
    if (stateEvent) {
      // Convert ISO date to datetime-local format (YYYY-MM-DDTHH:mm)
      const localDate = stateEvent.date
        ? new Date(stateEvent.date).toISOString().slice(0, 16)
        : "";
      setInitialData({
        title: stateEvent.title,
        description: stateEvent.description,
        date: localDate,
      });
    } else {
      // No state passed — go back to events list
      navigate("/events");
    }
  }, [stateEvent, navigate]);

  const handleSubmit = async (data: UpdateEventRequest) => {
    setSaving(true);
    try {
      await updateEvent(Number(id), data);
      navigate("/events");
    } catch {
      // Error is shown via hook's error state
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-6">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Tədbirlərə Qayıt</span>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Tədbiri Redaktə Et</h1>
        <p className="text-gray-500 mt-1">Mövcud tədbirin məlumatlarını yeniləyin.</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6 border border-red-100">
          {error}
        </div>
      )}

      {initialData ? (
        <EventForm
          onSubmit={handleSubmit}
          isLoading={saving}
          initialData={initialData}
          submitLabel="Yadda Saxla"
        />
      ) : (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
};

export default EditEventPage;
