import { Bell, Menu, Search, Sparkles } from "lucide-react";

const viewMeta = {
  overview: {
    title: "Tổng quan vận hành",
    subtitle: "Theo dõi sức khỏe hệ thống, độ chính xác AI và tải handoff trên toàn bộ kênh.",
  },
  workflow: {
    title: "Workflow AI Agent",
    subtitle: "Mô phỏng router, phân loại, SOP/FAQ, handoff, tagging, escalation và ticket flow.",
  },
  conversations: {
    title: "Hội thoại trực tiếp",
    subtitle: "Giám sát inbox đa kênh và kiểm tra định tuyến có AI hỗ trợ theo thời gian thực.",
  },
  tickets: {
    title: "Hệ thống ticket",
    subtitle: "Theo dõi ticket do AI tạo, người phụ trách, trạng thái và deadline sắp tới.",
  },
  audit: {
    title: "Nhật ký & kiểm soát",
    subtitle: "Kiểm tra lịch sử xử lý và lý do đứng sau các quyết định của AI.",
  },
  marketing: {
    title: "Marketing AI Assistant",
    subtitle: "Theo dõi chiến dịch và tạo nội dung theo guideline ViProperty.",
  },
  internal: {
    title: "Internal AI Assistant",
    subtitle: "Chat nội bộ theo phân quyền, hỗ trợ Odoo, email và nhắc việc.",
  },
};

export default function Header({ activeView, onOpenSidebar }) {
  const current = viewMeta[activeView];

  return (
    <header className="sticky top-0 z-20 border-b border-cyan-400/15 bg-[#09182a]/92 px-4 py-4 shadow-lg shadow-slate-950/10 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-start gap-3">
          <button
            className="mt-1 rounded-md border border-cyan-300/20 bg-white/5 p-2 text-cyan-100 lg:hidden"
            onClick={onOpenSidebar}
            type="button"
          >
            <Menu size={18} />
          </button>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
              Trung tâm điều hành doanh nghiệp
            </p>
            <h2 className="mt-1 text-2xl font-bold text-white">{current.title}</h2>
            <p className="mt-1 max-w-2xl text-sm text-slate-300">{current.subtitle}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <label className="flex min-w-[240px] items-center gap-3 rounded-md border border-cyan-300/15 bg-[#0d2037] px-4 py-3 text-slate-300">
            <Search size={18} />
            <input
              className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
              defaultValue=""
              placeholder="Tìm hội thoại, ticket, người phụ trách..."
            />
          </label>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-md border border-emerald-400/25 bg-emerald-400/10 px-3 py-2 text-sm font-semibold text-emerald-200 sm:flex">
              <Sparkles size={16} />
              AI định tuyến đang hoạt động
            </div>
            <button className="rounded-md border border-cyan-300/15 bg-[#0d2037] p-3 text-slate-300" type="button">
              <Bell size={18} />
            </button>
            <div className="flex items-center gap-3 rounded-md border border-cyan-300/15 bg-[#0d2037] px-3 py-2">
              <div className="h-10 w-10 rounded-md bg-gradient-to-br from-cyan-400 via-teal-400 to-emerald-400" />
              <div>
                <p className="text-sm font-medium text-white">Mai Vận hành</p>
                <p className="text-xs text-slate-400">Quản trị hệ thống</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
