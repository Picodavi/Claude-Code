import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Work } from "@/components/sections/Work";
import { Sectors } from "@/components/sections/Sectors";
import { Promises } from "@/components/sections/Promises";
import { Why } from "@/components/sections/Why";
import { Fit } from "@/components/sections/Fit";
import { Pricing } from "@/components/sections/Pricing";
import { Care } from "@/components/sections/Care";
import { Extras } from "@/components/sections/Extras";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Process />
      <Work />
      <Sectors />
      <Promises />
      <Why />
      <Fit />
      <Pricing />
      <Care />
      <Extras />
      <About />
      <Faq />
      <Contact />
    </main>
  );
}
