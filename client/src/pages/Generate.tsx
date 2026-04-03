/*
 * Generate Page — AI Content Generation for All Sub-Accounts
 * Design: "Obsidian Ops" — Dark Luxury SaaS
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Copy,
  Check,
  ChevronDown,
  Loader2,
  Zap,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { subAccounts, platformColors, platformNames } from "@/lib/data";
import { cn } from "@/lib/utils";

const CONTENT_TYPES = [
  { value: "short-form", label: "Short-Form (Reels / TikTok / Shorts)" },
  { value: "long-form", label: "Long-Form (YouTube / Podcast)" },
  { value: "clips", label: "Clips (15–30s Punchy Cuts)" },
  { value: "linkedin", label: "LinkedIn (Professional Post)" },
];

interface GeneratedPost {
  account: string;
  handle: string;
  platform: string;
  content: string;
  hook: string;
  format: string;
  tips?: string;
}

interface GenerateResponse {
  posts?: GeneratedPost[];
  count?: number;
  contentType?: string;
  error?: string;
}

function PlatformBadge({ platform }: { platform: string }) {
  const color = platformColors[platform] || "#8B5CF6";
  const name = platformNames[platform] || platform;
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider"
      style={{ backgroundColor: `${color}20`, color, border: `1px solid ${color}40` }}
    >
      {name}
    </span>
  );
}

function AccountAvatar({ avatar, platform }: { avatar: string; platform: string }) {
  const color = platformColors[platform] || "#8B5CF6";
  return (
    <div
      className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
      style={{ backgroundColor: `${color}20`, color, border: `1px solid ${color}30` }}
    >
      {avatar}
    </div>
  );
}

function ResultCard({ post, account, index }: { post: GeneratedPost; account: (typeof subAccounts)[0]; index: number }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(post.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.3 }}
      className="glass-panel rounded-xl p-5 flex flex-col gap-3 border border-border/50 hover:border-violet/30 transition-colors"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <AccountAvatar avatar={account.avatar} platform={account.platform} />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{account.name}</p>
            <p className="text-xs text-muted-foreground truncate">{account.handle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <PlatformBadge platform={account.platform} />
          <button
            onClick={handleCopy}
            className={cn(
              "p-1.5 rounded-md transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-accent/50",
              copied && "text-emerald hover:text-emerald"
            )}
            title="Copy content"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Hook highlight */}
      {post.hook && (
        <div className="px-3 py-2 rounded-lg bg-violet/10 border border-violet/20">
          <p className="text-xs text-violet-light font-medium leading-relaxed">
            <span className="text-violet/70 mr-1.5 font-mono text-[10px] uppercase tracking-wider">Hook →</span>
            {post.hook}
          </p>
        </div>
      )}

      {/* Content */}
      <div className="flex-1">
        <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Tips */}
      {post.tips && (
        <div className="pt-2 border-t border-border/30">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="text-amber font-medium mr-1">Tip:</span>
            {post.tips}
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default function Generate() {
  const [input, setInput] = useState("");
  const [contentType, setContentType] = useState("short-form");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<GeneratedPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedLabel = CONTENT_TYPES.find((t) => t.value === contentType)?.label || "Short-Form";

  const activeAccounts = subAccounts.filter((a) => a.status !== "paused");

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const payload = {
        input: input.trim(),
        contentType,
        accounts: activeAccounts.map((a) => ({
          id: a.id,
          name: a.name,
          handle: a.handle,
          platform: a.platform,
        })),
      };

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: GenerateResponse = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Generation failed");
      }

      setResults(data.posts || []);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-violet" />
              AI Content Generator
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Paste a transcript or idea — generate tailored content for all{" "}
              <span className="text-violet font-medium">{activeAccounts.length} active accounts</span> at once.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs text-muted-foreground font-mono shrink-0">
            <Zap className="w-3 h-3 text-violet" />
            Claude Sonnet
          </div>
        </motion.div>

        {/* Input panel */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="glass-panel rounded-xl p-5 border border-border/50 space-y-4"
        >
          {/* Textarea */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Transcript or Idea
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste a video transcript, podcast excerpt, raw idea, or any source content here...&#10;&#10;Example: 'The secret to posting 100x per day without burning out is building a distribution system, not a content factory. Here's how...'"
              rows={6}
              className="w-full bg-background/50 border border-border/60 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-1 focus:ring-violet/50 focus:border-violet/50 transition-colors leading-relaxed"
            />
          </div>

          {/* Controls row */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Content type dropdown */}
            <div className="relative flex-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">
                Content Type
              </label>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center justify-between gap-2 bg-background/50 border border-border/60 rounded-lg px-4 py-2.5 text-sm text-foreground hover:border-violet/40 focus:outline-none focus:ring-1 focus:ring-violet/50 transition-colors"
              >
                <span>{selectedLabel}</span>
                <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", dropdownOpen && "rotate-180")} />
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.12 }}
                    className="absolute top-full left-0 right-0 mt-1 z-20 bg-card border border-border/60 rounded-lg shadow-xl overflow-hidden"
                  >
                    {CONTENT_TYPES.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => {
                          setContentType(type.value);
                          setDropdownOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-accent/50",
                          contentType === type.value
                            ? "text-violet bg-violet/10 font-medium"
                            : "text-foreground"
                        )}
                      >
                        {type.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Generate button */}
            <div className="sm:self-end">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5 sm:invisible">
                &nbsp;
              </label>
              <button
                onClick={handleGenerate}
                disabled={loading || !input.trim()}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 whitespace-nowrap",
                  loading || !input.trim()
                    ? "bg-violet/30 text-violet/50 cursor-not-allowed"
                    : "bg-violet hover:bg-violet/90 text-white shadow-lg shadow-violet/20 hover:shadow-violet/30"
                )}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating…
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate for all accounts
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Account count info */}
          <p className="text-xs text-muted-foreground">
            Will generate content for{" "}
            <span className="text-foreground font-medium">{activeAccounts.length} active accounts</span>
            {" "}— {subAccounts.filter((a) => a.status === "paused").length} paused accounts excluded.
          </p>
        </motion.div>

        {/* Loading state */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass-panel rounded-xl p-8 border border-border/50 flex flex-col items-center gap-4"
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-2 border-violet/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-violet animate-pulse" />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-violet/60 border-t-transparent animate-spin" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">Generating content for {activeAccounts.length} accounts…</p>
                <p className="text-xs text-muted-foreground mt-1">Claude is crafting tailored {selectedLabel} content for each sub-account.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error state */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="glass-panel rounded-xl p-4 border border-destructive/30 bg-destructive/5 flex items-start gap-3"
            >
              <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-destructive">Generation failed</p>
                <p className="text-xs text-muted-foreground mt-0.5 break-words">{error}</p>
              </div>
              <button
                onClick={handleGenerate}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-accent/50 hover:bg-accent text-foreground transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                Retry
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results grid */}
        <AnimatePresence>
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-foreground">
                  Generated Content
                  <span className="ml-2 text-xs font-normal text-muted-foreground">
                    {results.length} accounts · {selectedLabel}
                  </span>
                </h2>
                <button
                  onClick={() => {
                    const all = results.map((p) => `--- ${p.account} (${p.handle}) ---\n${p.content}`).join("\n\n");
                    navigator.clipboard.writeText(all);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-accent/50 hover:bg-accent text-foreground transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  Copy all
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {results.map((post, i) => {
                  const account = subAccounts.find(
                    (a) => a.name === post.account || a.handle === post.handle
                  ) || activeAccounts[i] || activeAccounts[0];
                  return (
                    <ResultCard key={`${post.account}-${i}`} post={post} account={account} index={i} />
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {!loading && results.length === 0 && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-panel rounded-xl p-12 border border-border/30 border-dashed flex flex-col items-center gap-3 text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-violet/10 border border-violet/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-violet/60" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">No content generated yet</p>
            <p className="text-xs text-muted-foreground/60 max-w-sm">
              Paste a transcript or idea above, select a content type, and hit{" "}
              <span className="text-violet/80 font-medium">Generate for all accounts</span> to create tailored content for every sub-account.
            </p>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
