import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import ExampleOutputSection from "../components/ExampleOutputSection";
import Footer from "../components/Footer";

export default function LandingPage({ onNavigate }) {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ExampleOutputSection />
      <Footer />
    </>
  );
}
