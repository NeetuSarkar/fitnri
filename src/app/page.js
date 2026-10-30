import AboutCoach from "@/components/home/AboutCoach";
import Challenges from "@/components/home/Challanges";
import CoachingSolution from "@/components/home/CoachingSolution";
import FAQ from "@/components/home/FAQ";
import FinalCTA from "@/components/home/FinalCTA";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Pricing from "@/components/home/Pricing";
import Testimonials from "@/components/home/Testimonials";
import WhoWeHelp from "@/components/home/WhoWeHelp";

export default function Home() {
  return (
    <>
      <Hero />
      <Challenges />
      <CoachingSolution />
      <HowItWorks />
      <Pricing />
      <WhoWeHelp />
      <AboutCoach />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
