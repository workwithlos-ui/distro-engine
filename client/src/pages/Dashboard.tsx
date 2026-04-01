/*
 * Design: "Obsidian Ops" — Dark Luxury SaaS
 * Page: Main Dashboard — overview of the distribution network
 */
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { motion } from "framer-motion";
import {
  Eye,
  Users,
  TrendingUp,
  Send,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import {
  subAccounts,
  scheduledPosts,
  analyticsData,
  formatNumber,
  getStatusDotColor,
  platformColors,
} from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const totalFollowers = subAccounts.reduce((sum, a) => sum + a.followers, 0);
const totalViews = subAccounts.reduce((sum, a) => sum + a.totalViews, 0);
const totalPostsThisWeek = subAccounts.reduce((sum, a) => sum + a.postsThisWeek, 0);
const avgEngagement = subAccounts.filter(a => a.engagement > 0).reduce((sum, a) => sum + a.engagement, 0) / subAccounts.filter(a => a.engagement > 0).length;
const activeAccounts = subAccounts.filter((a) => a.status === "active").length;

const upcomingPosts = scheduledPosts
  .filter((p) => p.status === "scheduled")
  .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
  .slice(0, 5);

const recentPublished = scheduledPosts
  .filter((p) => p.status === "published")
  .sort((a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime())
  .slice(0, 4);

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-xl font-bold tracking-tight">Command Center</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Network overview — {activeAccounts} active accounts across {new Set(subAccounts.map(a => a.platform)).size} platforms
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Network Reach"
            value={formatNumber(totalFollowers)}
            change="+12.4% this month"
            changeType="positive"
            icon={Users}
            delay={0}
          />
          <StatCard
            title="Total Views"
            value={formatNumber(totalViews)}
            change="+28.7% this month"
            changeType="positive"
            icon={Eye}
            delay={0.05}
          />
          <StatCard
            title="Posts This Week"
            value={totalPostsThisWeek.toString()}
            change="On track for 35K/yr"
            changeType="positive"
            icon={Send}
            delay={0.1}
          />
          <StatCard
            title="Avg Engagement"
            value={avgEngagement.toFixed(1) + "%"}
            change="+0.8% vs last week"
            changeType="positive"
            icon={TrendingUp}
            iconColor="text-emerald"
            delay={0.15}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {/* Views chart */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 glass-panel rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-semibold">Network Views</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Total views across all sub-accounts</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold font-mono">{formatNumber(analyticsData[analyticsData.length - 1].views)}</p>
                <p className="text-xs text-emerald">+16.3% vs prev period</p>
              </div>
            </div>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analyticsData}>
                  <defs>
                    <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: "rgba(255,255,255,0.4)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "rgba(255,255,255,0.4)" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => formatNumber(v)}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(23,23,28,0.95)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "8px",
                      fontSize: "12px",
                      color: "#fff",
                    }}
                    formatter={(value: number) => [formatNumber(value), "Views"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    fill="url(#viewsGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Top accounts */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="glass-panel rounded-xl p-5"
          >
            <h3 className="text-sm font-semibold mb-4">Top Sub-Accounts</h3>
            <div className="space-y-3">
              {subAccounts
                .sort((a, b) => b.totalViews - a.totalViews)
                .slice(0, 6)
                .map((account) => (
                  <div key={account.id} className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                      style={{
                        backgroundColor: platformColors[account.platform] + "15",
                        color: platformColors[account.platform],
                      }}
                    >
                      {account.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{account.name}</p>
                      <p className="text-xs text-muted-foreground">{account.handle}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-mono font-medium">{formatNumber(account.totalViews)}</p>
                      <div className="flex items-center gap-1 justify-end">
                        <span className={cn("w-1.5 h-1.5 rounded-full", getStatusDotColor(account.status))} />
                        <span className="text-xs text-muted-foreground capitalize">{account.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          {/* Upcoming posts */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">Upcoming Posts</h3>
              <span className="text-xs text-muted-foreground font-mono">{upcomingPosts.length} queued</span>
            </div>
            <div className="space-y-3">
              {upcomingPosts.map((post) => (
                <div key={post.id} className="flex items-start gap-3 p-3 rounded-lg bg-background/30 hover:bg-background/50 transition-colors">
                  <div className="p-1.5 rounded-md bg-amber/10 text-amber mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{post.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground font-mono">
                        {new Date(post.scheduledAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        {" "}
                        {new Date(post.scheduledAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                      </span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">{post.accounts.length} accounts</span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-violet/10 text-violet font-medium">
                        {post.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent published */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="glass-panel rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">Recently Published</h3>
              <span className="text-xs text-emerald font-mono">Live</span>
            </div>
            <div className="space-y-3">
              {recentPublished.map((post) => (
                <div key={post.id} className="flex items-start gap-3 p-3 rounded-lg bg-background/30 hover:bg-background/50 transition-colors">
                  <div className="p-1.5 rounded-md bg-emerald/10 text-emerald mt-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{post.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{post.platform}</span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">{post.accounts.length} accounts</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-mono font-medium">{formatNumber(post.views || 0)}</p>
                    <p className="text-xs text-muted-foreground">views</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
