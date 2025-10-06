import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_KEY);

export async function POST(req) {

  const { input, noteText, messages } = await req.json();

  const prompt = `
You are an assistant inside a note-taking app. The user may ask you questions with or without providing a text. 

IMPORTANT FORMATTING RULES:
NEVER use markdown formatting like **bold**, *italic*, or any other markdown symbols
For lists or multiple points, use proper line breaks and spacing only
Use normal text formatting with clear paragraph separation

Instructions: 
1. If the user greets you, greet them back and add "How can I assist you?" and do not add anything unless he asked something with greeting and if he adds something with greet then dont say how can I assist you just greet back and answer.
2. If text is provided, use that text to answer the question as well as add something by using your knowledge correctly. 
3. If text is not provided, answer the question using only the previous messages and the question itself as well as add something by using your knowledge correctly. Do not say "null" or mention missing text. 
4. If the answer has multiple points, write them with proper spacing and line breaks, but NO markdown symbols.
5. Do not add extra phrases like "Sure" or "Here is the answer". Just provide the answer directly. 
6. Always read and consider the previous messages before answering. 
7. If the question is unrelated to the note-taking app, then answer it correctly.
8. If user ask about something then not only give answer only from previous messages but also use your own knowledge to give a better answer correctly.
9. If the question is independent which mean not dependent on text then answer it as well.
10. STRICTLY avoid any markdown formatting, asterisks, or special symbols for emphasis.
11. Answer should be conscise unless asked for detailed one.

Question: ${input} 
Text: ${noteText === "null" ? "No text provided" : noteText} 
Previous messages: 
${messages.map(m => m.role + ": " + m.content).join("\n")} 

If the question is just greeting then greet back and add how can I assist you? and if question is not only greeting or not greeting then answer the question based on the text (if available) and the previous messages as well as use your own knowledge correctly and do not add greeting.
`;

    // try-catch ladder for different models

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return new NextResponse(JSON.stringify({ response: responseText }), { status: 200 });
  } catch (error) {
    try {

      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      return new NextResponse(JSON.stringify({ response: responseText }), { status: 200 });
    } catch (error) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        return new NextResponse(JSON.stringify({ response: responseText }), { status: 200 });
      } catch (error) {
        try {
          const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

          const result = await model.generateContent(prompt);
          const responseText = result.response.text();

          return new NextResponse(JSON.stringify({ response: responseText }), { status: 200 });
        } catch (error) {
          try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

            const result = await model.generateContent(prompt);
            const responseText = result.response.text();

            return new NextResponse(JSON.stringify({ response: responseText }), { status: 200 });
          } catch (error) {
            try {
              const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

              const result = await model.generateContent(prompt);
              const responseText = result.response.text();

              return new NextResponse(JSON.stringify({ response: responseText }), { status: 200 });
            } catch (error) {
              console.error("Retry AI Error:", error);
              return new NextResponse(JSON.stringify({ reply: "⚠️ Error from AI" }), { status: 500 });
            }
          }
        }
      }
    }
  }
}