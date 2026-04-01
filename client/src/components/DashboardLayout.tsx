/*
 * Design: "Obsidian Ops" — Dark Luxury SaaS
 * Layout: Collapsible sidebar rail with frosted glass panels
 * Colors: True dark #09090B, violet accent #8B5CF6
 */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Calendar,
  BarChart3,
  Palette,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Zap,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/accounts", label: "Sub-Accounts", icon: Users },
  { path: "/scheduler", label: "Scheduler", icon: Calendar },
  { path: "/analytics", label: "Analytics", icon: BarChart3 },
  { path: "/brand-kit", label: "Brand Kit", icon: Palette },
  { path: "/playbook", label: "Playbook", icon: BookOpen },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:relative z-50 h-full flex flex-col border-r border-border/50 bg-sidebar transition-all duration-200 ease-out",
          collapsed ? "lg:w-[68px]" : "lg:w-[240px]",
          mobileOpen ? "w-[240px] translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-border/50 shrink-0">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet text-white shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          {!collapsed && (
            <span className="text-sm font-bold tracking-tight text-foreground whitespace-nowrap">
              DistroEngine
            </span>
          )}
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto lg:hidden text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-violet/15 text-violet-light border border-violet/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50 border border-transparent"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  <item.icon className={cn("w-4 h-4 shrink-0", isActive && "text-violet")} />
                  {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle (desktop only) */}
        <div className="hidden lg:flex items-center justify-center py-3 border-t border-border/50">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center h-16 px-4 lg:px-6 border-b border-border/50 shrink-0 gap-4">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-1.5 rounded-md text-muted-foreground hover:text-foreground"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs text-muted-foreground font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
              All systems operational
            </div>
            <div className="w-8 h-8 rounded-full bg-violet/20 border border-violet/30 flex items-center justify-center text-xs font-bold text-violet">
              DE
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
