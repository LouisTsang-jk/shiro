import { site } from "@/lib/site";
import { getAllEssays, getAllNotes } from "@/lib/content";
import { parseDate } from "@/lib/format";

export const dynamic = "force-static";
export const revalidate = 3600;

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

type FeedItem = {
  title: string;
  url: string;
  description: string;
  date: Date;
  guid: string;
};

export async function GET() {
  const [essays, notes] = await Promise.all([getAllEssays(), getAllNotes()]);
  const base = site.url.replace(/\/$/, "");

  const items: FeedItem[] = [
    ...essays.map((e) => ({
      title: e.title,
      url: `${base}/essays/${e.slug}`,
      description: e.excerpt,
      date: parseDate(e.date),
      guid: `${base}/essays/${e.slug}`,
    })),
    ...notes.map((n) => {
      const firstLine = n.body.replace(/\s+/g, " ").trim();
      const title = firstLine.length > 60 ? `${firstLine.slice(0, 57)}…` : firstLine;
      return {
        title,
        url: `${base}/notes/${n.slug}`,
        description: n.body,
        date: parseDate(n.date),
        guid: `${base}/notes/${n.slug}`,
      };
    }),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  const xmlItems = items
    .map(
      (item) => `    <item>
      <title>${xmlEscape(item.title)}</title>
      <link>${xmlEscape(item.url)}</link>
      <guid isPermaLink="true">${xmlEscape(item.guid)}</guid>
      <description>${xmlEscape(item.description)}</description>
      <pubDate>${item.date.toUTCString()}</pubDate>
    </item>`,
    )
    .join("\n");

  const latest = items[0]?.date ?? new Date();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(site.name)}</title>
    <link>${xmlEscape(base)}</link>
    <description>${xmlEscape(site.description)}</description>
    <language>en</language>
    <lastBuildDate>${latest.toUTCString()}</lastBuildDate>
    <atom:link href="${xmlEscape(base)}/feed.xml" rel="self" type="application/rss+xml" />
${xmlItems}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
