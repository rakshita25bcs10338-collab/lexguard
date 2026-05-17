export const analyzeContract = async (contractText, apiKey) => {
  if (!apiKey || !apiKey.trim()) {
    throw new Error("Missing Gemini API Key.");
  }

  // Automatically cleans up any whitespace or newline breaks from copying
  const cleanKey = apiKey.trim().replace(/[\n\r\s]/g, "");

  // Hits the stable Gemini 1.5 Flash production endpoint safely
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${cleanKey}`;

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: `You are a contract legal analyst engine. Review this text for risk flags and scoring metrics:\n\n"${contractText}"\n\nReturn your analysis response strictly following this JSON layout template without markdown wrappers:\n{\n  "riskScore": 75,\n  "riskLevel": "High",\n  "keyConcerns": ["Severe indemnity clauses", "Vague termination timelines"],\n  "recommendation": "Negotiate a fixed penalty cap instead of an open liability model."\n}`
          }
        ]
      }
    ],
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.2
    }
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || "Analysis processing error.");
  }

  const data = await response.json();
  let textPayload = data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

  if (textPayload.includes("```")) {
    textPayload = textPayload.replace(/```json|```/g, "").trim();
  }

  return JSON.parse(textPayload);
};