import { useState } from "react";
import type { Announcement } from "../types/announcement.types";
import { MessageSquare, ThumbsUp, User, Tag, Clock, Share2, Bookmark, MoreHorizontal } from "lucide-react";
import { CommentsModal } from "../../comments/components/CommentsModal";
import { useLike, useDislike } from "../../likes/hooks/useLike";

interface Props {
  announcement: Announcement;
}

// Функция для форматирования времени без date-fns
function formatTimeAgo(date: Date | string): string {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'только что';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    const minutes = diffInMinutes;
    const lastDigit = minutes % 10;
    const lastTwoDigits = minutes % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return `${minutes} минут назад`;
    }
    if (lastDigit === 1) {
      return `${minutes} минуту назад`;
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return `${minutes} минуты назад`;
    }
    return `${minutes} минут назад`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    const hours = diffInHours;
    const lastDigit = hours % 10;
    const lastTwoDigits = hours % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return `${hours} часов назад`;
    }
    if (lastDigit === 1) {
      return `${hours} час назад`;
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return `${hours} часа назад`;
    }
    return `${hours} часов назад`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    const days = diffInDays;
    const lastDigit = days % 10;
    const lastTwoDigits = days % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return `${days} дней назад`;
    }
    if (lastDigit === 1) {
      return `${days} день назад`;
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return `${days} дня назад`;
    }
    return `${days} дней назад`;
  }
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    const weeks = diffInWeeks;
    const lastDigit = weeks % 10;
    const lastTwoDigits = weeks % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return `${weeks} недель назад`;
    }
    if (lastDigit === 1) {
      return `${weeks} неделю назад`;
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return `${weeks} недели назад`;
    }
    return `${weeks} недель назад`;
  }
  
  const diffInMonths = Math.floor(diffInWeeks / 4);
  if (diffInMonths < 12) {
    const months = diffInMonths;
    const lastDigit = months % 10;
    const lastTwoDigits = months % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return `${months} месяцев назад`;
    }
    if (lastDigit === 1) {
      return `${months} месяц назад`;
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return `${months} месяца назад`;
    }
    return `${months} месяцев назад`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  const years = diffInYears;
  const lastDigit = years % 10;
  const lastTwoDigits = years % 100;
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return `${years} лет назад`;
  }
  if (lastDigit === 1) {
    return `${years} год назад`;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${years} года назад`;
  }
  return `${years} лет назад`;
}

export function AnnouncementCard({ announcement }: Props) {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const like = useLike();
  const dislike = useDislike();
  
  const handleLikeToggle = () => {
    // console.log({
    //   postId: announcement.id,
    //   postType: 0
    // });

    if (announcement.isLikedByCurrentUser) {
      dislike.mutate({
        postId: announcement.id,
        postType: 0,
      });
    } else {
      like.mutate({
        postId: announcement.id,
        postType: 0,
      });
    }
  };
  
  const timeAgo = formatTimeAgo(announcement.createdAt);
  
  return (
    <>
    <div className="group relative bg-white rounded-2xl border border-gray-100/80 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-gray-200/80 hover:-translate-y-1">
    
    {/* Градиентная линия сверху */}
    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    
    {/* Кнопка действий */}
    <button className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100">
    <MoreHorizontal size={18} />
    </button>
    
    {/* Шапка */}
    <div className="flex items-start justify-between mb-4">
    <div className="flex items-center gap-3">
    <div className="relative">
    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-white shadow-sm flex items-center justify-center text-blue-600 group-hover:shadow-md transition-all">
    <User size={20} strokeWidth={1.5} />
    </div>
    {/* Онлайн-статус */}
    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />
    </div>
    
    <div>
    <div className="flex items-center gap-2">
    <span className="text-sm font-semibold text-gray-900">
    {announcement.authorName || "Аноним"}
    </span>
    <span className="text-xs text-gray-400 font-medium">·</span>
    </div>
    <div className="flex items-center gap-1.5 mt-0.5">
    <Clock size={12} className="text-gray-400" />
    <span className="text-xs text-gray-400">{timeAgo}</span>
    </div>
    </div>
    </div>
    
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-100/50 shrink-0 ml-3">
    <Tag size={12} className="text-blue-500" />
    {announcement.category || "Общее"}
    </span>
    </div>
    
    {/* Контент */}
    <div className="space-y-3 mb-4">
    <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
    {announcement.title}
    </h3>
    
    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
    {announcement.content}
    </p>
    </div>
    
    {/* Футер */}
    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
    <div className="flex items-center gap-1">
    {/* Лайк */}
    <button
    onClick={handleLikeToggle}
    className={`group/like flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
      announcement.isLikedByCurrentUser
      ? "bg-red-50 text-red-600 hover:bg-red-100"
      : "text-gray-500 hover:text-red-600 hover:bg-red-50"
    }`}
    >
    <ThumbsUp
    size={15}
    className={`transition-transform duration-200 ${
      announcement.isLikedByCurrentUser ? "scale-110" : "group-hover/like:scale-110"
    }`}
    fill={announcement.isLikedByCurrentUser ? "currentColor" : "none"}
    />
    <span>{announcement.likeCount}</span>
    </button>
    
    {/* Комментарии */}
    <button
    onClick={() => setCommentsOpen(true)}
    className="group/comment flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
    >
    <MessageSquare size={15} className="group-hover/comment:scale-110 transition-transform" />
    <span>{announcement.commentCount}</span>
    </button>
    </div>
    
    <div className="flex items-center gap-1">
    {/* Закладка */}
    <button
    onClick={() => setIsBookmarked(!isBookmarked)}
    className={`p-1.5 rounded-lg transition-all duration-200 ${
      isBookmarked
      ? "text-blue-600 bg-blue-50"
      : "text-gray-400 hover:text-blue-600 hover:bg-blue-50"
    }`}
    >
    <Bookmark
    size={17}
    fill={isBookmarked ? "currentColor" : "none"}
    className="transition-transform duration-200 hover:scale-110"
    />
    </button>
    
    {/* Поделиться */}
    <button className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
    <Share2 size={17} className="hover:scale-110 transition-transform" />
    </button>
    </div>
    </div>
    </div>
    
    <CommentsModal
    open={commentsOpen}
    onClose={() => setCommentsOpen(false)}
    announcementId={announcement.id}
    />
    </>
  );
}