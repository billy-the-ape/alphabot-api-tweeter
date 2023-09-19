import crypto from 'crypto';
import { config } from 'dotenv-flow';
import express from 'express';

config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 8080

app.post('/', async (req, res) => {
  // Always respond 200
  res.status(200).send(undefined);

  const hmac = crypto.createHmac('sha256', process.env.ALPHABOT_API_KEY!);

  const result = hmac.update(`${req.body.event}\n${req.body.timestamp}`);

  const hashToCheck = result.digest('hex');

  if (hashToCheck !== req.body.hash) {
    // Invalid hash! Do not trust this request!
    console.warn('Invalid hash found! Request IP address:', req.socket.remoteAddress);
    return;
  }
  
  console.log(`===== ${req.body.event} =====`);
  console.log(JSON.stringify(req.body, null, 2))
  console.log(`==== /${req.body.event} =====`);

  switch (req.body.event) {
    // Add your own logic based on event types
    // https://api.alphabot.app/v1#tag/Webhooks
    case 'raffle:active': {
      console.log('Raffle started!');
      break;
    }
    case 'raffle:edited': {
      console.log('Raffle edited!');
      break;
    }
    case 'raffle:deleted': {
      console.log('Raffle deleted!');
      break;
    }
    case 'raffle:ended': {
      console.log('Raffle ended!');
      break;
    }
  }
});

app.listen(port);

console.info(`Alphabot API Webhook example running on port ${port}`);