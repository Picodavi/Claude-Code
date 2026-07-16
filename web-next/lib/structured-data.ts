import { dict, brand } from "@/content/i18n";

export const SITE_URL = "https://picodavi.com";

// Preguntas presentes en la sección FAQ (mismas que en components/sections/Faq.tsx).
const FAQ_NUMS = ["1", "2", "6", "8", "10", "12", "13", "15", "18", "19", "20"];

export function professionalService() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Picodavi",
    description: dict.es["services.lead"],
    url: SITE_URL,
    email: brand.email,
    telephone: `+${brand.whatsapp}`,
    areaServed: ["Catalunya", "Barcelona", "España"],
    knowsLanguage: ["es", "ca", "en"],
    founder: { "@type": "Person", name: "David Picoiu", url: SITE_URL },
    sameAs: [`https://instagram.com/${brand.instagram}`],
    priceRange: "€€",
  };
}

export function faqPage() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_NUMS.map((n) => ({
      "@type": "Question",
      name: dict.es[`faq.q${n}`],
      acceptedAnswer: { "@type": "Answer", text: dict.es[`faq.a${n}`] },
    })),
  };
}
