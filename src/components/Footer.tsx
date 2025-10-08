import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";

export const Footer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! I'll get back to you soon.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <footer className="relative py-20 px-6 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 animate-glow"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass-card rounded-3xl p-8">
            <h3 className="text-3xl font-display font-bold gradient-text mb-6">
              Get in Touch
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-input/50 border-border/50"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-input/50 border-border/50"
              />
              <Textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="bg-input/50 border-border/50 min-h-[120px]"
              />
              <Button
                type="submit"
                className="w-full glow-button bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Social Links */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h3 className="text-3xl font-display font-bold gradient-text mb-6">
                Connect With Me
              </h3>
              <p className="text-foreground/70 mb-8">
                Let's collaborate and create something amazing together!
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="https://www.linkedin.com/in/ajishma-sruthi-b83483338"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 glass-card rounded-xl p-4 hover:scale-105 transition-transform duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-[#0A66C2] flex items-center justify-center">
                  <Linkedin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">LinkedIn</div>
                  <div className="text-sm text-muted-foreground">Connect professionally</div>
                </div>
              </a>

              <a
                href="https://github.com/Ajishmaprince"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 glass-card rounded-xl p-4 hover:scale-105 transition-transform duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-[#181717] flex items-center justify-center">
                  <Github className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">GitHub</div>
                  <div className="text-sm text-muted-foreground">View my projects</div>
                </div>
              </a>

              <a
                href="mailto:contact@example.com"
                className="flex items-center gap-4 glass-card rounded-xl p-4 hover:scale-105 transition-transform duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Email</div>
                  <div className="text-sm text-muted-foreground">Drop me a message</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-border/30 text-center text-muted-foreground">
          <p>&copy; 2025 LyricGen AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
