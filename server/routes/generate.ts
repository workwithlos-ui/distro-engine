import { Router, Request, Response } from "express";

const router = Router();

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

interface GenerateRequest {
  input: string;
  accounts: Array<{ id: string; name: string; handle: string; platform: string }>;
  contentType: string;
}

interface AnthropicResponse {
  content?: Array<{ text: string }>;
  error?: { message: string };
}

async function generateForAccount(
  input: string,
  account: { id: string; name: string; handle: string; platform: string },
  contentType: string,
  apiKey: string
) {
  const platformSpec: Record<string, string> = {
    "short-form": "Under 60 seconds. Hook in first 3 words. Hard payoff. High energy.",
    "long-form": "3-10 minute format. Strong hook. Value-dense. Clear CTA at end.",
    clips: "15-30 second clip. One punchy insight. Scroll-stopping opening.",
    linkedin: "150-250 words. Short paragraphs. Professional tone. Killer hook line 1. 3-5 hashtags at end.",
  };

  const spec = platformSpec[contentType] || platformSpec["short-form"];

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-5",
      max_tokens: 1200,
      system: `Elite content creator. Generate ${contentType} content for the "${account.name}" account (${account.handle}) on ${account.platform}. Lead with a specific hook. No fluff. Return JSON only.`,
      messages: [
        {
          role: "user",
          content: `SOURCE:\n${input}\n\nSpec: ${spec}\n\nReturn JSON: {"account":"${account.name}","handle":"${account.handle}","platform":"${account.platform}","content":"...","hook":"first line only","format":"${contentType}","tips":"one platform-specific tip"}`,
        },
      ],
    }),
  });

  const data = (await res.json()) as AnthropicResponse;
  if (!res.ok) throw new Error(data.error?.message || "API error");

  const raw = data.content?.[0]?.text || "{}";
  try {
    return JSON.parse(raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim());
  } catch {
    return {
      account: account.name,
      handle: account.handle,
      platform: account.platform,
      content: raw,
      hook: raw.split("\n")[0],
      format: contentType,
      tips: "",
    };
  }
}

router.post("/", async (req: Request, res: Response) => {
  try {
    const { input, accounts, contentType } = req.body as GenerateRequest;

    if (!input) {
      return res.status(400).json({ error: "Input required" });
    }
    if (!accounts || accounts.length === 0) {
      return res.status(400).json({ error: "At least one account required" });
    }
    if (!ANTHROPIC_API_KEY) {
      return res.status(500).json({
        error: "ANTHROPIC_API_KEY not configured. Please add it in the Vercel dashboard under Environment Variables.",
      });
    }

    const posts = await Promise.all(
      accounts.map((account) =>
        generateForAccount(input, account, contentType || "short-form", ANTHROPIC_API_KEY!)
      )
    );

    return res.json({ posts, count: posts.length, contentType });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Generation failed";
    return res.status(500).json({ error: message });
  }
});

export default router;
