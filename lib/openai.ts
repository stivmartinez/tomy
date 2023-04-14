const OPENAI_API_KEY = "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";

export async function generateText(prompt) {
  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 1000,
        temperature: 0.7,
        n: 1,
      }),
    });

    if (!response.ok) {
      console.log(response.status)
    }

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      return data.choices[0].text;
    } else {
      throw new Error("No generated text found in the API response");
    }
  } catch (error) {
    console.error("Error fetching AI generated text:", error);
    throw error;
  }
}

