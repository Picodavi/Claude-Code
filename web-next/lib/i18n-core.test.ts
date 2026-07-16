import { describe, it, expect } from "vitest";
import { resolve } from "./i18n-core";

describe("resolve i18n", () => {
  it("devuelve ES por defecto", () => {
    expect(resolve("es", "hero.ctaPrimary")).toMatch(/Cuéntame/);
  });
  it("devuelve EN", () => {
    expect(resolve("en", "hero.ctaPrimary")).toMatch(/Tell me/);
  });
  it("cae a la clave si no existe", () => {
    expect(resolve("es", "no.existe.xyz")).toBe("no.existe.xyz");
  });
});
