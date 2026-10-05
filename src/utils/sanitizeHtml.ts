import DOMPurify from "dompurify";
import { resolveAssetUrl } from "@/utils/resolveAssetUrl";

// Noi dung tin tuc la HTML tu trinh soan thao (Tiptap) o admin web app. Luon
// sanitize truoc khi render: bo script/su kien/iframe..., dong thoi
// - anh tai len dung duong dan tuong doi (/uploads/...) -> tro ve host backend;
// - lien ket mo tab moi luon co rel="noopener noreferrer".
let hooksInstalled = false;

function installHooks() {
  if (hooksInstalled) return;
  hooksInstalled = true;
  DOMPurify.addHook("afterSanitizeAttributes", node => {
    if (node instanceof HTMLImageElement) {
      const src = node.getAttribute("src");
      const resolved = resolveAssetUrl(src);
      if (resolved && resolved !== src) node.setAttribute("src", resolved);
      node.setAttribute("loading", "lazy");
    }
    if (node instanceof HTMLAnchorElement && node.getAttribute("target") === "_blank") {
      node.setAttribute("rel", "noopener noreferrer");
    }
  });
}

export function sanitizeHtml(html: string): string {
  installHooks();
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target"],
    FORBID_TAGS: ["style", "form", "input", "button", "textarea", "select"],
  });
}
