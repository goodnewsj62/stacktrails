import { BackendRoutes } from "@/routes";
import { formatDistanceToNow } from "date-fns";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8020/api/v1";

export function googleOneTapForm(cred: string) {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = `${baseURL}${BackendRoutes.GOOGLE_ONE_TAP}`;

  const credentialInput = document.createElement("input");
  credentialInput.type = "hidden";
  credentialInput.name = "credential";
  credentialInput.value = cred;

  const redirectInput = document.createElement("input");
  redirectInput.type = "hidden";
  redirectInput.name = "should_redirect";
  redirectInput.value = "true";

  form.appendChild(credentialInput);
  form.appendChild(redirectInput);
  document.body.appendChild(form);
  form.submit();
}

export function getImageProxyUrl(url?: string, defaultImg = undefined) {
  if (!url) {
    return defaultImg || "/";
  }

  if (
    url.startsWith(
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8020"
    )
  )
    return url;

  return `${
    process.env.NEXT_PUBLIC_BACKEND_URL
  }/media/proxy?url=${encodeURIComponent(url)}`;
}

export function getNumberUnit(num: number): "1K" | "1M" | "1B" | string {
  if (num >= 1_000_000_000) {
    return `${Number((num / 1000000000).toFixed(1))}B`;
  } else if (num >= 1_000_000) {
    return `${Number((num / 1000000).toFixed(1))}M`;
  } else if (num >= 1_000) {
    return `${Number((num / 1000).toFixed(1))}K`;
  }
  return num.toString();
}

export function timeAgo(isoDate: string): string {
  let result = formatDistanceToNow(new Date(isoDate), { addSuffix: true });

  // Normalize time units
  result = result
    .replace(/\bminutes\b/g, "mins")
    .replace(/\bminute\b/g, "min")
    .replace(/\bhours\b/g, "hrs")
    .replace(/\bhour\b/g, "hr");

  return result;
}
// Convert ISO 639-1 code to full language name
export function getLanguageName(code: string, displayLocale = "en"): string {
  const dn = new Intl.DisplayNames([displayLocale], { type: "language" });
  return dn.of(code) ?? code;
}
