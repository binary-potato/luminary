import OpenAI from 'openai';
import { validateApiKey } from '../../config/apiKeys.js';

class OpenAIProvider {
  constructor() {
    this.client = new OpenAI({
      apiKey: validateApiKey('openai')
    });
  }

  async generateResponse(prompt) {
    const response = await this.client.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000
    });
    return response.choices[0].message.content;
  }
}

export default new OpenAIProvider();