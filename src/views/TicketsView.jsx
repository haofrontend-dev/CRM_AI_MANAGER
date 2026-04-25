import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  Bell,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileSearch,
  Phone,
  Plus,
  UserRoundCheck,
  X,
} from "lucide-react";

const statusStyles = {
  Open: "border-amber-300/20 bg-amber-400/10 text-amber-200",
  "In-progress": "border-cyan-300/20 bg-cyan-400/10 text-cyan-200",
  Resolved: "border-emerald-300/20 bg-emerald-400/10 text-emerald-200",
};

const slaStyles = {
  "Có rủi ro": "text-amber-300",
  "Đúng tiến độ": "text-emerald-300",
  "Đã đóng": "text-slate-500",
  "Cần xem lại": "text-rose-300",
};

const ownerPool = [
  { name: "Lan Tran", role: "PM Vận hành" },
  { name: "Duc Pham", role: "Trưởng nhóm Sales" },
  { name: "Quynh Vo", role: "Nhân viên hỗ trợ" },
  { name: "My Nguyen", role: "Quản lý CX" },
  { name: "Huy Le", role: "PM Tăng trưởng" },
  { name: "Ngoc Tram", role: "CSKH Senior" },
];

const channelOptions = ["Facebook", "Zalo", "Web", "Email"];
const statusOptions = ["Open", "In-progress", "Resolved"];

/* ── Toast notification ── */
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2800);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bg =
    type === "success"
      ? "border-emerald-300/25 bg-emerald-400/15 text-emerald-200"
      : type === "warning"
        ? "border-amber-300/25 bg-amber-400/15 text-amber-200"
        : "border-cyan-300/25 bg-cyan-400/15 text-cyan-200";

  return (
    <div className={`fixed right-6 top-6 z-50 animate-[slide-in_220ms_ease] rounded-md border px-5 py-3 text-sm font-medium shadow-xl ${bg}`}>
      {message}
    </div>
  );
}

/* ── Create Ticket Modal ── */
function CreateTicketModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({ summary: "", channel: "Zalo", owner: ownerPool[0].name, deadline: "" });

  const handleSubmit = () => {
    if (!form.summary.trim() || !form.deadline.trim()) return;
    onSubmit(form);
    setForm({ summary: "", channel: "Zalo", owner: ownerPool[0].name, deadline: "" });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg rounded-md border border-cyan-300/15 bg-[#0b1728] p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Tạo ticket mới</h3>
          <button className="rounded-md border border-white/10 bg-white/5 p-2 text-slate-300" onClick={onClose} type="button"><X size={16} /></button>
        </div>

        <div className="mt-5 space-y-4">
          <label className="block">
            <span className="text-sm text-slate-400">Tóm tắt yêu cầu *</span>
            <textarea className="mt-2 w-full rounded-md border border-white/10 bg-[#09182a] px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-300/35" rows={3} value={form.summary} onChange={(e) => setForm((p) => ({ ...p, summary: e.target.value }))} placeholder="Mô tả ngắn vấn đề cần xử lý..." />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm text-slate-400">Nguồn kênh</span>
              <select className="mt-2 w-full rounded-md border border-white/10 bg-[#09182a] px-4 py-3 text-sm text-slate-100 outline-none" value={form.channel} onChange={(e) => setForm((p) => ({ ...p, channel: e.target.value }))}>
                {channelOptions.map((ch) => <option key={ch} value={ch}>{ch}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="text-sm text-slate-400">Người phụ trách</span>
              <select className="mt-2 w-full rounded-md border border-white/10 bg-[#09182a] px-4 py-3 text-sm text-slate-100 outline-none" value={form.owner} onChange={(e) => setForm((p) => ({ ...p, owner: e.target.value }))}>
                {ownerPool.map((o) => <option key={o.name} value={o.name}>{o.name} – {o.role}</option>)}
              </select>
            </label>
          </div>

          <label className="block">
            <span className="text-sm text-slate-400">Deadline *</span>
            <input className="mt-2 w-full rounded-md border border-white/10 bg-[#09182a] px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-300/35" value={form.deadline} onChange={(e) => setForm((p) => ({ ...p, deadline: e.target.value }))} placeholder="Ví dụ: Hôm nay, 16:00" />
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button className="rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-300" onClick={onClose} type="button">Huỷ</button>
          <button className="rounded-md bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950" onClick={handleSubmit} type="button">Tạo ticket</button>
        </div>
      </div>
    </div>
  );
}

/* ── Assign Owner Modal ── */
function AssignOwnerModal({ open, ticket, onClose, onAssign }) {
  if (!open || !ticket) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-sm rounded-md border border-cyan-300/15 bg-[#0b1728] p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold text-white">Điều phối owner – {ticket.id}</h3>
        <p className="mt-2 text-sm text-slate-400">Chọn PM/nhân sự nhận xử lý ticket này.</p>
        <div className="mt-5 space-y-2">
          {ownerPool.filter((o) => o.name !== ticket.owner).map((o) => (
            <button key={o.name} className="flex w-full items-center justify-between rounded-md border border-white/10 bg-white/5 px-4 py-3 text-left text-sm transition hover:border-cyan-300/25 hover:bg-cyan-400/10" onClick={() => onAssign(ticket.id, o.name, o.role)} type="button">
              <span className="font-medium text-white">{o.name}</span>
              <span className="text-xs text-slate-500">{o.role}</span>
            </button>
          ))}
        </div>
        <button className="mt-4 w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-300" onClick={onClose} type="button">Đóng</button>
      </div>
    </div>
  );
}

/* ── Filter Bar ── */
function FilterBar({ filter, setFilter, ticketCounts }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {["all", ...statusOptions].map((s) => {
        const active = filter === s;
        const label = s === "all" ? `Tất cả (${ticketCounts.all})` : `${s} (${ticketCounts[s] ?? 0})`;
        return (
          <button key={s} className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${active ? (s === "all" ? "border-cyan-300/30 bg-cyan-400/15 text-cyan-200" : statusStyles[s]) : "border-white/10 bg-white/5 text-slate-400 hover:border-cyan-300/20"}`} onClick={() => setFilter(s)} type="button">
            {label}
          </button>
        );
      })}
    </div>
  );
}

/* ── Main Component ── */
export default function TicketsView({ tickets: initialTickets, onUpdateTicketStatus }) {
  const [tickets, setTickets] = useState(initialTickets);
  const [selectedTicketId, setSelectedTicketId] = useState(tickets[0]?.id);
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId) ?? tickets[0];

  const ticketCounts = useMemo(() => {
    const counts = { all: tickets.length };
    for (const t of tickets) counts[t.status] = (counts[t.status] ?? 0) + 1;
    return counts;
  }, [tickets]);

  const filteredTickets = useMemo(() => (filter === "all" ? tickets : tickets.filter((t) => t.status === filter)), [tickets, filter]);

  useEffect(() => {
    if (!selectedTicketId || !tickets.some((t) => t.id === selectedTicketId)) {
      setSelectedTicketId(tickets[0]?.id);
    }
  }, [selectedTicketId, tickets]);

  const showToast = useCallback((message, type = "success") => setToast({ message, type, key: Date.now() }), []);

  /* ── Actions ── */
  const updateStatus = (ticketId, status) => {
    setTickets((prev) => prev.map((t) => (t.id === ticketId ? { ...t, status } : t)));
    onUpdateTicketStatus?.(ticketId, status);
    showToast(`${ticketId} → ${status}`);
  };

  const assignOwner = (ticketId, ownerName, ownerRole) => {
    setTickets((prev) => prev.map((t) => (t.id === ticketId ? { ...t, owner: ownerName, role: ownerRole, status: t.status === "Open" ? "In-progress" : t.status } : t)));
    setAssignOpen(false);
    showToast(`Đã gán ${ownerName} cho ${ticketId}`);
  };

  const escalateTicket = (ticketId) => {
    setTickets((prev) => prev.map((t) => (t.id === ticketId ? { ...t, sla: "Cần xem lại", status: t.status === "Resolved" ? t.status : "In-progress" } : t)));
    showToast(`Đã escalate ${ticketId} lên cấp quản lý`, "warning");
  };

  const remindOwner = (ticketId) => {
    const t = tickets.find((tk) => tk.id === ticketId);
    if (!t) return;
    showToast(`Đã gửi nhắc việc tới ${t.owner} cho ${ticketId}`, "info");
  };

  const callCustomer = (ticketId) => {
    showToast(`Đã tạo nhắc gọi khách cho ${ticketId}`, "info");
  };

  const resolveTicket = (ticketId) => {
    updateStatus(ticketId, "Resolved");
  };

  const createTicket = (form) => {
    const nextNum = tickets.length > 0 ? Math.max(...tickets.map((t) => parseInt(t.id.replace("TK-", ""), 10))) + 1 : 2000;
    const ownerInfo = ownerPool.find((o) => o.name === form.owner) ?? ownerPool[0];
    const newTicket = {
      id: `TK-${nextNum}`,
      channel: form.channel,
      summary: form.summary,
      name: form.summary.slice(0, 40),
      owner: ownerInfo.name,
      role: ownerInfo.role,
      status: "Open",
      deadline: form.deadline,
      sla: "Đúng tiến độ",
      audit: {
        reason: "Ticket tạo thủ công bởi người dùng từ dashboard.",
        rule: "Chưa áp dụng rule tự động.",
        faq: "Chưa có FAQ liên quan.",
        confidence: 0,
      },
    };
    setTickets((prev) => [newTicket, ...prev]);
    setSelectedTicketId(newTicket.id);
    setCreateOpen(false);
    showToast(`Đã tạo ${newTicket.id}`);
  };

  if (!selectedTicket) {
    return (
      <div className="rounded-md border border-cyan-300/10 bg-[#0f1b2d]/95 p-6 text-slate-300">
        Chưa có ticket nào.
      </div>
    );
  }

  return (
    <>
      {toast ? <Toast key={toast.key} message={toast.message} type={toast.type} onClose={() => setToast(null)} /> : null}
      <CreateTicketModal open={createOpen} onClose={() => setCreateOpen(false)} onSubmit={createTicket} />
      <AssignOwnerModal open={assignOpen} ticket={selectedTicket} onClose={() => setAssignOpen(false)} onAssign={assignOwner} />

      <div className="space-y-6">
        {/* ── Stats row ── */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-md border border-amber-300/15 bg-amber-400/10 p-4">
            <p className="text-sm text-slate-400">Ticket nguy cơ trễ SLA</p>
            <p className="mt-2 text-2xl font-bold text-amber-200">{tickets.filter((t) => t.sla === "Có rủi ro" || t.sla === "Cần xem lại").length}</p>
          </div>
          <div className="rounded-md border border-cyan-300/15 bg-cyan-400/10 p-4">
            <p className="text-sm text-slate-400">Đang xử lý</p>
            <p className="mt-2 text-2xl font-bold text-cyan-200">{tickets.filter((t) => t.status === "In-progress").length}</p>
          </div>
          <div className="rounded-md border border-emerald-300/15 bg-emerald-400/10 p-4">
            <p className="text-sm text-slate-400">Đã giải quyết</p>
            <p className="mt-2 text-2xl font-bold text-emerald-200">{tickets.filter((t) => t.status === "Resolved").length}</p>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
          {/* ── Table ── */}
          <section className="rounded-md border border-cyan-300/10 bg-[#0f1b2d]/95">
            <div className="flex flex-col gap-4 border-b border-white/10 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300/80">
                  Ticketing &amp; AI Audit Log
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-white">
                  Ticket do AI tạo từ hội thoại
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button className="inline-flex items-center gap-2 rounded-md border border-cyan-300/25 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20" onClick={() => setCreateOpen(true)} type="button">
                  <Plus size={16} />
                  Tạo ticket
                </button>
                <button className="rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-cyan-300/20" type="button">
                  Xuất danh sách
                </button>
              </div>
            </div>

            <div className="border-b border-white/10 px-6 py-3">
              <FilterBar filter={filter} setFilter={setFilter} ticketCounts={ticketCounts} />
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="bg-white/5 text-sm text-slate-400">
                  <tr>
                    <th className="px-6 py-4 font-medium">Mã Ticket</th>
                    <th className="px-6 py-4 font-medium">Nguồn Kênh</th>
                    <th className="px-6 py-4 font-medium">Tóm tắt yêu cầu</th>
                    <th className="px-6 py-4 font-medium">Người phụ trách (PM)</th>
                    <th className="px-6 py-4 font-medium">Trạng thái</th>
                    <th className="px-6 py-4 font-medium">SLA</th>
                    <th className="px-6 py-4 font-medium">Deadline</th>
                    <th className="px-6 py-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.map((ticket) => {
                    const active = ticket.id === selectedTicket?.id;
                    return (
                      <tr
                        key={ticket.id}
                        className={`cursor-pointer border-t border-white/10 text-sm transition ${active ? "bg-cyan-400/10" : "hover:bg-white/5"}`}
                        onClick={() => setSelectedTicketId(ticket.id)}
                      >
                        <td className="px-6 py-5 font-semibold text-white">{ticket.id}</td>
                        <td className="px-6 py-5 text-slate-300">{ticket.channel}</td>
                        <td className="max-w-[300px] px-6 py-5 text-slate-300">{ticket.summary}</td>
                        <td className="px-6 py-5">
                          <p className="font-medium text-white">{ticket.owner}</p>
                          <p className="mt-1 text-xs text-slate-500">{ticket.role}</p>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`rounded-full border px-3 py-2 text-xs font-semibold ${statusStyles[ticket.status]}`}>
                            {ticket.status}
                          </span>
                        </td>
                        <td className={`px-6 py-5 text-sm font-medium ${slaStyles[ticket.sla] ?? "text-slate-400"}`}>{ticket.sla}</td>
                        <td className="px-6 py-5 text-slate-300">{ticket.deadline}</td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {ticket.status !== "Resolved" ? (
                              <button className="rounded-md border border-emerald-300/20 bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-200 transition hover:bg-emerald-400/20" onClick={(e) => { e.stopPropagation(); resolveTicket(ticket.id); }} type="button" title="Đóng ticket">
                                <CheckCircle2 size={14} />
                              </button>
                            ) : null}
                            <button className="inline-flex items-center gap-1 text-sm font-medium text-cyan-200" onClick={(e) => { e.stopPropagation(); setSelectedTicketId(ticket.id); }} type="button">
                              Xem <ChevronRight size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredTickets.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-10 text-center text-sm text-slate-500">Không có ticket nào ở trạng thái này.</td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── Sidebar Audit + Actions ── */}
          <aside className="sticky top-28 h-fit space-y-4">
            {/* Audit panel */}
            <div className="rounded-md border border-cyan-300/15 bg-[#09182a] p-5 shadow-2xl shadow-cyan-950/30">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300/80">AI Audit Log</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{selectedTicket.id}</h3>
                  <p className="mt-1 text-xs text-slate-500">{selectedTicket.name}</p>
                </div>
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[selectedTicket.status]}`}>
                  {selectedTicket.status}
                </span>
              </div>

              <div className="mt-5 rounded-md border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-200">
                  <BrainCircuit size={17} />
                  Vì sao AI tag PM này?
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">{selectedTicket.audit.reason}</p>
              </div>

              <div className="mt-4 rounded-md border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-cyan-200">
                  <FileSearch size={17} />
                  Rule/FAQ đã dùng
                </div>
                <div className="mt-3 space-y-3 text-sm leading-6 text-slate-300">
                  <p>{selectedTicket.audit.rule}</p>
                  <p>{selectedTicket.audit.faq}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-md border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Confidence</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{selectedTicket.audit.confidence}%</p>
                </div>
                <div className="rounded-md border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-500">
                    <Clock3 size={14} />
                    Deadline
                  </div>
                  <p className="mt-2 text-sm font-semibold text-white">{selectedTicket.deadline}</p>
                </div>
              </div>

              {/* Status toggle */}
              <div className="mt-4 rounded-md border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">Cập nhật trạng thái</p>
                <div className="mt-3 grid gap-2">
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      className={`rounded-md border px-3 py-2 text-sm font-semibold transition ${selectedTicket.status === status ? statusStyles[status] : "border-white/10 bg-white/5 text-slate-300 hover:border-cyan-300/25"}`}
                      onClick={() => updateStatus(selectedTicket.id, status)}
                      type="button"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action center */}
            <div className="rounded-md border border-cyan-300/15 bg-[#09182a] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300/80">Action Center</p>
              <div className="mt-4 grid gap-2">
                <button className="flex w-full items-center gap-3 rounded-md border border-cyan-300/25 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20" onClick={() => setAssignOpen(true)} type="button">
                  <UserRoundCheck size={17} />
                  Điều phối owner
                </button>
                <button className="flex w-full items-center gap-3 rounded-md border border-amber-300/20 bg-amber-400/10 px-4 py-3 text-sm font-semibold text-amber-200 transition hover:bg-amber-400/20" onClick={() => escalateTicket(selectedTicket.id)} type="button">
                  <ArrowUpRight size={17} />
                  Escalate PM / pháp lý
                </button>
                <button className="flex w-full items-center gap-3 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-cyan-300/20" onClick={() => remindOwner(selectedTicket.id)} type="button">
                  <Bell size={17} />
                  Nhắc owner xử lý
                </button>
                <button className="flex w-full items-center gap-3 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-cyan-300/20" onClick={() => callCustomer(selectedTicket.id)} type="button">
                  <Phone size={17} />
                  Tạo nhắc gọi khách
                </button>
                {selectedTicket.status !== "Resolved" ? (
                  <button className="flex w-full items-center gap-3 rounded-md bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300" onClick={() => resolveTicket(selectedTicket.id)} type="button">
                    <CheckCircle2 size={17} />
                    Đóng ticket
                  </button>
                ) : (
                  <button className="flex w-full items-center gap-3 rounded-md border border-amber-300/20 bg-amber-400/10 px-4 py-3 text-sm font-semibold text-amber-200 transition hover:bg-amber-400/20" onClick={() => updateStatus(selectedTicket.id, "Open")} type="button">
                    <AlertTriangle size={17} />
                    Mở lại ticket
                  </button>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
