import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Mic, Volume2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const LyricGenerator = () => {
  const [topic, setTopic] = useState("");
  const [genre, setGenre] = useState("pop");
  const [mood, setMood] = useState("happy");
  const [userLyrics, setUserLyrics] = useState("");
  const [language, setLanguage] = useState("english");
  const [rhymeScheme, setRhymeScheme] = useState("aabb");
  const [wordsPerLine, setWordsPerLine] = useState([8]);
  const [generatedLyrics, setGeneratedLyrics] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic for your lyrics");
      return;
    }

    setIsGenerating(true);
    setGeneratedLyrics("");

    try {
      const { data, error } = await supabase.functions.invoke("generate-lyrics", {
        body: {
          topic,
          genre,
          mood,
          userLyrics,
          language,
          rhymeScheme,
          wordsPerLine: wordsPerLine[0],
        },
      });

      if (error) throw error;

      setGeneratedLyrics(data.lyrics);
      toast.success("Lyrics generated successfully!");
    } catch (error: any) {
      console.error("Error generating lyrics:", error);
      toast.error(error.message || "Failed to generate lyrics");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePlayAudio = async () => {
    if (!generatedLyrics) {
      toast.error("Generate lyrics first!");
      return;
    }

    setIsPlaying(true);

    try {
      const { data, error } = await supabase.functions.invoke("text-to-speech", {
        body: {
          text: generatedLyrics,
          language,
        },
      });

      if (error) throw error;

      // Play the audio
      const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
      audio.onended = () => setIsPlaying(false);
      audio.play();
      
      toast.success("Playing lyrics!");
    } catch (error: any) {
      console.error("Error playing audio:", error);
      toast.error(error.message || "Failed to play audio");
      setIsPlaying(false);
    }
  };

  return (
    <section id="generator" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Generator Panel */}
          <div className="glass-card rounded-3xl p-8 space-y-6">
            <h2 className="text-3xl font-display font-bold gradient-text mb-6">
              🎵 Lyric Generator
            </h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="topic" className="text-foreground/90">Write Lyrics About...</Label>
                <Input
                  id="topic"
                  placeholder="e.g., Summer dreams, heartbreak, adventure..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="mt-2 bg-input/50 border-border/50 focus:border-primary"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="genre" className="text-foreground/90">Song Genre</Label>
                  <Select value={genre} onValueChange={setGenre}>
                    <SelectTrigger id="genre" className="mt-2 bg-input/50 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pop">Pop</SelectItem>
                      <SelectItem value="rock">Rock</SelectItem>
                      <SelectItem value="hip-hop">Hip-Hop</SelectItem>
                      <SelectItem value="country">Country</SelectItem>
                      <SelectItem value="jazz">Jazz</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="mood" className="text-foreground/90">Mood or Tone</Label>
                  <Select value={mood} onValueChange={setMood}>
                    <SelectTrigger id="mood" className="mt-2 bg-input/50 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="happy">Happy</SelectItem>
                      <SelectItem value="sad">Sad</SelectItem>
                      <SelectItem value="romantic">Romantic</SelectItem>
                      <SelectItem value="chill">Chill</SelectItem>
                      <SelectItem value="motivational">Motivational</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="userLyrics" className="text-foreground/90">Any lyrics in your mind?</Label>
                <Textarea
                  id="userLyrics"
                  placeholder="Start with some lines you already have..."
                  value={userLyrics}
                  onChange={(e) => setUserLyrics(e.target.value)}
                  className="mt-2 bg-input/50 border-border/50 focus:border-primary min-h-[100px]"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="language" className="text-foreground/90">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language" className="mt-2 bg-input/50 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="tamil">Tamil</SelectItem>
                      <SelectItem value="malayalam">Malayalam</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="rhyme" className="text-foreground/90">Rhyming Scheme</Label>
                  <Select value={rhymeScheme} onValueChange={setRhymeScheme}>
                    <SelectTrigger id="rhyme" className="mt-2 bg-input/50 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aabb">AABB</SelectItem>
                      <SelectItem value="abab">ABAB</SelectItem>
                      <SelectItem value="free">Free Verse</SelectItem>
                      <SelectItem value="random">Random</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-foreground/90">Words per line: {wordsPerLine[0]}</Label>
                <Slider
                  value={wordsPerLine}
                  onValueChange={setWordsPerLine}
                  min={1}
                  max={15}
                  step={1}
                  className="mt-3"
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full glow-button bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground text-lg py-6 rounded-xl font-semibold"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Mic className="mr-2 h-5 w-5" />
                    Generate Lyrics 🎤
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Results Panel */}
          <div className="glass-card rounded-3xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-display font-bold gradient-text">
                Generated Lyrics
              </h3>
              {generatedLyrics && (
                <Button
                  onClick={handlePlayAudio}
                  disabled={isPlaying}
                  variant="outline"
                  size="sm"
                  className="border-primary/50 hover:bg-primary/10"
                >
                  {isPlaying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Playing...
                    </>
                  ) : (
                    <>
                      <Volume2 className="mr-2 h-4 w-4" />
                      Play Audio
                    </>
                  )}
                </Button>
              )}
            </div>

            <div className="min-h-[400px] bg-muted/30 rounded-xl p-6 border border-border/30">
              {generatedLyrics ? (
                <pre className="whitespace-pre-wrap font-sans text-foreground/90 leading-relaxed">
                  {generatedLyrics}
                </pre>
              ) : (
                <p className="text-muted-foreground text-center mt-20">
                  Your generated lyrics will appear here...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
