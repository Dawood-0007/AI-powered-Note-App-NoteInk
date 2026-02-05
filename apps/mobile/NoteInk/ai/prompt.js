async function main(textQuestion, text, previousMessages, title) {
  try {

    const res = await fetch("https://noteink-web.vercel.app/api/AIPrompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: textQuestion, noteText: text, messages: previousMessages, title }),
      });

      const dataRespone = await res.json();

      const aiMessage = dataRespone?.response || "No response from AI";

    return aiMessage;
  } catch (error) {
    console.error("An error occurred while generating content:", error);
    return "Error: Could not generate content.";
  }
}

export default main;