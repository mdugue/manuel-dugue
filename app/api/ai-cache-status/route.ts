import { hasLocale, type Locale } from "@/i18n/config";
import { type AiCacheNamespace, readAiCacheStatuses } from "@/lib/ai-cache";

const namespaces = ["self-presentation", "social-proof"] as const;

function isNamespace(value: unknown): value is AiCacheNamespace {
  return (
    typeof value === "string" &&
    (namespaces as readonly string[]).includes(value)
  );
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const namespace = url.searchParams.get("namespace");
  const lang = url.searchParams.get("lang");

  if (!isNamespace(namespace)) {
    return new Response("bad namespace", { status: 400 });
  }
  if (typeof lang !== "string" || !hasLocale(lang)) {
    return new Response("bad lang", { status: 400 });
  }

  const statuses = await readAiCacheStatuses(namespace, lang as Locale);
  return new Response(JSON.stringify(statuses), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
