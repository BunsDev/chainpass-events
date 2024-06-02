const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(req) {
  const { prompt } = await req.json();

  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-instruct",
        prompt: `Refine the following prompt to make it more suitable for generating an image: ${prompt}`,
        max_tokens: 100,
      }),
    });

    const data = await response.json();

    const refinedPrompt = data.choices[0].text.trim();
    return new Response(JSON.stringify({ refinedPrompt }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}
