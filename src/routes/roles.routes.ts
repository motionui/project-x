import { Router } from 'express';
import { generateText } from '../openai.service';

export const rolesRouter = Router();

rolesRouter.post('/generateRoleDescription', async (req, res) => {
  try {
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({ error: 'Role is required' });
    }

    const prompt = `Write a short role description for a '${role}'`;
    const result = await generateText(prompt);
    res.json({ result });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'OpenAI request failed' });
  }
});