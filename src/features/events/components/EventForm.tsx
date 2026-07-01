import React, { useState } from "react";
import type { CreateEventRequest } from "../types/event.types";

interface EventFormProps {
  onSubmit: (data: CreateEventRequest) => Promise<void>;
  isLoading?: boolean;
  initialData?: CreateEventRequest;
  submitLabel?: string;
}

export const EventForm: React.FC<EventFormProps> = ({
  onSubmit,
  isLoading,
  initialData,
  submitLabel = "Tədbir Yarat",
}) => {
  const [formData, setFormData] = useState<CreateEventRequest>(
    initialData ?? { title: "", description: "", date: "" }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      ...formData,
      date: formData.date ? new Date(formData.date).toISOString() : null,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-sm font-medium text-gray-700">
          Tədbirin Adı
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Məsələn: Gənclər Forumu"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="date" className="text-sm font-medium text-gray-700">
          Tarix və Saat
        </label>
        <input
          type="datetime-local"
          id="date"
          name="date"
          value={formData.date || ""}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm font-medium text-gray-700">
          Açıqlama
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
          placeholder="Tədbir haqqında ətraflı məlumat..."
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary mt-2 w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Gözləyin..." : submitLabel}
      </button>
    </form>
  );
};
