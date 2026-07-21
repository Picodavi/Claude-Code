import { expect, test } from "@playwright/test";

type LabMetrics = {
  lcp: number;
  lcpElement: string;
  lcpUrl: string;
  fcp: number;
  cls: number;
  longTasks: number;
  longestTask: number;
  transferSize: number;
  topResources: { name: string; transferSize: number }[];
};

test("presupuesto de rendimiento movil del inicio", async ({ browserName, context, page }) => {
  test.skip(
    browserName !== "chromium" || process.env.PERFORMANCE_AUDIT !== "1",
    "La medicion de red/CPU debe ejecutarse aislada con npm run test:performance",
  );

  const client = await context.newCDPSession(page);
  await client.send("Network.enable");
  await client.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 150,
    downloadThroughput: (1.6 * 1024 * 1024) / 8,
    uploadThroughput: (750 * 1024) / 8,
  });
  await client.send("Emulation.setCPUThrottlingRate", { rate: 4 });

  await page.addInitScript(() => {
    const state = { lcp: 0, lcpElement: "", lcpUrl: "", cls: 0, longTasks: [] as number[] };
    Object.assign(window, { __picodaviLabMetrics: state });
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const entry = entries.at(-1) as PerformanceEntry & {
        element?: Element;
        url?: string;
      } | undefined;
      state.lcp = entry?.startTime ?? state.lcp;
      state.lcpElement = entry?.element
        ? `${entry.element.tagName.toLowerCase()}.${entry.element.className}`
        : state.lcpElement;
      state.lcpUrl = entry?.url ?? state.lcpUrl;
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const shift = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
        if (!shift.hadRecentInput) state.cls += shift.value ?? 0;
      }
    }).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver((list) => {
      state.longTasks.push(...list.getEntries().map((entry) => entry.duration));
    }).observe({ type: "longtask", buffered: true });
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await expect(page.locator(".hero-canvas canvas")).toHaveCount(0);
  await page.locator(".hero-cta--secondary").focus();
  await page.evaluate(() => new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  }));

  const metrics = await page.evaluate<LabMetrics>(() => {
    const state = (window as typeof window & {
      __picodaviLabMetrics: {
        lcp: number;
        lcpElement: string;
        lcpUrl: string;
        cls: number;
        longTasks: number[];
      };
    }).__picodaviLabMetrics;
    const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
    return {
      lcp: state.lcp,
      lcpElement: state.lcpElement,
      lcpUrl: state.lcpUrl,
      fcp: performance.getEntriesByName("first-contentful-paint")[0]?.startTime ?? 0,
      cls: state.cls,
      longTasks: state.longTasks.length,
      longestTask: Math.max(0, ...state.longTasks),
      transferSize: resources.reduce((total, entry) => total + entry.transferSize, 0),
      topResources: resources
        .map((entry) => ({ name: new URL(entry.name).pathname, transferSize: entry.transferSize }))
        .sort((a, b) => b.transferSize - a.transferSize)
        .slice(0, 8),
    };
  });

  await test.info().attach("mobile-lab-metrics.json", {
    body: Buffer.from(JSON.stringify(metrics, null, 2)),
    contentType: "application/json",
  });
  console.info(`MOBILE_LAB_METRICS ${JSON.stringify(metrics)}`);

  const strict = process.env.PERFORMANCE_STRICT === "1";
  expect(metrics.lcp).toBeLessThanOrEqual(strict ? 2_500 : 4_000);
  expect(metrics.cls).toBeLessThanOrEqual(0.1);
  expect(metrics.longestTask).toBeLessThanOrEqual(strict ? 250 : 3_000);
});
