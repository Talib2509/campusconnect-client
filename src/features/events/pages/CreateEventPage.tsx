import React, { useState } from "react";
import { eventService } from "../services/eventService";
import { EventForm } from "../components/EventForm";
import type { CreateEventRequest } from "../types/event.types";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CreateEventPage: React.FC = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: CreateEventRequest) => {
    setSaving(true);
    setError(null);
    try {
      await eventService.createEvent(data);
      navigate("/events");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        "Hadisə yaradılarkən xəta baş verdi"
      );
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
        <h1 className="text-3xl font-bold text-gray-900">Yeni Tədbir Yarat</h1>
        <p className="text-gray-500 mt-1">
          Kampusda baş tutacaq yeni bir tədbir və ya hadisə əlavə edin.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6 border border-red-100">
          {error}
        </div>
      )}

      <EventForm
        onSubmit={handleSubmit}
        isLoading={saving}
        submitLabel="Tədbir Yarat"
      />
    </div>
  );
};

export default CreateEventPage;
