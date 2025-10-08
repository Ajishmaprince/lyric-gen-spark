import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export const Hero = ({ onScrollToGenerator }: { onScrollToGenerator: () => void }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"></div>
      </div>

      {/* Floating music notes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Music className="absolute top-20 left-10 w-8 h-8 text-primary/30 animate-float" style={{ animationDelay: '0s' }} />
        <Music className="absolute top-40 right-20 w-6 h-6 text-secondary/30 animate-float" style={{ animationDelay: '1s' }} />
        <Music className="absolute bottom-40 left-1/4 w-10 h-10 text-accent/30 animate-float" style={{ animationDelay: '2s' }} />
        <Music className="absolute top-1/3 right-1/3 w-7 h-7 text-primary/20 animate-float" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-display font-bold mb-6 gradient-text animate-glow">
          LyricGen AI
        </h1>
        <p className="text-2xl md:text-3xl text-foreground/80 mb-12 font-light">
          Turn your ideas into lyrics instantly.
        </p>
        <Button 
          onClick={onScrollToGenerator}
          size="lg"
          className="glow-button bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground text-lg px-10 py-6 rounded-full font-semibold shadow-2xl"
        >
          Try Lyric Generator
        </Button>
      </div>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};
