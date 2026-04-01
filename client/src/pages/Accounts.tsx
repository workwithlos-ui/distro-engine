/*
 * Design: "Obsidian Ops" — Dark Luxury SaaS
 * Page: Sub-Account Management
 */
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  ExternalLink,
  Pause,
  Play,
  Trash2,
} from "lucide-react";
import {
  subAccounts,
  formatNumber,
  getStatusDotColor,
  platformColors,
  platformNames,
  type SubAccount,
} from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const groups = Array.from(new Set(subAccounts.map((a) => a.group)));

export default function Accounts() {
  const [search, setSearch] = useState("");
  const [filterGroup, setFilterGroup] = useState<string | null>(null);
  const [filterPlatform, setFilterPlatform] = useState<string | null>(null);

  const filtered = subAccounts.filter((a) => {
    if (search && !a.name.toLowerCase().includes(search.toLowerCase()) && !a.handle.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterGroup && a.group !== filterGroup) return false;
    if (filterPlatform && a.platform !== filterPlatform) return false;
    return true;
  });

  const platforms = Array.from(new Set(subAccounts.map((a) => a.platform)));

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Sub-Accounts</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {subAccounts.length} accounts across {platforms.length} platforms
            </p>
          </div>
          <Button
            size="sm"
            className="bg-violet hover:bg-violet-light text-white border-0 gap-2"
            onClick={() => toast("Connect Account wizard coming soon")}
          >
            <Plus className="w-3.5 h-3.5" /> Add Account
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search accounts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-lg bg-background/50 border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-violet/50 focus:border-violet/50"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterGroup(null)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border",
                !filterGroup ? "bg-violet/15 text-violet border-violet/20" : "text-muted-foreground border-border/50 hover:text-foreground"
              )}
            >
              All Groups
            </button>
            {groups.map((g) => (
              <button
                key={g}
                onClick={() => setFilterGroup(filterGroup === g ? null : g)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border",
                  filterGroup === g ? "bg-violet/15 text-violet border-violet/20" : "text-muted-foreground border-border/50 hover:text-foreground"
                )}
              >
                {g}
              </button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {platforms.map((p) => (
              <button
                key={p}
                onClick={() => setFilterPlatform(filterPlatform === p ? null : p)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border",
                  filterPlatform === p ? "border-border/80 bg-accent/50" : "text-muted-foreground border-border/50 hover:text-foreground"
                )}
                style={filterPlatform === p ? { color: platformColors[p] } : undefined}
              >
                {platformNames[p]}
              </button>
            ))}
          </div>
        </div>

        {/* Account grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((account, i) => (
            <AccountCard key={account.id} account={account} delay={i * 0.04} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground text-sm">
            No accounts match your filters.
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

function AccountCard({ account, delay }: { account: SubAccount; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass-panel glass-panel-hover rounded-xl p-5 transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold"
            style={{
              backgroundColor: platformColors[account.platform] + "15",
              color: platformColors[account.platform],
            }}
          >
            {account.avatar}
          </div>
          <div>
            <p className="text-sm font-semibold">{account.name}</p>
            <p className="text-xs text-muted-foreground">{account.handle}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-popover border-border/50">
            <DropdownMenuItem onClick={() => toast("Opening account profile...")} className="gap-2 text-xs">
              <ExternalLink className="w-3.5 h-3.5" /> View Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast("Account paused")} className="gap-2 text-xs">
              <Pause className="w-3.5 h-3.5" /> Pause Account
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast("Account removed")} className="gap-2 text-xs text-destructive">
              <Trash2 className="w-3.5 h-3.5" /> Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span
          className="text-xs px-2 py-0.5 rounded font-medium"
          style={{
            backgroundColor: platformColors[account.platform] + "15",
            color: platformColors[account.platform],
          }}
        >
          {platformNames[account.platform]}
        </span>
        <span className="text-xs px-2 py-0.5 rounded bg-accent/50 text-muted-foreground">
          {account.group}
        </span>
        <div className="flex items-center gap-1 ml-auto">
          <span className={cn("w-1.5 h-1.5 rounded-full", getStatusDotColor(account.status))} />
          <span className="text-xs text-muted-foreground capitalize">{account.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border/30">
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">Followers</p>
          <p className="text-sm font-mono font-semibold">{formatNumber(account.followers)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">Views</p>
          <p className="text-sm font-mono font-semibold">{formatNumber(account.totalViews)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">Engage</p>
          <p className="text-sm font-mono font-semibold">{account.engagement}%</p>
        </div>
      </div>
    </motion.div>
  );
}
