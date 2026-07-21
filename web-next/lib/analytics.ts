export type EventData = Record<string, string | number | boolean | undefined>;
export type ContactIntent = "audit" | "plan_help";

export function trackEvent(event: string, data: EventData = {}) {
  if (typeof window === "undefined") return;

  const browserWindow = window as Window & {
    dataLayer?: Array<Record<string, unknown>>;
  };

  browserWindow.dataLayer ??= [];
  browserWindow.dataLayer.push({ event, ...data });
}

export function setContactIntent(intent: ContactIntent) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent("picodavi:contact-intent", { detail: { intent } }),
  );
}
