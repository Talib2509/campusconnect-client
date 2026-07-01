import React, { useState } from "react";
import type { Event } from "../types/event.types";
import { Calendar, User, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EventCardProps {
  event: Event;
  onDelete: (id: number) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onDelete }) => {
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const formattedDate = new Date(event.date).toLocaleDateString("az-AZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleDeleteClick = () => {
    if (confirmDelete) {
      onDelete(event.id);
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow flex flex-col gap-3">
      <div className="flex justify-between items-start gap-2">
        <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => navigate(`/events/${event.id}/edit`, { state: { event } })}
            title="Redaktə et"
            className="p-1.5 rounded-md text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={handleDeleteClick}
            title={confirmDelete ? "Təsdiq et (silinəcək!)" : "Sil"}
            className={`p-1.5 rounded-md transition-colors ${confirmDelete
                ? "text-white bg-red-500 hover:bg-red-600"
                : "text-gray-400 hover:text-red-500 hover:bg-red-50"
              }`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-gray-600 line-clamp-3 flex-1">{event.description}</p>

      <div className="flex flex-col gap-2 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-primary" />
          <span>Təşkilatçı: {event.authorName}</span>
        </div>
      </div>
    </div>
  );
};
