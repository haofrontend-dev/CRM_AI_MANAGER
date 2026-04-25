export default function MetricCard({ label, value, delta, note }) {
  return (
    <div className="relative overflow-hidden rounded-md border border-cyan-300/15 bg-[#0f1b2d]/95 p-5 shadow-sm shadow-cyan-950/20">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-300" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-white">{value}</p>
        </div>
        <span className="rounded-full border border-emerald-300/20 bg-emerald-400/12 px-3 py-1 text-xs font-semibold text-emerald-200">
          {delta}
        </span>
      </div>
      <p className="mt-6 text-sm text-slate-400">{note}</p>
    </div>
  );
}
