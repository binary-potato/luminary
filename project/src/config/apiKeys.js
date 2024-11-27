import dotenv from 'dotenv';
dotenv.config();

export const apiKeys = {
  openai: process.env.OPENAI_API_KEY,
  anthropic: process.env.ANTHROPIC_API_KEY,
  gemini: process.env.GEMINI_API_KEY,
  mistral: process.env.MISTRAL_API_KEY,
  cohere: process.env.COHERE_API_KEY,
  openrouter: process.env.OPENROUTER_API_KEY,
  groq: process.env.GROQ_API_KEY,
  llama: process.env.LLAMA_API_KEY,
  huggingface: process.env.HUGGINGFACE_API_KEY,
  serpapi: process.env.SERPAPI_API_KEY,
  sambanova: process.env.SAMBANOVA_API_KEY,
  stablediffusion: process.env.STABLEDIFFUSION_API_KEY,
  aiml: process.env.AIML_API_KEY,
  mistralCodestral: process.env.MISTRAL_CODESTRAL_API_KEY,
  grok: process.env.GROK_API_KEY,
  jamba: process.env.JAMBA_API_KEY
};

export const validateApiKey = (provider) => {
  const apiKey = apiKeys[provider];
  if (!apiKey) {
    throw new Error(`Missing API key for provider: ${provider}`);
  }
  return apiKey;
};