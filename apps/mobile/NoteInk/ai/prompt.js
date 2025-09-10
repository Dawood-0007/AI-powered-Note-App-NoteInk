const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;


async function main(textQuestion, text, previousMessages) {
  try {

    const prompt = `
    You are an assistant inside a note-taking app. The user may ask you questions with or without providing a text.  

Instructions:  
1. If the user greets you, greet them back and add "How can I assist you?" and do not add anything unless he asked something with greeting and if he adds something with greet then dont say how can I asisst you just greet back and answer.
2. If text is provided, use that text to answer the question as well as add something by using your knowledge correctly.  
3. If text is not provided, answer the question using only the previous messages and the question itself as well as add something by using your knowledge correctly. Do not say "null" or mention missing text.  
4. If the answer has multiple points, write them in separate lines.  
5. Do not add extra phrases like "Sure" or "Here is the answer". Just provide the answer directly.  
6. Always read and consider the previous messages before answering.  
7. If the question is unrelated to the note-taking app, then answer it correctly.
8. if user ask about something then not only give answer only from previous messages but also use your own knowledge to give a better answer correctly.
9. If the question is independent which mean not dependent on text then answer it as well.

Question: ${textQuestion}  
Text: ${text === "null" ? "No text provided" : text}  
Previous messages:  
${previousMessages.map(m => m.role + ": " + m.content).join("\n")}  

if the question is just greeting then greet back and add how can I assist you? and if question is not only greeting or not greeting then answer the question based on the text (if available) and the previous messages as well as use your own knowledge correctly and do not add greeting.
    `;

    console.log("Prompt sent to API:", prompt)
      console.log("GEMINI_API_KEY:", GEMINI_API_KEY)

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
  } catch (error) {
    console.error("An error occurred while generating content:", error);
    return "Error: Could not generate content.";
  }
}

export default main;