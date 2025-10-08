import { useRef } from "react";
import { Hero } from "@/components/Hero";
import { LyricGenerator } from "@/components/LyricGenerator";
import { Features } from "@/components/Features";
import { About } from "@/components/About";
import { TechStack } from "@/components/TechStack";
import { Footer } from "@/components/Footer";

const Index = () => {
  const generatorRef = useRef<HTMLDivElement>(null);

  const scrollToGenerator = () => {
    generatorRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Hero onScrollToGenerator={scrollToGenerator} />
      <div ref={generatorRef}>
        <LyricGenerator />
      </div>
      <Features />
      <About />
      <TechStack />
      <Footer />
    </div>
  );
};

export default Index;
