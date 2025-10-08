export const TechStack = () => {
  const technologies = [
    { name: "React.js", color: "from-[#61DAFB] to-[#00D8FF]" },
    { name: "Tailwind CSS", color: "from-[#06B6D4] to-[#0284C7]" },
    { name: "Node.js", color: "from-[#68A063] to-[#3C873A]" },
    { name: "GPT AI", color: "from-[#10A37F] to-[#1A7F64]" },
    { name: "TypeScript", color: "from-[#3178C6] to-[#235A97]" },
    { name: "Supabase", color: "from-[#3ECF8E] to-[#2E9C6D]" },
  ];

  return (
    <section className="py-20 px-6 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16 gradient-text">
          Tech Stack
        </h2>

        <div className="flex flex-wrap justify-center gap-8">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="group relative"
            >
              <div className={`glass-card rounded-2xl px-8 py-6 hover:scale-110 transition-all duration-300 cursor-pointer`}>
                <div className={`text-xl font-display font-semibold bg-gradient-to-r ${tech.color} bg-clip-text text-transparent`}>
                  {tech.name}
                </div>
              </div>
              <div className={`absolute inset-0 bg-gradient-to-r ${tech.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
