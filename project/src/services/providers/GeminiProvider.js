import { GoogleGenerativeAI } from '@google/generative-ai';
import { validateApiKey } from '../../config/apiKeys.js';

class GeminiProvider {
  constructor() {
    this.client = new GoogleGenerativeAI(validateApiKey('gemini'));
  }

  async generateResponse(prompt) {
    const model = this.client.getGenerativeModel({ model: 'gemini-pro' });
    const response = await model.generateContent(prompt);
    return response.response.text();
  }
}

export default new GeminiProvider();