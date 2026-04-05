/*
 * Design: "Obsidian Ops" - Dark Luxury SaaS
 * Page: Landing / Marketing page
 * Hero with gradient mesh bg, feature sections, CTA
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Zap,
  Users,
  Calendar,
  BarChart3,
  ArrowRight,
  Play,
  Shield,
  Layers,
  TrendingUp,
  Globe,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/91190584/oV79VmuaCjNCvweg6sVhPn/hero-bg-FAHvdkDyhgiY5ALZjPPoSD.webp";
const NETWORK_VIZ = "https://d2xsxph8kpxj0f.cloudfront.net/91190584/oV79VmuaCjNCvweg6sVhPn/network-viz-MESyoFe9Tge7bEDE8qgbhn.webp";
const ANALYTICS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/91190584/oV79VmuaCjNCvweg6sVhPn/analytics-abstract-R4tZHFXVLUgWW683nrFgcZ.webp";
const CALENDAR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/91190584/oV79VmuaCjNCvweg6sVhPn/content-calendar-8RWViono26Ah923hpd5bqW.webp";

const features = [
  {
    icon: Users,
    title: "Sub-Account Network",
    description: "Manage dozens of branded sub-accounts from a single command center. Consistent branding, not random clipping.",
  },
  {
    icon: Calendar,
    title: "Mass Scheduling Engine",
    description: "Distribute one piece of content across 50+ accounts simultaneously. Staggered posting to avoid spam filters.",
  },
  {
    icon: BarChart3,
    title: "Aggregated Analytics",
    description: "Unified metrics across your entire network. Total reach, top performers, and retargeting-ready audience data.",
  },
  {
    icon: Shield,
    title: "Brand Kit Enforcement",
    description: "Centralized asset library with auto-applied watermarks, intros, and brand colors across all sub-accounts.",
  },
  {
    icon: Layers,
    title: "SOP Playbook",
    description: "Document every process. Build your internal team using the exact SOPs your premium agency uses.",
  },
  {
    icon: Globe,
    title: "Multi-Platform",
    description: "YouTube, TikTok, Instagram, Facebook, X - all managed from one interface with platform-specific optimization.",
  },
];

const stats = [
  { value: "35,000+", label: "Posts/Year Capacity" },
  { value: "12", label: "Sub-Accounts Managed" },
  { value: "6.4%", label: "Avg Engagement Rate" },
  { value: "561K", label: "Network Followers" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/30 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet text-white">
              <Zap className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold tracking-tight">DistroEngine</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
            <a href="#metrics" className="hover:text-foreground transition-colors">Metrics</a>
          </div>
          <Link href="/dashboard">
            <Button size="sm" className="bg-violet hover:bg-violet-light text-white border-0 gap-2">
              Launch App <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url(${HERO_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs font-medium text-violet-light mb-6">
              <Play className="w-3 h-3" />
              Volume Negates Luck
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] mb-6">
              Mass Content
              <br />
              Distribution at
              <br />
              <span className="text-gradient">Infinite Scale</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
              Manage a network of branded sub-accounts. Schedule thousands of posts.
              Aggregate analytics across your entire distribution empire.
              The math always wins.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="bg-violet hover:bg-violet-light text-white border-0 gap-2 h-12 px-6">
                  Open Dashboard <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/playbook">
                <Button size="lg" variant="outline" className="gap-2 h-12 px-6 border-border/50 hover:bg-accent/50">
                  View Playbook
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section id="metrics" className="relative border-y border-border/30 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl lg:text-4xl font-black tracking-tighter text-foreground font-mono">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section id="features" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-black tracking-tighter mb-4">
              Every tool you need to
              <br />
              <span className="text-violet">dominate distribution</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Built for creators and agencies who understand that free distribution
              is the highest-leverage play in marketing. Stop relying on luck.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-panel glass-panel-hover rounded-xl p-6 transition-all duration-200"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-violet/10 text-violet mb-4">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold tracking-tight mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works - visual sections */}
      <section id="how-it-works" className="py-20 lg:py-32 border-t border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mb-20"
          >
            <h2 className="text-3xl lg:text-4xl font-black tracking-tighter mb-4">
              How the system works
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A five-phase progression from agency-dependent to fully autonomous
              content distribution machine.
            </p>
          </motion.div>

          {/* Step 1 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-xs font-mono text-violet mb-3 uppercase tracking-wider">Step 01</div>
              <h3 className="text-2xl font-bold tracking-tight mb-4">Build Your Sub-Account Network</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Create a constellation of branded accounts across every major platform.
                Each account maintains your brand identity - consistent logos, bios, and visual language.
                This isn't random clipping. It's controlled distribution.
              </p>
              <ul className="space-y-3">
                {["Managed sub-accounts with consistent branding", "Multi-platform coverage (YT, TT, IG, FB, X)", "Hierarchical account groups for organization"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-emerald mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden border border-border/30 glow-violet"
            >
              <img src={NETWORK_VIZ} alt="Distribution network visualization" className="w-full" />
            </motion.div>
          </div>

          {/* Step 2 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 rounded-xl overflow-hidden border border-border/30"
            >
              <img src={CALENDAR_IMG} alt="Content scheduling calendar" className="w-full" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="text-xs font-mono text-violet mb-3 uppercase tracking-wider">Step 02</div>
              <h3 className="text-2xl font-bold tracking-tight mb-4">Schedule at Massive Scale</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                One piece of content, distributed across your entire network.
                Staggered posting times, platform-specific optimization, and
                rate-limit management - all automated.
              </p>
              <ul className="space-y-3">
                {["Bulk scheduling across 50+ accounts", "Staggered posting to avoid spam filters", "Short-form top-of-funnel + long-form conversion"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-emerald mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Step 3 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-xs font-mono text-violet mb-3 uppercase tracking-wider">Step 03</div>
              <h3 className="text-2xl font-bold tracking-tight mb-4">Aggregate & Optimize</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Pull performance data from every sub-account into a single dashboard.
                Identify what's working, double down on winners, and feed insights
                back into your content machine.
              </p>
              <ul className="space-y-3">
                {["Unified metrics across all platforms", "Top-performing content identification", "Retargeting audience data for paid campaigns"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-emerald mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden border border-border/30"
            >
              <img src={ANALYTICS_IMG} alt="Analytics dashboard" className="w-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32 border-t border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-black tracking-tighter mb-4">
              Stop relying on luck.
              <br />
              <span className="text-violet">Start distributing.</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              The math is simple: more distribution = more reach = more revenue.
              DistroEngine gives you the infrastructure to make it happen.
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="bg-violet hover:bg-violet-light text-white border-0 gap-2 h-12 px-8">
                Launch Dashboard <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Zap className="w-3.5 h-3.5 text-violet" />
            <span>DistroEngine</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Built on the "Volume Negates Luck" framework. Distribution is leverage.
          </p>
        </div>
      </footer>
    </div>
  );
}
