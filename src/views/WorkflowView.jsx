import { useMemo, useState } from "react";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ClipboardCheck,
  Database,
  MessageSquareText,
  Play,
  RotateCcw,
  ShieldAlert,
  Tags,
  TicketPlus,
  UserRoundCheck,
} from "lucide-react";
import { workflowScenarios, workflowStages } from "../data";

const iconMap = {
  intake: MessageSquareText,
  classify: BrainCircuit,
  sop: ClipboardCheck,
  route: Tags,
  odoo: Database,
  ticket: TicketPlus,
  audit: ShieldAlert,
};

function buildStageResult(stageKey, scenario) {
  const results = {
    intake: {
      label: "Conversation normalized",
      lines: [
        `Channel: ${scenario.channel}`,
        `Customer: ${scenario.customer}`,
        `Context: ${scenario.context}`,
      ],
    },
    classify: {
      label: scenario.confidence >= 90 ? "Auto-classification allowed" : "Needs staff confirmation",
      lines: [
        `Intent: ${scenario.intent}`,
        `Confidence: ${scenario.confidence}%`,
        `Sentiment: ${scenario.sentiment}`,
        `Priority: ${scenario.priority}`,
      ],
    },
    sop: {
      label: scenario.confidence >= 90 ? "AI Auto-replied (SOP)" : "Smart Reply suggested",
      lines: [
        `SOP: ${scenario.sop}`,
        `FAQ: ${scenario.faq}`,
        `Draft: ${scenario.smartReply}`,
      ],
    },
    route: {
      label: "Owner mapped",
      lines: [
        `Owner: ${scenario.owner} - ${scenario.ownerRole}`,
        `Rule: ${scenario.routeRule}`,
        `Tags: ${scenario.tags.join(", ")}`,
        `Escalation: ${scenario.escalation}`,
      ],
    },
    odoo: {
      label: "System query completed",
      lines: [
        `Query: ${scenario.odooQuery}`,
        `Result: ${scenario.odooResult}`,
        "Access: role-based permission checked",
      ],
    },
    ticket: {
      label: "Ticket created / updated",
      lines: [
        `Ticket ID: ${scenario.ticketId}`,
        "Status: Open",
        scenario.priority === "Cao" ? "SLA risk: At risk" : "SLA risk: On track",
      ],
    },
    audit: {
      label: "Decision log saved",
      lines: [
        `AI action: classify -> reply -> route -> ticket`,
        `Reason: ${scenario.intent} + ${scenario.tags[0]} -> ${scenario.owner}`,
        `Audit: ${scenario.routeRule}, ${scenario.sop}, ${scenario.faq}, confidence ${scenario.confidence}%`,
      ],
    },
  };

  return results[stageKey];
}

export default function WorkflowView() {
  const [scenarioId, setScenarioId] = useState(workflowScenarios[0].id);
  const [completedStages, setCompletedStages] = useState(["intake"]);

  const scenario = workflowScenarios.find((item) => item.id === scenarioId) ?? workflowScenarios[0];
  const currentStage = workflowStages[Math.min(completedStages.length - 1, workflowStages.length - 1)];

  const auditLines = useMemo(
    () => completedStages.map((stageKey) => buildStageResult(stageKey, scenario)),
    [completedStages, scenario],
  );

  const runNextStage = () => {
    const nextStage = workflowStages.find((stage) => !completedStages.includes(stage.key));
    if (!nextStage) return;
    setCompletedStages((current) => [...current, nextStage.key]);
  };

  const runAllStages = () => {
    setCompletedStages(workflowStages.map((stage) => stage.key));
  };

  const resetFlow = (nextScenarioId = scenarioId) => {
    setScenarioId(nextScenarioId);
    setCompletedStages(["intake"]);
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-md border border-cyan-300/10 bg-[#0f1b2d]/95 p-6">
          <p className="text-sm font-semibold uppercase text-cyan-300/80">Workflow nghiệp vụ</p>
          <h3 className="mt-2 text-2xl font-bold text-white">AI Agent CSKH/PM xử lý hội thoại</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Demo này mô phỏng flow trong plan: tiếp nhận đa kênh, phân loại, SOP/FAQ, routing,
            handoff/escalation, truy vấn Odoo/API, ticket flow và audit log.
          </p>

          <div className="mt-6 space-y-3">
            {workflowScenarios.map((item) => (
              <button
                key={item.id}
                className={`w-full rounded-md border px-4 py-4 text-left transition ${
                  item.id === scenario.id
                    ? "border-cyan-300/35 bg-cyan-400/12"
                    : "border-white/10 bg-white/5 hover:border-cyan-300/25 hover:bg-white/8"
                }`}
                onClick={() => resetFlow(item.id)}
                type="button"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{item.customer}</p>
                    <p className="mt-1 text-sm text-slate-400">{item.channel} - {item.intent}</p>
                  </div>
                  <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                    {item.confidence}%
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.message}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-cyan-300/10 bg-[#0f1b2d]/95 p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-cyan-300/80">AI Router state</p>
              <h3 className="mt-2 text-2xl font-bold text-white">{currentStage.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{currentStage.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                className="inline-flex items-center gap-2 rounded-md border border-cyan-300/25 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-100"
                onClick={runNextStage}
                type="button"
              >
                <Play size={16} />
                Chạy bước tiếp
              </button>
              <button
                className="inline-flex items-center gap-2 rounded-md bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950"
                onClick={runAllStages}
                type="button"
              >
                <CheckCircle2 size={16} />
                Chạy toàn bộ
              </button>
              <button
                className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200"
                onClick={() => resetFlow()}
                type="button"
              >
                <RotateCcw size={16} />
                Reset
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 2xl:grid-cols-4">
            <div className="rounded-md border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-400">Intent</p>
              <p className="mt-2 font-bold text-white">{scenario.intent}</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-400">Owner mapping</p>
              <p className="mt-2 font-bold text-white">{scenario.owner}</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-400">SOP/FAQ</p>
              <p className="mt-2 font-bold text-white">{scenario.sop}</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-400">Ticket</p>
              <p className="mt-2 font-bold text-white">{scenario.ticketId}</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {workflowStages.map((stage, index) => {
              const Icon = iconMap[stage.key];
              const done = completedStages.includes(stage.key);
              const active = currentStage.key === stage.key;

              return (
                <div
                  key={stage.key}
                  className={`rounded-md border p-4 transition ${
                    done
                      ? "border-emerald-300/20 bg-emerald-400/10"
                      : active
                        ? "border-cyan-300/25 bg-cyan-400/10"
                        : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${
                      done ? "bg-emerald-400/15 text-emerald-200" : "bg-white/5 text-slate-400"
                    }`}>
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-white">{stage.title}</p>
                        {done ? (
                          <span className="rounded-full bg-emerald-400/15 px-2 py-1 text-xs font-semibold text-emerald-200">
                            Done
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 text-sm leading-6 text-slate-400">{stage.description}</p>
                    </div>
                    {index < workflowStages.length - 1 ? <ArrowRight size={17} className="mt-3 text-slate-500" /> : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="rounded-md border border-cyan-300/10 bg-[#0f1b2d]/95 p-6">
          <p className="text-sm font-semibold uppercase text-cyan-300/80">Kết quả xử lý</p>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {auditLines.map((result) => (
              <div key={result.label} className="rounded-md border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-white">{result.label}</p>
                <div className="mt-3 space-y-2">
                  {result.lines.map((line) => (
                    <p key={line} className="text-sm leading-6 text-slate-300">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-md border border-amber-300/15 bg-amber-400/10 p-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-200">
            <UserRoundCheck size={17} />
            Điều kiện tự động hóa
          </div>
          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
            <p>Auto-reply khi confidence &gt;= 90%, có SOP/FAQ và không có risk cấm tự động.</p>
            <p>Handoff khi confidence thấp, khách bức xúc, refund/legal hoặc AI không tìm được SOP phù hợp.</p>
            <p>Escalation khi SLA sắp trễ, khách VIP khiếu nại, ticket reopen hoặc vượt quyền xử lý.</p>
          </div>
          <div className="mt-5 rounded-md border border-white/10 bg-[#09182a] p-4">
            <p className="text-sm font-semibold text-white">Audit bắt buộc lưu</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Action, input summary, intent, confidence, rule, SOP/FAQ, owner, risk flags và người
              can thiệp sau đó nếu có.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}
