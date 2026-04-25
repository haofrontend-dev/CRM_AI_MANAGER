import {
  Bot,
  ChevronRight,
  ClipboardList,
  GitBranch,
  LayoutDashboard,
  Megaphone,
  MessageSquareMore,
  ShieldCheck,
  UserRoundCog,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { navigation } from "../data";

const iconMap = {
  overview: LayoutDashboard,
  workflow: GitBranch,
  conversations: MessageSquareMore,
  tickets: ClipboardList,
  audit: ShieldCheck,
  marketing: Megaphone,
  internal: UserRoundCog,
};

export default function Sidebar({ activeView, open, setOpen }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-950/45 backdrop-blur-sm transition lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[304px] flex-col border-r border-cyan-300/15 bg-[#071222] px-5 pb-5 pt-6 shadow-2xl shadow-slate-950/20 transition duration-300 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-gradient-to-br from-cyan-400 via-teal-400 to-emerald-400 text-slate-950 shadow-lg shadow-cyan-500/20">
              <Bot size={22} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80">
                Trung tâm điều phối AI
              </p>
              <h1 className="text-lg font-bold text-white">Vận hành đa kênh</h1>
            </div>
          </div>
          <button
            className="rounded-md border border-cyan-300/15 bg-white/5 p-2 text-slate-300 lg:hidden"
            onClick={() => setOpen(false)}
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-8 rounded-md border border-cyan-300/20 bg-[#06101f] px-4 py-4 text-white shadow-lg shadow-cyan-950/20">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/80">Tình trạng hệ thống</p>
          <div className="mt-3 flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                6 agent hoạt động ổn định
              </div>
              <p className="mt-2 text-2xl font-semibold">97.8%</p>
              <p className="text-sm text-slate-400">thời gian định tuyến ổn định tuần này</p>
            </div>
            <div className="rounded-md bg-cyan-400/10 px-3 py-2 text-right ring-1 ring-cyan-300/15">
              <p className="text-xs text-slate-300">Hàng đợi handoff</p>
              <p className="text-lg font-semibold">31</p>
            </div>
          </div>
        </div>

        <nav className="mt-8 flex-1 space-y-7 overflow-y-auto">
          {navigation.map((section) => (
            <div key={section.group}>
              <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                {section.group}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = iconMap[item.id];
                  const active = item.id === activeView;

                  return (
                    <NavLink
                      key={item.id}
                      to={item.path}
                      className={`flex w-full items-center justify-between rounded-md px-3 py-3 text-left transition ${
                        active
                          ? "bg-cyan-400/12 text-white shadow-sm ring-1 ring-cyan-300/35"
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }`}
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`flex h-10 w-10 items-center justify-center rounded-md ${
                            active ? "bg-cyan-400/15 text-cyan-200" : "bg-white/5 text-slate-400"
                          }`}
                        >
                          <Icon size={18} />
                        </span>
                        <span>
                          <span className="block font-semibold">{item.label}</span>
                          <span className="block text-xs text-slate-500">{item.hint}</span>
                        </span>
                      </span>
                      <ChevronRight size={16} className={active ? "text-cyan-200" : "text-slate-500"} />
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="mt-5 rounded-md border border-amber-300/15 bg-amber-400/10 px-4 py-4">
          <p className="text-sm font-semibold text-amber-200">Ghi chú giám sát</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            AI có thể soạn phản hồi đầu tiên, nhưng các ca hoàn tiền, pháp lý hoặc cần chuyển cấp vẫn
            phải có người xác nhận trước khi đóng.
          </p>
        </div>
      </aside>
    </>
  );
}
