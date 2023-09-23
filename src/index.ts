import { config } from 'dotenv-flow';
config();

import crypto from 'crypto';
import express from 'express';
import { sendRaffleTweet } from './tweet.js';

const app = express();

app.use(express.json({ limit: '50mb' }));

const PORT = process.env.PORT || 8080;

const TEAM_ID = process.env.ALPHABOT_TEAM_ID;

app.post('/', async (req, res) => {
  // Always respond 200
  res.status(200).send(undefined);

  const hmac = crypto.createHmac('sha256', process.env.ALPHABOT_API_KEY!);

  const result = hmac.update(`${req.body.event}\n${req.body.timestamp}`);

  const hashToCheck = result.digest('hex');

  if (hashToCheck !== req.body.hash) {
    // Invalid hash! Do not trust this request!
    console.warn(
      'Invalid hash found! Request IP address:',
      req.socket.remoteAddress
    );
    return;
  }

  switch (req.body.event) {
    case 'raffle:active': {
      const { raffle } = req.body.data;

      if (
        (!TEAM_ID || raffle.teamId === TEAM_ID) &&
        raffle.visibility !== 'private'
      ) {
        console.log(
          `Raffle started for teamId=${raffle.teamId}. Sending tweet`,
          raffle.slug
        );
        await sendRaffleTweet(raffle);
      }
      break;
    }
  }
});

app.listen(PORT);

console.info(
  `Alphabot API Webhook Tweeter running on port ${PORT} :: Sending tweets for raffles posted by teamId=${TEAM_ID}`
);
