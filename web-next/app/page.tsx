import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Fit } from "@/components/sections/Fit";
import { Why } from "@/components/sections/Why";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Process />
      <Fit />
      <Why />
    </main>
  );
}
