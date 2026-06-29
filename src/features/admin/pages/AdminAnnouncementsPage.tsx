import { useAnnouncements } from "../../announcements/hooks/useAnnouncements";
import { AdminAnnouncementCard } from "../components/AdminAnnouncementCard";

export default function AdminAnnouncementsPage() {
  const { data, isLoading, isError } = useAnnouncements();

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-600">
        Failed to load announcements.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-8">
        Announcement Moderation
      </h1>

      <div className="space-y-5">

        {data?.map((announcement) => (
          <AdminAnnouncementCard
            key={announcement.id}
            announcement={announcement}
          />
        ))}

      </div>

    </div>
  );
}