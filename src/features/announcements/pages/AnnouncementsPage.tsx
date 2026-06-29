import { useAnnouncements } from "../hooks/useAnnouncements";
import { AnnouncementCard } from "../components/AnnouncementCard";
import { Link } from "react-router-dom";
import { Plus, Megaphone, Loader2 } from "lucide-react";

export default function AnnouncementsPage() {
  const { data, isLoading, error } = useAnnouncements();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-slate-500 text-sm font-medium">Elanlar yüklənir...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 rounded-2xl border border-red-100 text-red-600 max-w-md mx-auto my-10">
        <h2 className="font-bold mb-1">Xəta baş verdi</h2>
        <p className="text-sm text-red-500">Elanları yükləmək mümkün olmadı. Yenidən yoxlayın.</p>
      </div>
    );
  }

  
  console.log(data);
  return (
    
    <div className="p-8 max-w-7xl mx-auto">
      {/* Хедер страницы */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-600 text-white rounded-xl shadow-md shadow-blue-100">
            <Megaphone size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Elanlar</h1>
            <p className="text-sm text-slate-500">Kampus daxilindəki ən son yeniliklər və bildirişlər</p>
          </div>
        </div>

        {/* Современная кнопка добавления */}
        <Link
          to="/announcements/create"
          className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <Plus size={18} />
          <span>Yeni Elan</span>
        </Link>
      </div>

      {/* Сетка карточек */}
      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
          <p className="text-slate-400 font-medium">Hələ heç bir elan yoxdur.</p>
        </div>
      )}
    </div>
  );
}