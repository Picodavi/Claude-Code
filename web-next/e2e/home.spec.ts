import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("muestra una propuesta clara y una única acción principal", async ({ page }) => {
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toContainText(/trabajan por ti|work for you/i);
  await expect(page.locator("#work")).toBeVisible();
  await expect(page.locator("#pricing")).toBeVisible();
  await expect(page.locator("#contact")).toBeVisible();
});

test("la ayuda de precios conserva la intención al llegar al formulario", async ({ page }) => {
  await page.locator("#pricing a[href='#contact']").click({ force: true });
  await expect(page.locator("input[name='need']")).toHaveValue(/plan|opci[oó]n/i);
});

test("el formulario exige los dos datos necesarios y prepara WhatsApp", async ({ page }) => {
  const name = page.locator("input[name='name']");
  const need = page.locator("input[name='need']");
  await expect(name).toHaveAttribute("required", "");
  await expect(need).toHaveAttribute("required", "");
  await expect(name).toHaveAttribute("maxlength", "80");
  await expect(need).toHaveAttribute("maxlength", "160");
  await expect(page.locator("textarea[name='message']")).toHaveAttribute("maxlength", "500");

  await name.fill("Empresa de prueba");
  await need.fill("Web corporativa");
  const popupPromise = page.waitForEvent("popup");
  await page.getByRole("button", { name: /WhatsApp/i }).click({ force: true });
  const popup = await popupPromise;
  await expect.poll(() => popup.url()).toMatch(/wa\.me|whatsapp\.com/);
  const preparedText = new URL(popup.url()).searchParams.get("text") ?? "";
  expect(preparedText).toContain("Empresa de prueba");
  expect(preparedText).toContain("Web corporativa");
  await popup.close();
});

test("si el navegador bloquea WhatsApp ofrece un enlace recuperable", async ({ page }) => {
  await page.evaluate(() => {
    Object.defineProperty(window, "open", { configurable: true, value: () => null });
  });
  await page.locator("input[name='name']").fill("Empresa de prueba");
  await page.locator("input[name='need']").fill("Web corporativa");
  await page.locator("form").evaluate((form: HTMLFormElement) => {
    form.dispatchEvent(new SubmitEvent("submit", { bubbles: true, cancelable: true }));
  });
  await expect(page.getByRole("status")).toBeVisible();
  await expect(page.getByRole("status").getByRole("link")).toHaveAttribute("href", /wa\.me/);
});

test("no aparece scroll horizontal en 320 px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.reload();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("los enlaces de páginas legales funcionan", async ({ page }) => {
  for (const path of ["aviso-legal", "privacidad", "cookies"]) {
    const link = page.locator(`footer a[href='/legal/${path}/']`);
    await expect(link).toBeVisible();
    const response = await page.request.get(`/legal/${path}/`);
    expect(response.status()).toBe(200);
  }
});

test("los enlaces externos en pestaña nueva aíslan la página de origen", async ({ page }) => {
  const external = page.locator("a[target='_blank']");
  const count = await external.count();
  expect(count).toBeGreaterThan(0);
  for (let index = 0; index < count; index += 1) {
    await expect(external.nth(index)).toHaveAttribute("rel", /noopener/);
    await expect(external.nth(index)).toHaveAttribute("rel", /noreferrer/);
  }
});

test("la medición registra el embudo sin datos personales", async ({ page }) => {
  await page.evaluate(() => {
    (window as typeof window & { dataLayer: Record<string, unknown>[] }).dataLayer = [];
    Object.defineProperty(window, "open", { configurable: true, value: () => null });
  });
  await page.locator("input[name='name']").fill("Persona privada");
  await page.locator("input[name='need']").fill("Necesidad privada");
  await page.locator("form").evaluate((form: HTMLFormElement) => {
    form.dispatchEvent(new SubmitEvent("submit", { bubbles: true, cancelable: true }));
  });

  const events = await page.evaluate(() =>
    (window as typeof window & { dataLayer: Record<string, unknown>[] }).dataLayer,
  );
  expect(events.map((item) => item.event)).toEqual(
    expect.arrayContaining(["lead_form_started", "lead_form_submitted", "lead_form_open_failed"]),
  );
  const serialized = JSON.stringify(events);
  expect(serialized).not.toContain("Persona privada");
  expect(serialized).not.toContain("Necesidad privada");
});
