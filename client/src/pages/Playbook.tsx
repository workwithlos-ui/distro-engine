/*
 * Design: "Obsidian Ops" - Dark Luxury SaaS
 * Page: SOP Playbook - The Agency Playbook progression
 */
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  CheckCircle2,
  Circle,
  Loader2,
  ChevronDown,
  ChevronRight,
  User,
  ArrowRight,
} from "lucide-react";
import { playbookPhases, getStatusDotColor } from "@/lib/data";
import { cn } from "@/lib/utils";

const phaseStatusColors: Record<string, string> = {
  complete: "border-emerald/30 bg-emerald/5",
  active: "border-violet/30 bg-violet/5",
  upcoming: "border-border/30 bg-background/30",
};

const stepStatusIcons: Record<string, typeof CheckCircle2> = {
  complete: CheckCircle2,
  "in-progress": Loader2,
  pending: Circle,
};

export default function Playbook() {
  const [expandedPhase, setExpandedPhase] = useState<string | null>("ph3");

  const completedPhases = playbookPhases.filter((p) => p.status === "complete").length;
  const totalSteps = playbookPhases.reduce((sum, p) => sum + p.steps.length, 0);
  const completedSteps = playbookPhases.reduce(
    (sum, p) => sum + p.steps.filter((s) => s.status === "complete").length,
    0
  );

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold tracking-tight">The Agency Playbook</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Five-phase progression from agency-dependent to fully autonomous content machine
          </p>
        </div>

        {/* Progress overview */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-xl p-5"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-sm font-semibold">Overall Progress</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {completedPhases} of {playbookPhases.length} phases complete · {completedSteps} of {totalSteps} steps done
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold font-mono text-violet">
                {Math.round((completedSteps / totalSteps) * 100)}%
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 rounded-full bg-background/50 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completedSteps / totalSteps) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-violet to-violet-light"
            />
          </div>

          {/* Phase indicators */}
          <div className="flex items-center justify-between mt-4 gap-1">
            {playbookPhases.map((phase, i) => (
              <div key={phase.id} className="flex items-center flex-1">
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold border-2 shrink-0",
                    phase.status === "complete" && "border-emerald bg-emerald/10 text-emerald",
                    phase.status === "active" && "border-violet bg-violet/10 text-violet",
                    phase.status === "upcoming" && "border-border/50 bg-background/50 text-muted-foreground"
                  )}
                >
                  {phase.status === "complete" ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    phase.phase
                  )}
                </div>
                {i < playbookPhases.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-0.5 mx-1",
                      phase.status === "complete" ? "bg-emerald/30" : "bg-border/30"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Phase cards */}
        <div className="space-y-3">
          {playbookPhases.map((phase, i) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={cn(
                "rounded-xl border overflow-hidden transition-all duration-200",
                phaseStatusColors[phase.status]
              )}
            >
              {/* Phase header */}
              <button
                onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/[0.02] transition-colors"
              >
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-lg text-sm font-bold shrink-0",
                    phase.status === "complete" && "bg-emerald/10 text-emerald",
                    phase.status === "active" && "bg-violet/10 text-violet",
                    phase.status === "upcoming" && "bg-muted/20 text-muted-foreground"
                  )}
                >
                  {phase.status === "complete" ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    `0${phase.phase}`
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-semibold">{phase.title}</h3>
                    <span
                      className={cn(
                        "text-[10px] px-1.5 py-0.5 rounded font-medium capitalize",
                        phase.status === "complete" && "bg-emerald/10 text-emerald",
                        phase.status === "active" && "bg-violet/10 text-violet",
                        phase.status === "upcoming" && "bg-muted/20 text-muted-foreground"
                      )}
                    >
                      {phase.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">{phase.description}</p>
                </div>
                <div className="shrink-0 text-muted-foreground">
                  {expandedPhase === phase.id ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </div>
              </button>

              {/* Expanded steps */}
              <AnimatePresence>
                {expandedPhase === phase.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 space-y-2">
                      <div className="border-t border-border/20 pt-4 mb-3">
                        <p className="text-xs text-muted-foreground">{phase.description}</p>
                      </div>
                      {phase.steps.map((step) => {
                        const StepIcon = stepStatusIcons[step.status] || Circle;
                        return (
                          <div
                            key={step.id}
                            className={cn(
                              "flex items-start gap-3 p-3 rounded-lg border transition-colors",
                              step.status === "complete" && "border-emerald/10 bg-emerald/[0.02]",
                              step.status === "in-progress" && "border-violet/10 bg-violet/[0.02]",
                              step.status === "pending" && "border-border/10 bg-background/20"
                            )}
                          >
                            <StepIcon
                              className={cn(
                                "w-4 h-4 mt-0.5 shrink-0",
                                step.status === "complete" && "text-emerald",
                                step.status === "in-progress" && "text-violet animate-spin",
                                step.status === "pending" && "text-muted-foreground"
                              )}
                            />
                            <div className="flex-1 min-w-0">
                              <p className={cn(
                                "text-sm font-medium",
                                step.status === "complete" && "line-through text-muted-foreground"
                              )}>
                                {step.title}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                            </div>
                            {step.assignee && (
                              <div className="flex items-center gap-1.5 shrink-0">
                                <User className="w-3 h-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">{step.assignee}</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel rounded-xl p-6 text-center"
        >
          <BookOpen className="w-8 h-8 text-violet mx-auto mb-3" />
          <h3 className="text-base font-bold mb-2">The Goal: Full Independence</h3>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Follow this playbook to transition from agency-dependent to a fully autonomous
            content distribution machine. Document everything, build your team, and scale to
            100+ posts per day across your entire sub-account network.
          </p>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
