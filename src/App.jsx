import React, { useState } from "react";
import Header from "./components/Header";
import ApiKeyInput from "./components/ApiKeyInput";
import ContractUpload from "./components/ContractUpload";
import ResultsDashboard from "./components/ResultsDashboard";
import { analyzeContract } from "./utils/analyzecontract";
import "./App.css";

function App() {
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);

  const handleContractSubmit = async (contractText) => {
    if (!apiKey) {
      setError("Please configure your Google Gemini API Key first.");
      return;
    }
    if (!contractText || contractText.trim() === "") {
      setError("Please provide or drop a valid contract to inspect.");
      return;
    }

    setLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const data = await analyzeContract(
        apiKey, 
        contractText, 
        (status) => setStatusText(status)
      );
      
      setAnalysisResult(data);
    } catch (err) {
      console.error("Gemini Engine Analysis Error:", err);
      setError(err.message || "An error occurred while compiling your contract analysis through Gemini.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-wrapper" style={{ minHeight: "100vh", background: "#0f172a", color: "#f8fafc" }}>
      <Header />

      <main style={{ maxWidth: "1000px", margin: "2rem auto", padding: "0 1rem" }}>
        {!analysisResult && (
          <ApiKeyInput apiKey={apiKey} onKeyChange={setApiKey} />
        )}

        {error && (
          <div style={{ padding: "12px 16px", background: "rgba(239, 68, 68, 0.15)", border: "1px solid #ef4444", borderRadius: "8px", color: "#fca5a5", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
            ⚠️ {error}
          </div>
        )}

        {!analysisResult ? (
          <ContractUpload 
            onSubmit={handleContractSubmit} 
            isLoading={loading} 
            statusText={statusText} 
          />
        ) : (
          <ResultsDashboard 
            data={analysisResult} 
            onReset={() => setAnalysisResult(null)} 
          />
        )}
      </main>
    </div>
  );
}

export default App;