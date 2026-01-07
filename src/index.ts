import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { rolesRouter } from './routes/roles.routes';

// hide the api key by placing it in the home folder or github actions such as secrets.OPENAI_API_KEY
// Load environment variables
const homeEnvPath = path.join(os.homedir(), '.openai.env');

if (fs.existsSync(homeEnvPath)) {
  dotenv.config({ path: homeEnvPath });
  console.log(`Loaded OpenAI key from ${homeEnvPath}`);
} else {
  dotenv.config(); // fallback to project .env or CI env
  console.log('Loaded OpenAI key from project env or CI environment');
}

// ---------- Verify key ----------
if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY is missing! Set it in ~/.openai.env or CI environment.');
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/roles', rolesRouter);

app.listen(process.env.PORT, () => {
  console.log('OpenAI backend running on port 3000');
});