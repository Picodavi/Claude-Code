import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Work } from "@/components/sections/Work";
import { Examples } from "@/components/sections/Examples";
import { Promises } from "@/components/sections/Promises";
import { InitialReview } from "@/components/sections/InitialReview";
import { Pricing } from "@/components/sections/Pricing";
import { Care } from "@/components/sections/Care";
import { Extras } from "@/components/sections/Extras";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { TechnologyScene } from "@/components/sections/TechnologyScene";
import { JsonLd } from "@/components/JsonLd";
import { professionalService, faqPage } from "@/lib/structured-data";
import techAi from "@/assets/tech-ai.webp";

export default function Home() {
  return (
    <main>
      <JsonLd data={professionalService()} />
      <JsonLd data={faqPage()} />
      <Hero />
      <Work />
      <Services />
      <TechnologyScene
        id="intelligence"
        image={techAi}
        copyKey="ai"
        index="01"
      />
      <Process />
      <Examples />
      <Promises />
      <InitialReview />
      <Pricing />
      <Care />
      <Extras />
      <About />
      <Faq />
      <Contact />
    </main>
  );
}
