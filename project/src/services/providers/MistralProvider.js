import MistralClient from '@mistralai/mistralai';
import { validateApiKey } from '../../config/apiKeys.js';

class MistralProvider {
  constructor() {
    this.client = new MistralClient(validateApiKey('mistral'));
  }

  async generateResponse(prompt) {
    const response = await this.client.chat({
      model: 'mistral-large-latest',
      messages: [{ role: 'user', content: prompt }]
    });
    return response.choices[0].message.content;
  }
}

export default new MistralProvider();