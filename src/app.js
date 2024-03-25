import express from 'express';
import router from './routes/index.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`mi vaquita server is running on  http://localhost:${PORT} `);
});
