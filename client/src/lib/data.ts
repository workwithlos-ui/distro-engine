/*
 * Mock data store for DistroEngine
 * Simulates a real backend with realistic content distribution data
 */

export interface SubAccount {
  id: string;
  name: string;
  handle: string;
  platform: "youtube" | "tiktok" | "instagram" | "facebook" | "x";
  avatar: string;
  status: "active" | "paused" | "warning";
  followers: number;
  postsThisWeek: number;
  totalViews: number;
  engagement: number;
  group: string;
}

export interface ScheduledPost {
  id: string;
  title: string;
  type: "short" | "long";
  status: "scheduled" | "published" | "failed" | "draft";
  scheduledAt: string;
  accounts: string[];
  platform: string;
  views?: number;
  thumbnail?: string;
}

export interface AnalyticsData {
  date: string;
  views: number;
  engagement: number;
  followers: number;
  posts: number;
}

export interface SOPStep {
  id: string;
  title: string;
  description: string;
  status: "complete" | "in-progress" | "pending";
  assignee?: string;
}

export interface PlaybookPhase {
  id: string;
  phase: number;
  title: string;
  description: string;
  status: "complete" | "active" | "upcoming";
  steps: SOPStep[];
}

export const subAccounts: SubAccount[] = [
  { id: "1", name: "Main Brand", handle: "@distroengine", platform: "youtube", avatar: "DE", status: "active", followers: 125400, postsThisWeek: 12, totalViews: 4520000, engagement: 4.2, group: "Core" },
  { id: "2", name: "DE Clips", handle: "@declips", platform: "tiktok", avatar: "DC", status: "active", followers: 89200, postsThisWeek: 28, totalViews: 2180000, engagement: 6.8, group: "Short-Form" },
  { id: "3", name: "DE Reels", handle: "@dereels", platform: "instagram", avatar: "DR", status: "active", followers: 67800, postsThisWeek: 21, totalViews: 1450000, engagement: 5.1, group: "Short-Form" },
  { id: "4", name: "DE Shorts", handle: "@deshorts", platform: "youtube", avatar: "DS", status: "active", followers: 45600, postsThisWeek: 24, totalViews: 980000, engagement: 3.9, group: "Short-Form" },
  { id: "5", name: "Growth Tips", handle: "@growthtips", platform: "tiktok", avatar: "GT", status: "active", followers: 34200, postsThisWeek: 18, totalViews: 720000, engagement: 7.2, group: "Niche" },
  { id: "6", name: "Scale Daily", handle: "@scaledaily", platform: "instagram", avatar: "SD", status: "warning", followers: 28900, postsThisWeek: 8, totalViews: 410000, engagement: 3.4, group: "Niche" },
  { id: "7", name: "DE Facebook", handle: "@distroengine", platform: "facebook", avatar: "DF", status: "active", followers: 52100, postsThisWeek: 14, totalViews: 890000, engagement: 2.8, group: "Core" },
  { id: "8", name: "Biz Hacks", handle: "@bizhacks", platform: "x", avatar: "BH", status: "active", followers: 19800, postsThisWeek: 35, totalViews: 340000, engagement: 4.6, group: "Niche" },
  { id: "9", name: "DE Podcast Clips", handle: "@depodclips", platform: "youtube", avatar: "DP", status: "active", followers: 22400, postsThisWeek: 10, totalViews: 560000, engagement: 5.3, group: "Long-Form" },
  { id: "10", name: "Founder Cuts", handle: "@foundercuts", platform: "tiktok", avatar: "FC", status: "paused", followers: 15600, postsThisWeek: 0, totalViews: 280000, engagement: 0, group: "Niche" },
  { id: "11", name: "DE X Threads", handle: "@dethreads", platform: "x", avatar: "DX", status: "active", followers: 11200, postsThisWeek: 42, totalViews: 190000, engagement: 3.1, group: "Core" },
  { id: "12", name: "Hustle Highlights", handle: "@hustlehighlights", platform: "instagram", avatar: "HH", status: "active", followers: 38700, postsThisWeek: 16, totalViews: 620000, engagement: 4.8, group: "Short-Form" },
];

export const scheduledPosts: ScheduledPost[] = [
  { id: "p1", title: "Why Volume Negates Luck - Full Breakdown", type: "long", status: "published", scheduledAt: "2026-03-31T10:00:00Z", accounts: ["1", "9"], platform: "YouTube", views: 12400 },
  { id: "p2", title: "3 Distribution Hacks That 10x Your Reach", type: "short", status: "published", scheduledAt: "2026-03-31T12:00:00Z", accounts: ["2", "3", "4", "12"], platform: "Multi", views: 45200 },
  { id: "p3", title: "Sub-Account Strategy Explained in 60s", type: "short", status: "scheduled", scheduledAt: "2026-04-01T09:00:00Z", accounts: ["2", "3", "5"], platform: "Multi" },
  { id: "p4", title: "How I Post 100x/Day Without Burning Out", type: "short", status: "scheduled", scheduledAt: "2026-04-01T11:00:00Z", accounts: ["2", "4", "8", "11"], platform: "Multi" },
  { id: "p5", title: "The Agency Playbook - Step by Step", type: "long", status: "scheduled", scheduledAt: "2026-04-01T14:00:00Z", accounts: ["1", "7"], platform: "YouTube + FB" },
  { id: "p6", title: "Brand Consistency > Viral Moments", type: "short", status: "draft", scheduledAt: "2026-04-02T10:00:00Z", accounts: ["3", "12"], platform: "Instagram" },
  { id: "p7", title: "Retargeting From Organic - The Secret Weapon", type: "short", status: "scheduled", scheduledAt: "2026-04-01T16:00:00Z", accounts: ["2", "3", "4", "5", "12"], platform: "Multi" },
  { id: "p8", title: "Building an Internal Content Team", type: "long", status: "draft", scheduledAt: "2026-04-03T10:00:00Z", accounts: ["1"], platform: "YouTube" },
  { id: "p9", title: "Short-Form Is Your Top of Funnel", type: "short", status: "failed", scheduledAt: "2026-03-30T15:00:00Z", accounts: ["6"], platform: "Instagram", views: 0 },
  { id: "p10", title: "The Math Behind 35,000 Posts/Year", type: "short", status: "published", scheduledAt: "2026-03-30T08:00:00Z", accounts: ["2", "3", "4", "8", "11"], platform: "Multi", views: 67800 },
];

export const analyticsData: AnalyticsData[] = [
  { date: "Mar 1", views: 42000, engagement: 3.2, followers: 485200, posts: 45 },
  { date: "Mar 4", views: 58000, engagement: 3.8, followers: 489100, posts: 52 },
  { date: "Mar 7", views: 51000, engagement: 3.5, followers: 492800, posts: 48 },
  { date: "Mar 10", views: 73000, engagement: 4.1, followers: 498200, posts: 61 },
  { date: "Mar 13", views: 89000, engagement: 4.6, followers: 505600, posts: 58 },
  { date: "Mar 16", views: 67000, engagement: 3.9, followers: 510200, posts: 55 },
  { date: "Mar 19", views: 95000, engagement: 5.2, followers: 518400, posts: 67 },
  { date: "Mar 22", views: 112000, engagement: 5.8, followers: 528900, posts: 72 },
  { date: "Mar 25", views: 98000, engagement: 4.9, followers: 536200, posts: 64 },
  { date: "Mar 28", views: 134000, engagement: 6.1, followers: 548700, posts: 78 },
  { date: "Mar 31", views: 156000, engagement: 6.4, followers: 561200, posts: 85 },
];

export const playbookPhases: PlaybookPhase[] = [
  {
    id: "ph1",
    phase: 1,
    title: "Foundation - Hire Basic Agency",
    description: "Establish fundamental content operations with a basic content agency. Focus on building consistent output cadence.",
    status: "complete",
    steps: [
      { id: "s1", title: "Define brand voice and content pillars", description: "Document your core messaging, tone, and 3-5 content pillars that all content will revolve around.", status: "complete", assignee: "Brand Team" },
      { id: "s2", title: "Hire entry-level content agency", description: "Find an agency that can handle basic video editing, thumbnail creation, and posting schedules.", status: "complete", assignee: "Operations" },
      { id: "s3", title: "Set up master content calendar", description: "Create a shared calendar with posting cadence for each platform (minimum 3x/day across all accounts).", status: "complete", assignee: "Content Lead" },
      { id: "s4", title: "Establish quality baseline", description: "Define minimum quality standards for thumbnails, captions, hashtags, and posting times.", status: "complete", assignee: "Brand Team" },
    ],
  },
  {
    id: "ph2",
    phase: 2,
    title: "Upgrade - Premium Distribution Agency",
    description: "Level up to a premium agency that understands high-volume distribution tactics and sub-account management.",
    status: "complete",
    steps: [
      { id: "s5", title: "Audit current agency performance", description: "Review metrics from Phase 1 - views per post, engagement rates, follower growth velocity.", status: "complete", assignee: "Analytics" },
      { id: "s6", title: "Onboard premium distribution agency", description: "Transition to an agency specializing in multi-account distribution with proven case studies.", status: "complete", assignee: "Operations" },
      { id: "s7", title: "Launch sub-account network", description: "Create 8-12 branded sub-accounts across platforms with consistent branding and bios.", status: "complete", assignee: "Brand Team" },
      { id: "s8", title: "Implement cross-posting workflows", description: "Set up automated workflows to repurpose long-form content into short-form across all sub-accounts.", status: "complete", assignee: "Content Lead" },
    ],
  },
  {
    id: "ph3",
    phase: 3,
    title: "Document - Extract All SOPs",
    description: "Systematically document every process the premium agency uses so you can replicate it internally.",
    status: "active",
    steps: [
      { id: "s9", title: "Shadow agency content creation process", description: "Sit in on 2-3 content creation sessions. Document tools, timelines, and decision frameworks.", status: "complete", assignee: "Operations" },
      { id: "s10", title: "Map distribution workflow end-to-end", description: "Create a flowchart from raw footage → edited clip → scheduled post → published across all accounts.", status: "in-progress", assignee: "Content Lead" },
      { id: "s11", title: "Document analytics and reporting cadence", description: "Record how the agency tracks performance, what metrics they prioritize, and their reporting templates.", status: "in-progress", assignee: "Analytics" },
      { id: "s12", title: "Create SOP library", description: "Compile all documented processes into a searchable, version-controlled SOP library.", status: "pending", assignee: "Operations" },
    ],
  },
  {
    id: "ph4",
    phase: 4,
    title: "Transition - Agency to Consulting",
    description: "Move the agency to a consulting/advisory role while building your internal team using the documented SOPs.",
    status: "upcoming",
    steps: [
      { id: "s13", title: "Hire internal content team leads", description: "Recruit 2-3 team leads: one for short-form, one for long-form, one for distribution/scheduling.", status: "pending", assignee: "HR" },
      { id: "s14", title: "Train team on documented SOPs", description: "Run a 2-week intensive training using the SOP library from Phase 3.", status: "pending", assignee: "Operations" },
      { id: "s15", title: "Parallel run: internal + agency", description: "Run both teams simultaneously for 30 days. Compare output quality and volume.", status: "pending", assignee: "Content Lead" },
      { id: "s16", title: "Transition agency to advisory", description: "Reduce agency scope to weekly check-ins and strategic advice only.", status: "pending", assignee: "Operations" },
    ],
  },
  {
    id: "ph5",
    phase: 5,
    title: "Independence - Full Internal Operations",
    description: "Cut the agency entirely once your internal team matches or exceeds their output quality and volume.",
    status: "upcoming",
    steps: [
      { id: "s17", title: "Benchmark internal vs agency output", description: "Compare 30-day metrics: posts/week, avg views, engagement rate, follower growth.", status: "pending", assignee: "Analytics" },
      { id: "s18", title: "Finalize agency offboarding", description: "Complete knowledge transfer, retrieve all assets, and formally end the agency contract.", status: "pending", assignee: "Operations" },
      { id: "s19", title: "Scale to 100+ posts/day", description: "With full internal control, push volume to maximum sustainable output across all sub-accounts.", status: "pending", assignee: "Content Lead" },
      { id: "s20", title: "Implement continuous optimization loop", description: "Set up weekly reviews of top-performing content to feed back into the content creation process.", status: "pending", assignee: "Analytics" },
    ],
  },
];

export const platformColors: Record<string, string> = {
  youtube: "#FF0000",
  tiktok: "#00F2EA",
  instagram: "#E4405F",
  facebook: "#1877F2",
  x: "#FFFFFF",
};

export const platformNames: Record<string, string> = {
  youtube: "YouTube",
  tiktok: "TikTok",
  instagram: "Instagram",
  facebook: "Facebook",
  x: "X (Twitter)",
};

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "active":
    case "published":
    case "complete":
      return "text-emerald";
    case "warning":
    case "in-progress":
    case "scheduled":
      return "text-amber";
    case "paused":
    case "draft":
    case "pending":
    case "upcoming":
      return "text-muted-foreground";
    case "failed":
      return "text-destructive";
    default:
      return "text-muted-foreground";
  }
}

export function getStatusDotColor(status: string): string {
  switch (status) {
    case "active":
    case "published":
    case "complete":
      return "bg-emerald";
    case "warning":
    case "in-progress":
    case "scheduled":
      return "bg-amber";
    case "paused":
    case "draft":
    case "pending":
    case "upcoming":
      return "bg-muted-foreground";
    case "failed":
      return "bg-destructive";
    default:
      return "bg-muted-foreground";
  }
}
