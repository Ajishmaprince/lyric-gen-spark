import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic, genre, mood, userLyrics, language, rhymeScheme, wordsPerLine } = await req.json();

    if (!topic) {
      throw new Error('Topic is required');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Build the prompt for lyric generation
    const systemPrompt = `You are a professional songwriter and lyricist. Generate creative, original song lyrics based on the user's specifications. Follow these guidelines:
- Match the requested genre, mood, and language
- Use the specified rhyming scheme
- Keep lines to approximately ${wordsPerLine} words each
- Make lyrics meaningful, poetic, and emotionally resonant
- If user provides starting lyrics, continue from there naturally
- Include verse-chorus structure when appropriate`;

    const userPrompt = `Create song lyrics with these specifications:
Topic: ${topic}
Genre: ${genre}
Mood: ${mood}
Language: ${language}
Rhyme Scheme: ${rhymeScheme}
Words per line: ${wordsPerLine}
${userLyrics ? `Starting lyrics to build upon:\n${userLyrics}` : ''}

Generate complete, polished lyrics that capture the essence of the topic with creativity and emotion.`;

    console.log('Generating lyrics with Lovable AI...');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error(`AI generation failed: ${response.status}`);
    }

    const data = await response.json();
    const lyrics = data.choices[0].message.content;

    console.log('Lyrics generated successfully');

    return new Response(
      JSON.stringify({ lyrics }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in generate-lyrics function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
