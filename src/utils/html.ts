// Rut trich doan van ban thuan tu noi dung HTML (tin tuc khong co truong tom
// tat). DOMParser khong thuc thi script va khong tai anh.
export function htmlToPlainText(html: string): string {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return (doc.body.textContent ?? "").replace(/\s+/g, " ").trim();
}

export function htmlExcerpt(html: string, maxLength = 160): string {
  const text = htmlToPlainText(html);
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  const base = lastSpace > maxLength * 0.6 ? cut.slice(0, lastSpace) : cut;
  return `${base.trimEnd()}…`;
}
