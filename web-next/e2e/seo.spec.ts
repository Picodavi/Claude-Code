import { expect, test } from "@playwright/test";

test("metadatos, canonical y datos estructurados son coherentes", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Diseño web.*Catalunya.*Picodavi/i);
  await expect(page.locator("meta[name='description']")).toHaveAttribute("content", /negocios locales/i);
  await expect(page.locator("link[rel='canonical']")).toHaveAttribute("href", "https://picodavi.com/");

  const schemas = await page.locator("script[type='application/ld+json']").allTextContents();
  expect(schemas.length).toBeGreaterThanOrEqual(2);
  const parsed = schemas.map((schema) => JSON.parse(schema));
  expect(parsed.some((item) => item["@type"] === "ProfessionalService")).toBeTruthy();
  expect(parsed.some((item) => item["@type"] === "FAQPage")).toBeTruthy();
});

test("robots y sitemap se sirven y solo contienen URLs canónicas", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("Sitemap: https://picodavi.com/sitemap.xml");

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  expect(xml).toContain("https://picodavi.com/");
  expect(xml).not.toContain("/beta/");
});
