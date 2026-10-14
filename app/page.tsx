import Agenda from "@/components/Agenda";
import DreamBig from "@/components/DreamBig";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import Gap from "@/components/Gap";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Mentor from "@/components/Mentor";
import Navbar from "@/components/Navbar";
import Questions from "@/components/Questions";
import StickyCta from "@/components/StickyCta";
import Walls from "@/components/Walls";
import WhyAttend from "@/components/WhyAttend";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Questions />
        <Mentor />
        <Agenda />
        <DreamBig />
        <Walls />
        <Gap />
        <WhyAttend />
        <FinalCta />
        <Faq />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
