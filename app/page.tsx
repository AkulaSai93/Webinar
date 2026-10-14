import Agenda from "@/components/Agenda";
import CostOfWaiting from "@/components/CostOfWaiting";
import DreamBig from "@/components/DreamBig";
import Electricity from "@/components/Electricity";
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
        <DreamBig />
        <Mentor />
        <Walls />
        <Gap />
        <Electricity />
        <CostOfWaiting />
        <WhyAttend />
        <Agenda />
        <Questions />
        <FinalCta />
        <Faq />
      </main>
      <Footer />
      {/* room for the sticky bar so it never covers the last line */}
      <div aria-hidden className="h-[76px] bg-[#f3f4f6] lg:hidden" />
      <StickyCta />
    </>
  );
}
