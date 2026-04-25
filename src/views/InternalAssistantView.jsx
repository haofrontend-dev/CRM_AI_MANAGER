import { useState } from "react";
import { Bot, Database, MailCheck, Plus, SendHorizontal, ShieldCheck, TimerReset } from "lucide-react";
import { internalAssistantMessages } from "../data";

const quickPrompts = [
  { label: "Truy vấn dữ liệu Odoo", icon: Database },
  { label: "Tổng hợp email hôm nay", icon: MailCheck },
  { label: "Tạo nhắc việc", icon: TimerReset },
];

export default function InternalAssistantView() {
  const [messages, setMessages] = useState(internalAssistantMessages);
  const [draft, setDraft] = useState("");

  const sendPrompt = (text) => {
    if (!text.trim()) return;

    setMessages((current) => [
      ...current,
      { role: "user", text, time: "09:12" },
      {
        role: "assistant",
        text: `Đã nhận yêu cầu: "${text}". Tôi sẽ chỉ truy xuất dữ liệu nằm trong quyền Quản lý cấp trung và lưu audit log cho lượt tra cứu này.`,
        time: "09:12",
      },
    ]);
    setDraft("");
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
      <section className="rounded-md border border-cyan-300/10 bg-[#0f1b2d]/95">
        <div className="flex flex-col gap-4 border-b border-white/10 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300/80">
              Internal AI Assistant
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Trợ lý nội bộ</h3>
          </div>
          <div className="inline-flex items-center gap-2 rounded-md border border-emerald-300/20 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-200">
            <ShieldCheck size={17} />
            Mức độ truy cập hiện tại: Quản lý cấp trung
          </div>
        </div>

        <div className="min-h-[560px] space-y-4 p-6">
          {messages.map((message, index) => {
            const assistant = message.role === "assistant";

            return (
              <div key={`${message.time}-${index}`} className={`flex ${assistant ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[78%] rounded-md px-4 py-3 ${
                    assistant
                      ? "border border-white/10 bg-white/5 text-slate-200"
                      : "bg-cyan-400/12 text-white ring-1 ring-cyan-300/20"
                  }`}
                >
                  <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-500">
                    {assistant ? <Bot size={14} /> : null}
                    <span>{assistant ? "AI nội bộ" : "Bạn"}</span>
                    <span>{message.time}</span>
                  </div>
                  <p className="text-sm leading-6">{message.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-white/10 p-5">
          <div className="flex items-center gap-3 rounded-md border border-white/10 bg-white/5 px-4 py-3">
            <input
              className="min-w-0 flex-1 bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
              placeholder="Hỏi dữ liệu nội bộ, email, ticket, lịch nhắc việc..."
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") sendPrompt(draft);
              }}
            />
            <button
              className="rounded-md bg-cyan-400 p-3 text-slate-950"
              onClick={() => sendPrompt(draft)}
              type="button"
            >
              <SendHorizontal size={18} />
            </button>
          </div>
        </div>
      </section>

      <aside className="space-y-4">
        <div className="rounded-md border border-cyan-300/10 bg-[#0f1b2d]/95 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300/80">
            Quick Prompts
          </p>
          <div className="mt-4 space-y-3">
            {quickPrompts.map((prompt) => {
              const Icon = prompt.icon;

              return (
                <button
                  key={prompt.label}
                  className="flex w-full items-center justify-between rounded-md border border-white/10 bg-white/5 px-4 py-4 text-left text-sm font-semibold text-white transition hover:border-cyan-300/25 hover:bg-cyan-400/10"
                  onClick={() => sendPrompt(prompt.label)}
                  type="button"
                >
                  <span className="flex items-center gap-3">
                    <Icon size={18} className="text-cyan-200" />
                    {prompt.label}
                  </span>
                  <Plus size={16} className="text-slate-500" />
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-md border border-amber-300/15 bg-amber-400/10 p-5">
          <p className="text-sm font-semibold text-amber-200">Phạm vi bảo mật</p>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Trợ lý chỉ trả lời dữ liệu được phân quyền, các truy vấn Odoo/ERP đều được ghi audit log
            theo người dùng và vai trò.
          </p>
        </div>
      </aside>
    </div>
  );
}
