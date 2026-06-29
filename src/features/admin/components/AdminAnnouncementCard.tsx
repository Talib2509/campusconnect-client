import { useState } from "react";
import type { Announcement } from "../../announcements/types/announcement.types";
import { useApproveAnnouncement } from "../../announcements/hooks/useApproveAnnouncement";
import { useRejectAnnouncement } from "../../announcements/hooks/useRejectAnnouncement";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Calendar, 
  Eye, 
  AlertCircle,
  ChevronDown,
  ChevronUp,
  MoreVertical
} from "lucide-react";

interface Props {
  announcement: Announcement;
}

function getStatusConfig(status: string) {
  switch (status) {
    case "Pending":
      return {
        icon: Clock,
        label: "На рассмотрении",
        color: "text-amber-700",
        bg: "bg-amber-50",
        border: "border-amber-200/50",
        dot: "bg-amber-400"
      };
    case "Approved":
      return {
        icon: CheckCircle,
        label: "Одобрено",
        color: "text-emerald-700",
        bg: "bg-emerald-50",
        border: "border-emerald-200/50",
        dot: "bg-emerald-400"
      };
    case "Rejected":
      return {
        icon: XCircle,
        label: "Отклонено",
        color: "text-rose-700",
        bg: "bg-rose-50",
        border: "border-rose-200/50",
        dot: "bg-rose-400"
      };
    default:
      return {
        icon: AlertCircle,
        label: status,
        color: "text-gray-700",
        bg: "bg-gray-50",
        border: "border-gray-200/50",
        dot: "bg-gray-400"
      };
  }
}

function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function AdminAnnouncementCard({ announcement }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showActions, setShowActions] = useState(false);
  
  const approve = useApproveAnnouncement();
  const reject = useRejectAnnouncement();
  
  const statusConfig = getStatusConfig(announcement.status);
  const StatusIcon = statusConfig.icon;

  const handleApprove = () => {
    if (window.confirm('Вы уверены, что хотите одобрить это объявление?')) {
      approve.mutate(announcement.id);
    }
  };

  const handleReject = () => {
    if (window.confirm('Вы уверены, что хотите отклонить это объявление?')) {
      reject.mutate(announcement.id);
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-200/70 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden">
      
      {/* Градиентный акцент сверху */}
      <div className={`h-1 w-full transition-all duration-300 ${
        announcement.status === "Approved" ? "bg-gradient-to-r from-emerald-400 to-teal-400" :
        announcement.status === "Rejected" ? "bg-gradient-to-r from-rose-400 to-red-400" :
        "bg-gradient-to-r from-amber-400 to-orange-400"
      }`} />

      <div className="p-6">
        {/* Шапка */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              {/* Статус */}
              <div className={`
                inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold
                ${statusConfig.bg} ${statusConfig.color} border ${statusConfig.border}
                transition-all duration-200
              `}>
                <StatusIcon size={14} className="flex-shrink-0" />
                <span>{statusConfig.label}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot} animate-pulse`} />
              </div>

              {/* ID объявления */}
              <span className="text-xs text-gray-400 font-mono bg-gray-50 px-2 py-1 rounded-lg border border-gray-200/50">
                #{announcement.id}
              </span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mt-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
              {announcement.title}
            </h3>
          </div>

          {/* Кнопка действий */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
            >
              <MoreVertical size={18} />
            </button>

            {showActions && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-10 animate-in fade-in slide-in-from-top-2 duration-200">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Eye size={14} />
                  Просмотр
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Calendar size={14} />
                  История
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Контент */}
        <div className="mt-4">
          <p className={`text-gray-600 text-sm leading-relaxed ${!isExpanded && 'line-clamp-3'}`}>
            {announcement.content}
          </p>
          
          {announcement.content.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1"
            >
              {isExpanded ? (
                <>Скрыть <ChevronUp size={14} /></>
              ) : (
                <>Читать далее <ChevronDown size={14} /></>
              )}
            </button>
          )}
        </div>

        {/* Информация об авторе */}
        <div className="mt-4 flex items-center gap-4 p-3 bg-gray-50/80 rounded-xl border border-gray-100/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
              {announcement.authorName?.charAt(0).toUpperCase() || "A"}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {announcement.authorName || "Аноним"}
              </p>
              <p className="text-xs text-gray-400">Автор</p>
            </div>
          </div>
          
          <div className="flex-1" />
          
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Calendar size={14} />
            <span>{formatDate(announcement.createdAt)}</span>
          </div>
        </div>

        {/* Действия */}
        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-3">
          {announcement.status === "Pending" && (
            <>
              <button
                onClick={handleApprove}
                disabled={approve.isPending}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {approve.isPending ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle size={18} />
                    Одобрить
                  </>
                )}
              </button>
              
              <button
                onClick={handleReject}
                disabled={reject.isPending}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-red-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-rose-500/25 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {reject.isPending ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <XCircle size={18} />
                    Отклонить
                  </>
                )}
              </button>
            </>
          )}

          {announcement.status === "Approved" && (
            <button
              onClick={handleReject}
              disabled={reject.isPending}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-red-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-rose-500/25 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {reject.isPending ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <XCircle size={18} />
                  Отменить одобрение
                </>
              )}
            </button>
          )}

          {announcement.status === "Rejected" && (
            <button
              onClick={handleApprove}
              disabled={approve.isPending}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {approve.isPending ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <CheckCircle size={18} />
                  Одобрить повторно
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}