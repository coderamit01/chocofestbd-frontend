const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const decodeHtml = (value: string) =>
  value
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

const inlineToHtml = (value: string) =>
  escapeHtml(value)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[\s(])_([^_]+)_(?=[\s).,!?]|$)/g, "$1<em>$2</em>");

export function markdownToHtml(markdown: string) {
  return markdown
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const heading = block.match(/^(#{2,3})\s+(.*)$/);
      if (heading) return `<h${heading[1].length}>${inlineToHtml(heading[2])}</h${heading[1].length}>`;

      const lines = block.split("\n");
      if (lines.every((line) => /^\s*-\s+/.test(line))) {
        return `<ul>${lines.map((line) => `<li>${inlineToHtml(line.replace(/^\s*-\s+/, ""))}</li>`).join("")}</ul>`;
      }

      return `<p>${lines.map(inlineToHtml).join("<br>")}</p>`;
    })
    .join("\n");
}

const inlineToMarkdown = (value: string) =>
  decodeHtml(
    value
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<a\s[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)")
      .replace(/<(strong|b)>([\s\S]*?)<\/\1>/gi, "**$2**")
      .replace(/<(em|i)>([\s\S]*?)<\/\1>/gi, "_$2_")
      .replace(/<[^>]+>/g, "")
  ).trim();

export function htmlToMarkdown(html: string) {
  if (!html.trim()) return "";

  return html
    .replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_, level, text) => `\n\n${"#".repeat(Math.min(Math.max(Number(level), 2), 3))} ${inlineToMarkdown(text)}\n\n`)
    .replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_, items: string) =>
      `\n\n${[...items.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((item) => `- ${inlineToMarkdown(item[1])}`).join("\n")}\n\n`
    )
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, text) => `\n\n${inlineToMarkdown(text)}\n\n`)
    .split(/\n{2,}/)
    .map((block) => (block.startsWith("#") || block.startsWith("- ") ? block.trim() : inlineToMarkdown(block)))
    .filter(Boolean)
    .join("\n\n");
}
