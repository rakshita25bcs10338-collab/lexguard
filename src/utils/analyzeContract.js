import { SYSTEM_PROMPT } from "../constants/prompts";

export async function analyzeContract(apiKey, text, onStatus) {
  onStatus("Reading your contract...");

  const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Analyze this contract:\n\n${text.slice(0, 15000)}` }
      ],
      temperature: 0.2,
      max_tokens: 3000,
    }),
  });

  onStatus("Identifying risks...");

  const data = await resp.json();
  if (!resp.ok) throw new Error(data.error?.message || "API error");

  const raw = data.choices[0].message.content
    .trim().replace(/```json|```/g, "").trim();

  onStatus("Building your report...");
  return JSON.parse(raw);
}