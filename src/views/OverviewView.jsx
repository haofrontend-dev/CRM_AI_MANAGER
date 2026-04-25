import { MessageSquareText, PieChart, RadioTower } from "lucide-react";
import { messageTrafficByChannel, metricCards, ticketStatusChart } from "../data";
import MetricCard from "../components/MetricCard";

const totalTickets = ticketStatusChart.reduce((sum, item) => sum + item.value, 0);
const donutStops = ticketStatusChart.reduce(
  (acc, item) => {
    const start = acc.offset;
    const end = start + (item.value / totalTickets) * 100;
    acc.parts.push(`${item.color} ${start}% ${end}%`);
    acc.offset = end;
    return acc;
  },
  { offset: 0, parts: [] },
).parts.join(", ");

export default function OverviewView() {
  const maxTraffic = Math.max(...messageTrafficByChannel.map((item) => item.messages));

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
        {metricCards.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
        <div className="rounded-md border border-cyan-300/10 bg-[#0f1b2d]/95 p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300/80">
                Lưu lượng đa kênh
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">
                Tin nhắn theo kênh ưu tiên
              </h3>
            </div>
            <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">
              <RadioTower size={17} className="text-cyan-200" />
              Cập nhật 5 phút trước
            </div>
          </div>

          <div className="mt-8 flex h-[320px] items-end gap-5">
            {messageTrafficByChannel.map((item) => (
              <div key={item.channel} className="flex h-full flex-1 flex-col justify-end gap-3">
                <div className="flex flex-1 items-end rounded-md border border-white/10 bg-white/5 px-4 py-4">
                  <div
                    className={`w-full rounded-md bg-gradient-to-t ${item.color} shadow-lg shadow-cyan-950/40`}
                    style={{ height: `${(item.messages / maxTraffic) * 100}%` }}
                  />
                </div>
                <div className="text-center">
                  <p className="text-xl font-semibold text-white">{item.messages.toLocaleString()}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.channel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-cyan-300/10 bg-[#0f1b2d]/95 p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300/80">
                Trạng thái ticket
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Phân bổ xử lý</h3>
            </div>
            <PieChart size={22} className="text-emerald-300" />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1fr] xl:grid-cols-1 2xl:grid-cols-[0.9fr_1fr]">
            <div className="flex items-center justify-center">
              <div
                className="relative flex h-56 w-56 items-center justify-center rounded-full"
                style={{ background: `conic-gradient(${donutStops})` }}
              >
                <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-[#0b1728] text-center ring-1 ring-white/10">
                  <span className="text-4xl font-semibold text-white">{totalTickets}</span>
                  <span className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                    Ticket
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {ticketStatusChart.map((item) => (
                <div key={item.label} className="rounded-md border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <p className="font-medium text-white">{item.label}</p>
                    </div>
                    <p className="text-lg font-semibold text-white">{item.value}</p>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-white/10">
                    <div
                      className="h-2 rounded-full"
                      style={{ width: `${(item.value / totalTickets) * 100}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-md border border-emerald-300/15 bg-emerald-400/10 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-200">
              <MessageSquareText size={17} />
              AI đang tự động phân loại và tạo ticket từ hội thoại có intent rõ ràng.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
