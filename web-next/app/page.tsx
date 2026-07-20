import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Work } from "@/components/sections/Work";
import { Sectors } from "@/components/sections/Sectors";
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
import techCode from "@/assets/tech-code.webp";
import techData from "@/assets/tech-data.webp";

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
      <Sectors />
      <Examples />
      <Promises />
      <TechnologyScene
        id="craft"
        image={techCode}
        copyKey="code"
        index="02"
        align="right"
      />
      <InitialReview />
      <Pricing />
      <Care />
      <Extras />
      <TechnologyScene
        id="architecture"
        image={techData}
        copyKey="data"
        index="03"
      />
      <About />
      <Faq />
      <Contact />
    </main>
  );
}
