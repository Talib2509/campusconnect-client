import { AnnouncementForm } from "../components/AnnouncementForm";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function CreateAnnouncementPage() {
  return (
    <div className="p-8 max-w-xl mx-auto">
      <Link 
        to="/announcements" 
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        Geri qayıt
      </Link>
      
      <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-6">Yeni Elan Yarat</h1>

      <AnnouncementForm />
    </div>
  );
}