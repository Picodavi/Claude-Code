import { describe, it, expect } from "vitest";
import { resolve } from "./i18n-core";

describe("resolve i18n", () => {
  it("devuelve ES por defecto", () => {
    expect(resolve("es", "hero.ctaPrimary")).toBe("Pide una propuesta clara →");
  });
  it("devuelve EN", () => {
    expect(resolve("en", "hero.ctaPrimary")).toBe("Request a clear proposal →");
  });
  it("cae a la clave si no existe", () => {
    expect(resolve("es", "no.existe.xyz")).toBe("no.existe.xyz");
  });

  it("muestra el compromiso mínimo completo del plan mensual", () => {
    expect(resolve("es", "price.p2")).toMatch(/6 meses.*780 €/i);
    expect(resolve("en", "price.p2")).toMatch(/6 months.*€780/i);
  });

  it("solo anuncia idiomas y compatibilidad que la web puede demostrar", () => {
    expect(resolve("es", "about.stat3V")).toBe("ES · EN");
    expect(resolve("en", "about.stat3V")).toBe("ES · EN");
    expect(resolve("es", "inc.6t")).not.toMatch(/todos/i);
    expect(resolve("en", "inc.6t")).not.toMatch(/every/i);
  });
});
