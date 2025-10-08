import { Button } from "@/components/ui/button";
import { Music, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { useEffect, useState } from "react";

export const Hero = ({ onScrollToGenerator }: { onScrollToGenerator: () => void }) => {
  const [sparkles, setSparkles] = useState<Array<{ id: number; left: string; delay: string }>>([]);

  useEffect(() => {
    // Create sparkles
    const newSparkles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background"></div>
      </div>

      {/* Sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="sparkle"
            style={{
              left: sparkle.left,
              bottom: '0',
              animationDelay: sparkle.delay,
            }}
          />
        ))}
      </div>

      {/* Floating music notes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Music className="absolute top-20 left-10 w-8 h-8 text-primary/40 animate-float" style={{ animationDelay: '0s' }} />
        <Music className="absolute top-40 right-20 w-6 h-6 text-secondary/40 animate-float" style={{ animationDelay: '1s' }} />
        <Music className="absolute bottom-40 left-1/4 w-10 h-10 text-accent/40 animate-float" style={{ animationDelay: '2s' }} />
        <Music className="absolute top-1/3 right-1/3 w-7 h-7 text-primary/30 animate-float" style={{ animationDelay: '0.5s' }} />
        <Sparkles className="absolute top-1/4 left-1/2 w-8 h-8 text-secondary/30 animate-glow" />
        <Sparkles className="absolute bottom-1/3 right-1/4 w-6 h-6 text-accent/30 animate-glow" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-display font-bold mb-6 gradient-text animate-glow shimmer">
          LyricGen AI
        </h1>
        <p className="text-2xl md:text-3xl text-foreground/90 mb-12 font-light">
          Turn your ideas into lyrics instantly.
        </p>
        <Button 
          onClick={onScrollToGenerator}
          size="lg"
          className="glow-button shimmer bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground text-lg px-10 py-6 rounded-full font-semibold shadow-2xl"
        >
          Try Lyric Generator
        </Button>
      </div>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};
