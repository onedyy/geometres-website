import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { Services } from "@/components/Services";
import { SurveyProcess } from "@/components/SurveyProcess";
import { TechnologyShowcase } from "@/components/TechnologyShowcase";
import { WorkOutputs } from "@/components/WorkOutputs";
import { WhyGeometres } from "@/components/WhyGeometres";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { RevealProvider } from "@/components/RevealProvider";

export default function HomePage() {
  return (
    <>
      <a href="#main" className="skip-link">
        Preskočiť na obsah
      </a>
      <Header />
      <main id="main">
        <Hero />
        <TrustStrip />
        <Services />
        <SurveyProcess />
        <TechnologyShowcase />
        <WorkOutputs />
        <WhyGeometres />
        <ContactSection />
      </main>
      <Footer />
      <RevealProvider />
    </>
  );
}
