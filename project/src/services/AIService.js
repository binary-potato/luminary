import anthropicProvider from './providers/AnthropicProvider.js';
import geminiProvider from './providers/GeminiProvider.js';
import mistralProvider from './providers/MistralProvider.js';
import cohereProvider from './providers/CohereProvider.js';
import openaiProvider from './providers/OpenAIProvider.js';

class AIService {
  constructor() {
    this.providers = {
      anthropic: anthropicProvider,
      gemini: geminiProvider,
      mistral: mistralProvider,
      cohere: cohereProvider,
      openai: openaiProvider
    };
  }

  async generateResponse(prompt, model = 'anthropic') {
    try {
      const provider = this.providers[model.toLowerCase()];
      if (!provider) {
        throw new Error(`Unsupported model: ${model}. Available models: ${Object.keys(this.providers).join(', ')}`);
      }
      return await provider.generateResponse(prompt);
    } catch (error) {
      if (error.message.includes('Missing API key')) {
        throw new Error(`Configuration error: ${error.message}. Please check your environment variables.`);
      }
      console.error('Error generating response:', error);
      throw new Error(`Failed to generate response: ${error.message}`);
    }
  }

  getAvailableModels() {
    return Object.keys(this.providers);
  }
}

export default new AIService();