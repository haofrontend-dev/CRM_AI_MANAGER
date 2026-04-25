import { auditTrail, decisionLogs } from "../data";

const riskStyles = {
  Thấp: "bg-emerald-50 text-emerald-800",
  "Trung bình": "bg-amber-50 text-amber-800",
  Cao: "bg-rose-50 text-rose-800",
};

export default function AuditView() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-[32px] border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-6 py-5">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
            Nhật ký sự kiện
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-950">
            Lịch sử hội thoại và xử lý
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-slate-50 text-sm text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium">Thời gian</th>
                <th className="px-6 py-4 font-medium">Sự kiện</th>
                <th className="px-6 py-4 font-medium">Tác nhân</th>
                <th className="px-6 py-4 font-medium">Chi tiết</th>
                <th className="px-6 py-4 font-medium">Rủi ro</th>
              </tr>
            </thead>
            <tbody>
              {auditTrail.map((row) => (
                <tr key={`${row.time}-${row.event}`} className="border-t border-slate-200 text-sm">
                  <td className="px-6 py-5 font-medium text-slate-900">{row.time}</td>
                  <td className="px-6 py-5 text-slate-700">{row.event}</td>
                  <td className="px-6 py-5 text-slate-600">{row.actor}</td>
                  <td className="px-6 py-5 text-slate-600">{row.detail}</td>
                  <td className="px-6 py-5">
                    <span className={`rounded-full px-3 py-2 text-xs font-semibold ${riskStyles[row.risk]}`}>
                      {row.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-[32px] border border-slate-200 bg-[#f7fbff] p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
          Log quyết định AI
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-slate-950">
          Vì sao AI phản hồi hoặc gán thẻ theo cách này
        </h3>

        <div className="mt-6 space-y-4">
          {decisionLogs.map((item) => (
            <div key={item.title} className="rounded-[28px] bg-white p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-lg font-semibold text-slate-950">{item.title}</p>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {item.score}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.explanation}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[28px] bg-slate-950 p-5 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
            Ghi chú quản trị
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Log cần được tra cứu theo mã hội thoại, phiên bản model, phiên bản SOP và người phụ
            trách cuối cùng để đội compliance có thể tái dựng toàn bộ quyết định đối thoại với khách.
          </p>
        </div>
      </section>
    </div>
  );
}
