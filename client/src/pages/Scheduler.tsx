/*
 * Design: "Obsidian Ops" — Dark Luxury SaaS
 * Page: Content Scheduler — bulk scheduling and calendar view
 */
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Calendar,
  List,
  Clock,
  CheckCircle2,
  XCircle,
  FileEdit,
  Send,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { scheduledPosts, subAccounts, getStatusDotColor, formatNumber, platformColors } from "@/lib/data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const statusFilters = ["all", "scheduled", "published", "draft", "failed"] as const;

const statusIcons: Record<string, typeof Clock> = {
  scheduled: Clock,
  published: CheckCircle2,
  failed: XCircle,
  draft: FileEdit,
};

export default function Scheduler() {
  const [view, setView] = useState<"list" | "calendar">("list");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = scheduledPosts.filter((p) => {
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    return true;
  });

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const calendarDays = Array.from({ length: 35 }, (_, i) => {
    const date = new Date(2026, 2, 30 + i - 5); // Start from March 25
    return date;
  });

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Content Scheduler</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {scheduledPosts.filter((p) => p.status === "scheduled").length} posts queued · {scheduledPosts.filter((p) => p.status === "published").length} published this week
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-lg border border-border/50 overflow-hidden">
              <button
                onClick={() => setView("list")}
                className={cn(
                  "p-2 transition-colors",
                  view === "list" ? "bg-violet/15 text-violet" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView("calendar")}
                className={cn(
                  "p-2 transition-colors",
                  view === "calendar" ? "bg-violet/15 text-violet" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Calendar className="w-4 h-4" />
              </button>
            </div>
            <Button
              size="sm"
              className="bg-violet hover:bg-violet-light text-white border-0 gap-2"
              onClick={() => toast("Bulk Create wizard coming soon")}
            >
              <Plus className="w-3.5 h-3.5" /> New Post
            </Button>
          </div>
        </div>

        {/* Status filters */}
        <div className="flex gap-2 flex-wrap">
          {statusFilters.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border capitalize",
                statusFilter === s
                  ? "bg-violet/15 text-violet border-violet/20"
                  : "text-muted-foreground border-border/50 hover:text-foreground"
              )}
            >
              {s} {s !== "all" && `(${scheduledPosts.filter((p) => p.status === s).length})`}
            </button>
          ))}
        </div>

        {view === "list" ? (
          /* List view */
          <div className="space-y-2">
            {/* Table header */}
            <div className="hidden lg:grid grid-cols-12 gap-4 px-4 py-2 text-xs text-muted-foreground font-medium uppercase tracking-wider">
              <div className="col-span-5">Content</div>
              <div className="col-span-2">Platform</div>
              <div className="col-span-2">Schedule</div>
              <div className="col-span-1">Accounts</div>
              <div className="col-span-1">Views</div>
              <div className="col-span-1">Status</div>
            </div>

            {filtered.map((post, i) => {
              const StatusIcon = statusIcons[post.status] || Clock;
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="glass-panel glass-panel-hover rounded-xl p-4 transition-all duration-200"
                >
                  <div className="grid lg:grid-cols-12 gap-3 lg:gap-4 items-center">
                    <div className="lg:col-span-5 flex items-center gap-3">
                      <div className={cn("p-1.5 rounded-md shrink-0", 
                        post.status === "published" && "bg-emerald/10 text-emerald",
                        post.status === "scheduled" && "bg-amber/10 text-amber",
                        post.status === "draft" && "bg-muted/30 text-muted-foreground",
                        post.status === "failed" && "bg-destructive/10 text-destructive",
                      )}>
                        <StatusIcon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{post.title}</p>
                        <span className="text-xs px-1.5 py-0.5 rounded bg-violet/10 text-violet font-medium">
                          {post.type === "short" ? "Short-Form" : "Long-Form"}
                        </span>
                      </div>
                    </div>
                    <div className="lg:col-span-2">
                      <span className="text-xs text-muted-foreground">{post.platform}</span>
                    </div>
                    <div className="lg:col-span-2">
                      <span className="text-xs font-mono text-muted-foreground">
                        {new Date(post.scheduledAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        {" "}
                        {new Date(post.scheduledAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                      </span>
                    </div>
                    <div className="lg:col-span-1">
                      <div className="flex -space-x-1">
                        {post.accounts.slice(0, 3).map((accId) => {
                          const acc = subAccounts.find((a) => a.id === accId);
                          return acc ? (
                            <div
                              key={accId}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold border-2 border-background"
                              style={{
                                backgroundColor: platformColors[acc.platform] + "25",
                                color: platformColors[acc.platform],
                              }}
                            >
                              {acc.avatar[0]}
                            </div>
                          ) : null;
                        })}
                        {post.accounts.length > 3 && (
                          <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold border-2 border-background bg-accent text-muted-foreground">
                            +{post.accounts.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="lg:col-span-1">
                      <span className="text-sm font-mono">
                        {post.views !== undefined ? formatNumber(post.views) : "—"}
                      </span>
                    </div>
                    <div className="lg:col-span-1">
                      <div className="flex items-center gap-1.5">
                        <span className={cn("w-1.5 h-1.5 rounded-full", getStatusDotColor(post.status))} />
                        <span className="text-xs capitalize text-muted-foreground">{post.status}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Calendar view */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-panel rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold">March — April 2026</h3>
              <div className="flex items-center gap-2">
                <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {days.map((d) => (
                <div key={d} className="text-center text-xs text-muted-foreground font-medium py-2">
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((date, i) => {
                const dateStr = date.toISOString().split("T")[0];
                const postsOnDay = scheduledPosts.filter((p) => p.scheduledAt.startsWith(dateStr));
                const isToday = dateStr === "2026-03-31";
                const isCurrentMonth = date.getMonth() === 2 || date.getMonth() === 3;

                return (
                  <div
                    key={i}
                    className={cn(
                      "min-h-[80px] p-2 rounded-lg border transition-colors",
                      isToday ? "border-violet/30 bg-violet/5" : "border-border/20 hover:border-border/40",
                      !isCurrentMonth && "opacity-30"
                    )}
                  >
                    <p className={cn(
                      "text-xs font-mono mb-1",
                      isToday ? "text-violet font-bold" : "text-muted-foreground"
                    )}>
                      {date.getDate()}
                    </p>
                    {postsOnDay.slice(0, 2).map((post) => (
                      <div
                        key={post.id}
                        className={cn(
                          "text-[10px] px-1.5 py-0.5 rounded mb-0.5 truncate font-medium",
                          post.status === "published" && "bg-emerald/10 text-emerald",
                          post.status === "scheduled" && "bg-amber/10 text-amber",
                          post.status === "draft" && "bg-muted/30 text-muted-foreground",
                          post.status === "failed" && "bg-destructive/10 text-destructive",
                        )}
                      >
                        {post.title}
                      </div>
                    ))}
                    {postsOnDay.length > 2 && (
                      <p className="text-[10px] text-muted-foreground">+{postsOnDay.length - 2} more</p>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
