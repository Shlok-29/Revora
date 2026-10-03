import fs from 'node:fs';

if (typeof process.loadEnvFile === 'function' && fs.existsSync('.env')) {
  try {
    process.loadEnvFile();
  } catch (err) {
    console.warn('Could not load .env file:', err.message);
  }
}

import app from './app.js';

const port = Number(process.env.PORT || 3000);
app.listen(port, '0.0.0.0', () => {
  console.log(`REVORA listening on http://0.0.0.0:${port}`);
});
