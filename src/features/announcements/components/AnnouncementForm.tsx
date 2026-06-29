import { useState } from "react";
import { useCreateAnnouncement } from "../hooks/useCreateAnnouncement";
import { Send, FileText, LayoutGrid, Type, Loader2 } from "lucide-react";

export function AnnouncementForm() {
  const { mutate, isPending } = useCreateAnnouncement();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !content) return;

    mutate({ title, content, category }, {
      onSuccess: () => {
        setTitle("");
        setContent("");
        setCategory("");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm max-w-xl mx-auto space-y-5">
      
      {/* Поле: Заголовок */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
          <Type size={16} className="text-slate-400" />
          Başlıq
        </label>
        <input
          type="text"
          required
          placeholder="Elanın qısa və aydın başlığı"
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Поле: Категория */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
          <LayoutGrid size={16} className="text-slate-400" />
          Kateqoriya
        </label>
        <input
          type="text"
          placeholder="Məsələn: Tədbir, İmtahan, İtkin əşya"
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      {/* Поле: Содержимое */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
          <FileText size={16} className="text-slate-400" />
          Məzmun
        </label>
        <textarea
          required
          rows={5}
          placeholder="Elan haqqında ətraflı məlumat yazın..."
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* Кнопка отправки */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>Göndərilir...</span>
          </>
        ) : (
          <>
            <Send size={16} />
            <span>Paylaş</span>
          </>
        )}
      </button>
    </form>
  );
}