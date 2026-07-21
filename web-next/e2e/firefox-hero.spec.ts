import { expect, test } from "@playwright/test";

test("Firefox mantiene unido el portátil y no congela la transición final", async ({ browserName, page }) => {
  test.skip(browserName !== "firefox", "Comprobación específica del motor Firefox");

  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto("/");
  await page.waitForLoadState("networkidle");

  await expect(page.locator("[data-hero-mac] .hero-mac__lid")).toHaveCount(1);
  await expect(page.locator("[data-hero-mac] .hero-mac__base")).toHaveCount(1);
  await expect(page.locator(".hero-canvas canvas")).toHaveCount(0);

  const midGeometry = await page.evaluate(async () => {
    const hero = document.querySelector<HTMLElement>(".hero-experience");
    if (!hero) throw new Error("Hero not found");
    const travel = Math.max(1, hero.offsetHeight - window.innerHeight);
    window.scrollTo(0, travel * 0.5);
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });
    const rig = document.querySelector<HTMLElement>("[data-hero-mac]")!;
    const lid = rig.querySelector<HTMLElement>(".hero-mac__lid")!;
    const base = rig.querySelector<HTMLElement>(".hero-mac__base")!;
    return {
      layoutGap: Math.abs(base.offsetTop - (lid.offsetTop + lid.offsetHeight)),
      rigTransform: getComputedStyle(rig).transform,
      baseTransform: getComputedStyle(base).transform,
    };
  });
  expect(midGeometry.rigTransform).not.toBe("none");
  expect(midGeometry.baseTransform).not.toContain("perspective");
  expect(midGeometry.layoutGap).toBeLessThan(30);

  const cadence = await page.evaluate(async () => {
    const hero = document.querySelector<HTMLElement>(".hero-experience");
    if (!hero) throw new Error("Hero not found");
    const travel = Math.max(1, hero.offsetHeight - window.innerHeight);
    window.scrollTo(0, travel * 0.82);
    const frames: number[] = [];
    await new Promise<void>((resolve) => {
      const sample = (time: number) => {
        frames.push(time);
        if (frames.length >= 90) resolve();
        else requestAnimationFrame(sample);
      };
      requestAnimationFrame(sample);
    });
    const gaps = frames.slice(1).map((time, index) => time - frames[index]);
    return {
      total: frames.at(-1)! - frames[0],
      maxGap: Math.max(...gaps),
      p95Gap: gaps.sort((a, b) => a - b)[Math.floor(gaps.length * 0.95)],
    };
  });

  const rig = page.locator("[data-hero-mac]");
  const opacity = Number(await rig.evaluate((node) => getComputedStyle(node).opacity));
  expect(opacity).toBeLessThan(0.15);
  expect(cadence.total).toBeLessThan(4_000);
  expect(cadence.maxGap).toBeLessThan(500);
  expect(errors).toEqual([]);
  console.info(`FIREFOX_HERO_METRICS ${JSON.stringify({ ...cadence, ...midGeometry })}`);
  await test.info().attach("firefox-cadence.json", {
    body: Buffer.from(JSON.stringify({ ...cadence, ...midGeometry }, null, 2)),
    contentType: "application/json",
  });
});
