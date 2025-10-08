import { Music, Palette, Save, Globe } from "lucide-react";

const features = [
  {
    icon: Music,
    title: "Instant Lyric Generation",
    description: "AI-powered lyrics in seconds based on your preferences",
  },
  {
    icon: Palette,
    title: "Mood & Genre Detection",
    description: "Tailored lyrics matching your desired tone and style",
  },
  {
    icon: Save,
    title: "Save or Export Lyrics",
    description: "Download and save your creations for later use",
  },
  {
    icon: Globe,
    title: "Multi-language Support",
    description: "Generate lyrics in English, Hindi, Spanish, Tamil, and Malayalam",
  },
];

export const Features = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16 gradient-text">
          Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-6 hover:scale-105 transition-transform duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center mb-4">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
