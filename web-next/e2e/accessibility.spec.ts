import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const path of ["/", "/legal/aviso-legal/", "/legal/privacidad/", "/legal/cookies/"]) {
  test(`sin infracciones automáticas graves en ${path}`, async ({ page }) => {
    // Axe debe analizar el estado visual estable, no un fotograma intermedio
    // donde GSAP está bajando temporalmente la opacidad de una sección.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    const blocking = results.violations.filter((item) =>
      item.impact === "critical" || item.impact === "serious",
    );
    expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
  });
}

test("respeta prefers-reduced-motion antes de iniciar el hero", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
  await expect(page.locator(".hero-experience")).toHaveClass(/hero-experience--reduced/);
  await expect(page.locator(".hero-canvas canvas")).toHaveCount(0);
});

test("el control de movimiento se traduce con la interfaz", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Cambiar idioma a inglés/i }).click({ force: true });
  await expect(page.locator(".hero-motion-toggle")).toContainText(/motion/i);
});

test("el enlace de salto y el foco son visibles con teclado", async ({ browserName, page }) => {
  await page.goto("/");
  const skip = page.getByRole("link", { name: /Saltar al contenido/i });
  if (browserName === "webkit") {
    // Safari solo incluye enlaces en el ciclo de Tab cuando el usuario activa
    // la opcion de navegacion completa del sistema.
    await skip.focus();
  } else {
    await page.keyboard.press("Tab");
  }
  await expect(skip).toBeFocused();
  const outline = await skip.evaluate((element) => getComputedStyle(element).outlineStyle);
  expect(outline).not.toBe("none");
  await skip.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});
