import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Work } from "@/components/sections/Work";
import { Sectors } from "@/components/sections/Sectors";
import { Promises } from "@/components/sections/Promises";
import { Why } from "@/components/sections/Why";
import { Pricing } from "@/components/sections/Pricing";
import { Care } from "@/components/sections/Care";
import { Extras } from "@/components/sections/Extras";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { JsonLd } from "@/components/JsonLd";
import { professionalService, faqPage } from "@/lib/structured-data";

export default function Home() {
  return (
    <main>
      <JsonLd data={professionalService()} />
      <JsonLd data={faqPage()} />
      <Hero />
      <Services />
      <Process />
      <Work />
      <Sectors />
      <Promises />
      <Why />
      <Pricing />
      <Care />
      <Extras />
      <About />
      <Faq />
      <Contact />
    </main>
  );
}
