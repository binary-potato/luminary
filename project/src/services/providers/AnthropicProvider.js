import Anthropic from '@anthropic-ai/sdk';
import { validateApiKey } from '../../config/apiKeys.js';

class AnthropicProvider {
  constructor() {
    this.client = new Anthropic({
      apiKey: validateApiKey('anthropic')
    });
  }

  async generateResponse(prompt) {
    const response = await this.client.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }]
    });
    return response.content;
  }
}

export default new AnthropicProvider();