import { useState } from "react";
import { FileText, Sparkles } from "lucide-react";
import { marketingCampaignCards } from "../data";

const defaultContent =
  "Tiêu đề: ViProperty giúp đội vận hành phản hồi khách nhanh hơn với AI Agent đa kênh\n\nNội dung nháp:\nViProperty AI Agent hỗ trợ doanh nghiệp tiếp nhận hội thoại từ Zalo, Facebook và Website, tự động phân loại yêu cầu, phản hồi bước đầu theo SOP/FAQ và tạo ticket cho đúng PM phụ trách.\n\nCTA: Đăng ký demo để xem quy trình AI Copilot trong vận hành thực tế.";

export default function MarketingView() {
  const [keyword, setKeyword] = useState("AI Agent đa kênh cho bất động sản");
  const [content, setContent] = useState(defaultContent);

  const generateContent = () => {
    setContent(
      `Tiêu đề: ${keyword}\n\nViProperty giới thiệu giải pháp AI Agent giúp đội kinh doanh và CSKH xử lý hội thoại đa kênh nhanh, đúng SOP và có kiểm soát. Hệ thống tự động phân loại nhu cầu, đề xuất phản hồi, tạo ticket và lưu lại log quyết định để quản lý dễ theo dõi.\n\nThông điệp chính: phản hồi nhanh hơn, giảm sót khách, tăng khả năng chuyển đổi lead.\n\nCTA: Liên hệ ViProperty để nhận demo theo quy trình vận hành của doanh nghiệp.`,
    );
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
        {marketingCampaignCards.map((item) => (
          <div key={item.label} className="rounded-md border border-cyan-300/10 bg-[#0f1b2d]/95 p-5">
            <p className="text-sm text-slate-400">{item.label}</p>
            <p className="mt-4 text-3xl font-semibold text-white">{item.value}</p>
            <div className="mt-4 flex items-center justify-between gap-3 text-sm">
              <span className="font-medium text-emerald-200">{item.change}</span>
              <span className="text-right text-slate-500">{item.source}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-md border border-cyan-300/10 bg-[#0f1b2d]/95 p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300/80">
                Content Assistance
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Text Editor</h3>
            </div>
            <FileText size={22} className="text-cyan-200" />
          </div>

          <textarea
            className="mt-6 min-h-[430px] w-full resize-y rounded-md border border-white/10 bg-[#09182a] p-5 text-sm leading-7 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/35"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>

        <aside className="rounded-md border border-cyan-300/10 bg-[#0f1b2d]/95 p-6">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300/80">
            <Sparkles size={17} />
            AI Guideline
          </div>
          <h3 className="mt-2 text-2xl font-semibold text-white">ViProperty content brief</h3>

          <label className="mt-6 block">
            <span className="text-sm text-slate-400">Từ khóa / chủ đề</span>
            <input
              className="mt-2 w-full rounded-md border border-white/10 bg-[#09182a] px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-300/35"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
          </label>

          <div className="mt-5 space-y-3">
            {[
              "Giọng văn: chuyên nghiệp, rõ lợi ích vận hành, không phóng đại.",
              "Bắt buộc nhắc tới: đa kênh, SOP/FAQ, ticket, log kiểm soát.",
              "CTA ưu tiên: đăng ký demo hoặc liên hệ tư vấn quy trình.",
              "Đối tượng: CEO, Head of CSKH, PM vận hành, đội Marketing.",
            ].map((item) => (
              <div key={item} className="rounded-md border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-300">
                {item}
              </div>
            ))}
          </div>

          <button
            className="mt-6 w-full rounded-md bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950"
            onClick={generateContent}
            type="button"
          >
            Generate Content
          </button>
        </aside>
      </section>
    </div>
  );
}
