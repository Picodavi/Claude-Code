export type EventData = Record<string, string | number | boolean | undefined>;

export function trackEvent(event: string, data: EventData = {}) {
  if (typeof window === "undefined") return;

  const browserWindow = window as Window & {
    dataLayer?: Array<Record<string, unknown>>;
  };

  browserWindow.dataLayer ??= [];
  browserWindow.dataLayer.push({ event, ...data });
}
