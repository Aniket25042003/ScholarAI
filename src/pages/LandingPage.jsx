import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import ExampleOutputSection from '../components/ExampleOutputSection';
import Footer from '../components/Footer';

const LandingPage = ({ onNavigate }) => {
  return (
    <>
      <HeroSection onNavigate={onNavigate} />
      <FeaturesSection />
      <ExampleOutputSection />
      <Footer />
    </>
  );
};

export default LandingPage;
