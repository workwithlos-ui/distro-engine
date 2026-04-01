/*
 * Design: "Obsidian Ops" — Dark Luxury SaaS
 * Page: Aggregated Analytics Dashboard
 */
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { motion } from "framer-motion";
import {
  Eye,
  Users,
  TrendingUp,
  Send,
  Target,
  Repeat,
} from "lucide-react";
import {
  subAccounts,
  analyticsData,
  formatNumber,
  platformColors,
  platformNames,
} from "@/lib/data";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const totalFollowers = subAccounts.reduce((sum, a) => sum + a.followers, 0);
const totalViews = subAccounts.reduce((sum, a) => sum + a.totalViews, 0);
const totalPostsWeek = subAccounts.reduce((sum, a) => sum + a.postsThisWeek, 0);

// Platform distribution
const platformData = Object.entries(
  subAccounts.reduce<Record<string, { followers: number; views: number; count: number }>>((acc, a) => {
    if (!acc[a.platform]) acc[a.platform] = { followers: 0, views: 0, count: 0 };
    acc[a.platform].followers += a.followers;
    acc[a.platform].views += a.totalViews;
    acc[a.platform].count += 1;
    return acc;
  }, {})
).map(([platform, data]) => ({
  name: platformNames[platform],
  platform,
  ...data,
  color: platformColors[platform],
}));

// Engagement by account
const engagementData = subAccounts
  .filter((a) => a.engagement > 0)
  .sort((a, b) => b.engagement - a.engagement)
  .map((a) => ({
    name: a.name,
    engagement: a.engagement,
    platform: a.platform,
    color: platformColors[a.platform],
  }));

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold tracking-tight">Network Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Aggregated performance across all {subAccounts.length} sub-accounts
          </p>
        </div>

        {/* Top stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Reach"
            value={formatNumber(totalFollowers)}
            change="+15.6% this month"
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
            title="Weekly Output"
            value={totalPostsWeek.toString()}
            change={`${Math.round(totalPostsWeek * 52).toLocaleString()}/yr projected`}
            changeType="positive"
            icon={Send}
            delay={0.1}
          />
          <StatCard
            title="Retarget Pool"
            value={formatNumber(Math.round(totalViews * 0.12))}
            change="12% of total viewers"
            changeType="neutral"
            icon={Target}
            iconColor="text-cyan"
            delay={0.15}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          {/* Follower growth chart */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel rounded-xl p-5"
          >
            <h3 className="text-sm font-semibold mb-1">Follower Growth</h3>
            <p className="text-xs text-muted-foreground mb-6">Network-wide follower trajectory</p>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analyticsData}>
                  <defs>
                    <linearGradient id="followerGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22C55E" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#22C55E" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.4)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "rgba(255,255,255,0.4)" }} axisLine={false} tickLine={false} tickFormatter={(v) => formatNumber(v)} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "rgba(23,23,28,0.95)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", fontSize: "12px", color: "#fff" }}
                    formatter={(value: number) => [formatNumber(value), "Followers"]}
                  />
                  <Area type="monotone" dataKey="followers" stroke="#22C55E" strokeWidth={2} fill="url(#followerGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Engagement rate chart */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="glass-panel rounded-xl p-5"
          >
            <h3 className="text-sm font-semibold mb-1">Engagement by Account</h3>
            <p className="text-xs text-muted-foreground mb-6">Top performers by engagement rate</p>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.4)" }} axisLine={false} tickLine={false} tickFormatter={(v) => v + "%"} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.4)" }} axisLine={false} tickLine={false} width={100} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "rgba(23,23,28,0.95)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", fontSize: "12px", color: "#fff" }}
                    formatter={(value: number) => [value + "%", "Engagement"]}
                  />
                  <Bar dataKey="engagement" radius={[0, 4, 4, 0]}>
                    {engagementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.7} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {/* Platform distribution */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel rounded-xl p-5"
          >
            <h3 className="text-sm font-semibold mb-1">Platform Distribution</h3>
            <p className="text-xs text-muted-foreground mb-4">Followers by platform</p>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="followers"
                  >
                    {platformData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "rgba(23,23,28,0.95)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", fontSize: "12px", color: "#fff" }}
                    formatter={(value: number) => [formatNumber(value), "Followers"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-2">
              {platformData.map((p) => (
                <div key={p.platform} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                    <span className="text-muted-foreground">{p.name}</span>
                  </div>
                  <span className="font-mono">{formatNumber(p.followers)}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Posts volume chart */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="lg:col-span-2 glass-panel rounded-xl p-5"
          >
            <h3 className="text-sm font-semibold mb-1">Content Volume</h3>
            <p className="text-xs text-muted-foreground mb-6">Posts published per period</p>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.4)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "rgba(255,255,255,0.4)" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "rgba(23,23,28,0.95)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", fontSize: "12px", color: "#fff" }}
                  />
                  <Bar dataKey="posts" fill="#8B5CF6" fillOpacity={0.7} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Volume projection */}
            <div className="mt-4 p-4 rounded-lg bg-violet/5 border border-violet/10">
              <div className="flex items-center gap-2 mb-2">
                <Repeat className="w-4 h-4 text-violet" />
                <span className="text-xs font-semibold text-violet">Volume Projection</span>
              </div>
              <p className="text-xs text-muted-foreground">
                At current pace of <span className="text-foreground font-mono">{totalPostsWeek}</span> posts/week,
                you'll hit <span className="text-foreground font-mono">{(totalPostsWeek * 52).toLocaleString()}</span> posts this year.
                {totalPostsWeek * 52 >= 35000 ? (
                  <span className="text-emerald"> On track for the 35K target.</span>
                ) : (
                  <span className="text-amber"> Need {Math.ceil((35000 - totalPostsWeek * 52) / 52)} more posts/week to hit 35K.</span>
                )}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
