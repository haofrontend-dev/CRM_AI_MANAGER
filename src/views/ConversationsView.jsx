import { useState } from "react";
import {
  Bot,
  Facebook,
  Globe2,
  MessageCircle,
  SendHorizontal,
  Tag,
  UserRoundCheck,
} from "lucide-react";

const channelStyles = {
  Facebook: "bg-sky-400/10 text-sky-200 border-sky-300/20",
  Website: "bg-emerald-400/10 text-emerald-200 border-emerald-300/20",
  Zalo: "bg-cyan-400/10 text-cyan-200 border-cyan-300/20",
  Email: "bg-violet-400/10 text-violet-200 border-violet-300/20",
};

const channelIcons = {
  Facebook,
  Website: Globe2,
  Zalo: MessageCircle,
  Email: SendHorizontal,
};

function MessageBubble({ message }) {
  const own = message.from !== "customer";
  const ai = message.from === "ai";

  return (
    <div className={`flex ${own ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[88%] rounded-md px-4 py-3 ${
          own
            ? "bg-cyan-400/12 text-white ring-1 ring-cyan-300/20"
            : "border border-white/10 bg-white/5 text-slate-100"
        }`}
      >
        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-500">
          <span>{message.name}</span>
          <span>{message.time}</span>
          {ai ? (
            <span className="rounded-full bg-emerald-400/15 px-2 py-1 text-[10px] font-semibold text-emerald-200">
              AI Auto-replied (SOP)
            </span>
          ) : null}
        </div>
        <p className="text-sm leading-6 text-slate-200">{message.text}</p>
      </div>
    </div>
  );
}

export default function ConversationsView({
  conversations,
  selectedId,
  onSelectConversation,
  onSendMessage,
  onTagOwner,
  onHandoff,
}) {
  const [draft, setDraft] = useState("");
  const selectedConversation =
    conversations.find((conversation) => conversation.id === selectedId) ?? conversations[0];
  const SelectedChannelIcon = channelIcons[selectedConversation.channel] ?? MessageCircle;

  const sendDraft = () => {
    if (!draft.trim()) return;
    onSendMessage(selectedConversation.id, draft);
    setDraft("");
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[0.85fr_1.28fr_0.87fr]">
      <section className="rounded-md border border-cyan-300/10 bg-[#0f1b2d]/95">
        <div className="border-b border-white/10 px-5 py-4">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300/80">
            Inbox List
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">Tin nhắn đến</h3>
        </div>
        <div className="max-h-[760px] overflow-y-auto p-3">
          {conversations.map((conversation) => {
            const active = conversation.id === selectedConversation.id;
            const ChannelIcon = channelIcons[conversation.channel] ?? MessageCircle;

            return (
              <button
                key={conversation.id}
                className={`mb-2 w-full rounded-md border px-4 py-4 text-left transition ${
                  active
                    ? "border-cyan-300/30 bg-cyan-400/12 text-white"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-cyan-300/20 hover:bg-white/8"
                }`}
                onClick={() => onSelectConversation(conversation.id)}
                type="button"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 text-sm font-semibold text-slate-950">
                    {conversation.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate font-medium">{conversation.customer}</p>
                      <p className="shrink-0 text-xs text-slate-500">{conversation.time}</p>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-semibold ${channelStyles[conversation.channel]}`}
                      >
                        <ChannelIcon size={12} />
                        {conversation.channel}
                      </span>
                      {conversation.unread > 0 ? (
                        <span className="rounded-full bg-emerald-400 px-2 py-1 text-[11px] font-semibold text-slate-950">
                          {conversation.unread}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-3 line-clamp-2 text-sm leading-5 text-slate-400">
                      {conversation.preview}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-md border border-cyan-300/10 bg-[#0f1b2d]/95">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
          <div>
            <p className="text-lg font-semibold text-white">{selectedConversation.customer}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-400">
              <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 ${channelStyles[selectedConversation.channel]}`}>
                <SelectedChannelIcon size={14} />
                {selectedConversation.channel}
              </span>
              <span>{selectedConversation.topic}</span>
            </div>
          </div>
          <div className="rounded-md border border-emerald-300/15 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
            {selectedConversation.linkedTicketId
              ? `Linked ${selectedConversation.linkedTicketId}`
              : "AI Auto-routing enabled"}
          </div>
        </div>

        <div className="min-h-[520px] space-y-4 p-5">
          {selectedConversation.messages.map((message, index) => (
            <MessageBubble key={`${message.time}-${index}`} message={message} />
          ))}
        </div>

        <div className="border-t border-white/10 p-5">
          <div className="flex items-center gap-3 rounded-md border border-white/10 bg-white/5 px-4 py-3">
            <input
              className="min-w-0 flex-1 bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
              placeholder="Nhập phản hồi cho khách hoặc dùng Smart Reply..."
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") sendDraft();
              }}
            />
            <button
              className="rounded-md bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950"
              onClick={sendDraft}
              type="button"
            >
              Gửi
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="rounded-md border border-cyan-300/10 bg-[#0f1b2d]/95 p-5">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300/80">
            <Bot size={16} />
            AI Analysis
          </div>
          <div className="mt-4 rounded-md border border-emerald-300/15 bg-emerald-400/10 p-4">
            <p className="text-sm text-emerald-200">Phân loại yêu cầu</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {selectedConversation.aiClassification.type}
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Confidence Score: {selectedConversation.aiClassification.confidence}%
            </p>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            {selectedConversation.aiClassification.reason}
          </p>
        </div>

        <div className="rounded-md border border-cyan-300/10 bg-[#0f1b2d]/95 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300/80">
            Action Buttons
          </p>
          <div className="mt-4 grid gap-3">
            <button
              className="inline-flex items-center justify-center gap-2 rounded-md bg-amber-400 px-4 py-3 text-sm font-semibold text-slate-950"
              onClick={() => onHandoff(selectedConversation.id)}
              type="button"
            >
              <UserRoundCheck size={17} />
              {selectedConversation.handoffStatus ?? "Handoff"}
            </button>
            <button
              className="inline-flex items-center justify-center gap-2 rounded-md border border-cyan-300/25 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-100"
              onClick={() => onTagOwner(selectedConversation.id)}
              type="button"
            >
              <Tag size={17} />
              {selectedConversation.ownerTagged ? "Owner Tagged" : "Tag Owner"}
            </button>
          </div>
          <div className="mt-4 rounded-md border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-slate-500">PM đề xuất</p>
            <p className="mt-2 font-semibold text-white">
              {selectedConversation.aiClassification.suggestedOwner}
            </p>
          </div>
        </div>

        <div className="rounded-md border border-cyan-300/10 bg-[#0f1b2d]/95 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300/80">
            Smart Reply
          </p>
          <div className="mt-4 space-y-3">
            {selectedConversation.smartReplies.map((reply) => (
              <button
                key={reply}
                className="w-full rounded-md border border-white/10 bg-white/5 p-4 text-left text-sm leading-6 text-slate-300 transition hover:border-cyan-300/25 hover:bg-cyan-400/10"
                onClick={() => setDraft(reply)}
                type="button"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
