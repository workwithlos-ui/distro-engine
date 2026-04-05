/*
 * Design: "Obsidian Ops" - Dark Luxury SaaS
 * Page: Brand Kit - centralized asset and brand management
 */
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Upload,
  Palette,
  Type,
  Image,
  Film,
  FileText,
  Copy,
  Check,
  Plus,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const brandColors = [
  { name: "Primary Violet", hex: "#8B5CF6", usage: "CTAs, active states, highlights" },
  { name: "Emerald", hex: "#22C55E", usage: "Success, growth, positive metrics" },
  { name: "Amber", hex: "#F59E0B", usage: "Warnings, pending states" },
  { name: "Cyan", hex: "#06B6D4", usage: "Links, secondary accents" },
  { name: "Dark Base", hex: "#09090B", usage: "Backgrounds, primary surfaces" },
  { name: "Light Text", hex: "#ECECEF", usage: "Primary text, headings" },
];

const assets = [
  { id: "1", name: "Logo - Full", type: "image", format: "SVG", size: "24 KB" },
  { id: "2", name: "Logo - Icon Only", type: "image", format: "SVG", size: "8 KB" },
  { id: "3", name: "Intro Animation", type: "video", format: "MP4", size: "2.4 MB" },
  { id: "4", name: "Outro Animation", type: "video", format: "MP4", size: "1.8 MB" },
  { id: "5", name: "Watermark - Light", type: "image", format: "PNG", size: "12 KB" },
  { id: "6", name: "Watermark - Dark", type: "image", format: "PNG", size: "12 KB" },
  { id: "7", name: "Thumbnail Template A", type: "image", format: "PSD", size: "8.2 MB" },
  { id: "8", name: "Thumbnail Template B", type: "image", format: "PSD", size: "7.6 MB" },
  { id: "9", name: "Brand Guidelines PDF", type: "document", format: "PDF", size: "4.1 MB" },
  { id: "10", name: "Caption Templates", type: "document", format: "TXT", size: "2 KB" },
];

const typeIcons: Record<string, typeof Image> = {
  image: Image,
  video: Film,
  document: FileText,
};

const fonts = [
  { name: "Inter", weight: "400–900", usage: "UI Text, Body Copy", sample: "The quick brown fox jumps over the lazy dog" },
  { name: "Geist Mono", weight: "400–700", usage: "Data, Metrics, Code", sample: "35,000 posts/year = Volume Negates Luck" },
];

export default function BrandKit() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    toast("Color copied to clipboard");
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Brand Kit</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Centralized brand assets - applied consistently across all sub-accounts
            </p>
          </div>
          <Button
            size="sm"
            className="bg-violet hover:bg-violet-light text-white border-0 gap-2"
            onClick={() => toast("Asset upload coming soon")}
          >
            <Upload className="w-3.5 h-3.5" /> Upload Asset
          </Button>
        </div>

        {/* Color palette */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-5">
            <Palette className="w-4 h-4 text-violet" />
            <h3 className="text-sm font-semibold">Color Palette</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {brandColors.map((color) => (
              <button
                key={color.hex}
                onClick={() => copyColor(color.hex)}
                className="group text-left"
              >
                <div
                  className="h-20 rounded-lg mb-2 border border-border/20 transition-transform group-hover:scale-[1.02]"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium">{color.name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{color.hex}</p>
                  </div>
                  {copiedColor === color.hex ? (
                    <Check className="w-3.5 h-3.5 text-emerald" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5">{color.usage}</p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Typography */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-5">
            <Type className="w-4 h-4 text-violet" />
            <h3 className="text-sm font-semibold">Typography</h3>
          </div>
          <div className="space-y-6">
            {fonts.map((font) => (
              <div key={font.name} className="p-4 rounded-lg bg-background/30 border border-border/20">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold">{font.name}</p>
                    <p className="text-xs text-muted-foreground">Weight: {font.weight} · {font.usage}</p>
                  </div>
                </div>
                <p
                  className="text-lg text-muted-foreground"
                  style={{ fontFamily: font.name === "Geist Mono" ? "Geist Mono, monospace" : "Inter, sans-serif" }}
                >
                  {font.sample}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Asset library */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-panel rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Image className="w-4 h-4 text-violet" />
              <h3 className="text-sm font-semibold">Asset Library</h3>
            </div>
            <span className="text-xs text-muted-foreground font-mono">{assets.length} assets</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {assets.map((asset, i) => {
              const Icon = typeIcons[asset.type] || FileText;
              return (
                <motion.div
                  key={asset.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.03 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-background/30 border border-border/20 hover:border-border/40 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-violet/10 text-violet shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{asset.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {asset.format} · {asset.size}
                    </p>
                  </div>
                  <button
                    onClick={() => toast(`Downloading ${asset.name}...`)}
                    className="p-1.5 rounded-md text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Auto-branding rules */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel rounded-xl p-5"
        >
          <h3 className="text-sm font-semibold mb-4">Auto-Branding Rules</h3>
          <p className="text-xs text-muted-foreground mb-4">
            These rules are automatically applied to all content distributed through sub-accounts.
          </p>
          <div className="space-y-3">
            {[
              { rule: "Apply watermark to all short-form content", status: "active" },
              { rule: "Prepend intro animation to long-form videos", status: "active" },
              { rule: "Append outro with CTA to all YouTube uploads", status: "active" },
              { rule: "Auto-generate thumbnails using Template A", status: "active" },
              { rule: "Include branded hashtag set in all captions", status: "active" },
              { rule: "Enforce brand color palette in all graphics", status: "paused" },
            ].map((item) => (
              <div key={item.rule} className="flex items-center justify-between p-3 rounded-lg bg-background/30 border border-border/20">
                <span className="text-sm">{item.rule}</span>
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded font-medium",
                  item.status === "active" ? "bg-emerald/10 text-emerald" : "bg-muted/30 text-muted-foreground"
                )}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
