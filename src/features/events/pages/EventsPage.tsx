import React from "react";
import { useEvents } from "../hooks/useEvents";
import { EventCard } from "../components/EventCard";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const EventsPage: React.FC = () => {
  const { events, loading, error, deleteEvent } = useEvents();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tədbirlər</h1>
          <p className="text-gray-500 mt-1">Kampus daxilində baş verən hadisələr və tədbirlər</p>
        </div>
        <Link
          to="/events/create"
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Yeni Tədbir</span>
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6 border border-red-100">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : events?.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
          <p className="text-gray-500">Heç bir tədbir tapılmadı.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} onDelete={deleteEvent} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsPage;
