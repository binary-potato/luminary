import express from 'express';
import { authenticate } from '../middleware/auth.js';
import AIService from '../services/AIService.js';

const router = express.Router();

router.get('/models', authenticate, (req, res) => {
  const models = AIService.getAvailableModels();
  res.json({ models });
});

router.post('/chat', authenticate, async (req, res) => {
  try {
    const { prompt, model } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const response = await AIService.generateResponse(prompt, model);
    res.json({ response });
  } catch (error) {
    if (error.message.includes('Configuration error')) {
      res.status(503).json({ error: error.message });
    } else if (error.message.includes('Unsupported model')) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

export default router;