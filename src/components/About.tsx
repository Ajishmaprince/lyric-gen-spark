import workspaceImg from "@/assets/workspace.jpg";

export const About = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <img
              src={workspaceImg}
              alt="Creative workspace with laptop and music equipment"
              className="rounded-3xl shadow-2xl w-full h-auto"
            />
          </div>

          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text">
              About LyricGen AI
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed">
              LyricGen AI is an innovative AI-powered songwriting assistant designed to help musicians, 
              songwriters, and creative minds generate unique lyrics instantly. Whether you're experiencing 
              writer's block or seeking fresh inspiration, our advanced AI understands your creative vision 
              and transforms it into beautiful, original lyrics.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              Built with cutting-edge AI technology, LyricGen AI supports multiple languages, various 
              musical genres, and different moods. With features like voice output and customizable 
              rhyming schemes, creating the perfect lyrics has never been easier.
            </p>
            <div className="pt-6">
              <p className="text-sm text-muted-foreground">
                Developed as a portfolio project showcasing full-stack development skills, 
                AI integration, and modern web technologies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
