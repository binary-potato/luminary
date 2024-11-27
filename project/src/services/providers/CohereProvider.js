import { CohereClient } from 'cohere-ai';
import { validateApiKey } from '../../config/apiKeys.js';

class CohereProvider {
  constructor() {
    this.client = new CohereClient({
      token: validateApiKey('cohere')
    });
  }

  async generateResponse(prompt) {
    const response = await this.client.generate({
      prompt,
      model: 'command',
      maxTokens: 500
    });
    return response.generations[0].text;
  }
}

export default new CohereProvider();