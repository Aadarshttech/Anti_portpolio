import FloatingHearts from "@/components/FloatingHearts";
import MusicToggle from "@/components/MusicToggle";
import HeroSection from "@/components/HeroSection";
import MemoryTimeline from "@/components/MemoryTimeline";
import LoveNotes from "@/components/LoveNotes";
import ProposalLetter from "@/components/ProposalLetter";
import CelebrationSection from "@/components/CelebrationSection";

const Index = () => {
  return (
    <main className="relative overflow-x-hidden scroll-smooth">
      <FloatingHearts />
      <MusicToggle />
      <HeroSection />
      <MemoryTimeline />
      <LoveNotes />
      <ProposalLetter />
      <CelebrationSection />
    </main>
  );
};

export default Index;
