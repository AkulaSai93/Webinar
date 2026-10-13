import Agenda from "@/components/Agenda";
import CostOfWaiting from "@/components/CostOfWaiting";
import DreamBig from "@/components/DreamBig";
import Electricity from "@/components/Electricity";
import Gap from "@/components/Gap";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Mentor from "@/components/Mentor";
import Navbar from "@/components/Navbar";
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
        <Walls />
        <Gap />
        <Electricity />
        <CostOfWaiting />
        <WhyAttend />
        <Mentor />
        <Agenda />
      </main>
    </>
  );
}
