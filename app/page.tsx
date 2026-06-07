import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import HojaDeVida from "./components/HojaDeVida";
import Propuestas from "./components/Propuestas";
import Contradicciones from "./components/Contradicciones";
import Controversias from "./components/Controversias";
import MitosYVerdades from "./components/MitosYVerdades";
import TablaComparativa from "./components/TablaComparativa";
import Apoyos from "./components/Apoyos";
import Footer from "./components/Footer";
import { CandidateToggleProvider } from "./components/CandidateToggleContext";
import CandidateToggle from "./components/CandidateToggle";
import ShareSystem from "./components/share/ShareSystem";
import ShareCTAInline from "./components/share/ShareCTAInline";

export default function Home() {
  return (
    <CandidateToggleProvider>
      <NavBar />
      <main>
        <HeroSection />
        <CandidateToggle />
        <HojaDeVida />
        <Propuestas />
        <Controversias />
        <MitosYVerdades />
        <Contradicciones />
        <TablaComparativa />
        <Apoyos />
        <section id="compartir" className="px-4 pb-16">
          <ShareCTAInline />
        </section>
      </main>
      <Footer />
      <ShareSystem />
    </CandidateToggleProvider>
  );
}
