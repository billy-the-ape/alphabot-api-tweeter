# alphabot-api-tweeter

Feel free to fork this and modify the `src/tweets.ts` file to format the tweets to your liking. Enjoy!

You can easily run this at render.com at the free tier

_Note: Twitter's API only allows for 50 Tweets to be sent per day on the free tier_

## Setup Alphabot Webhook:

Install [ngrok](https://ngrok.com/) or your own local web service engine to 

1. Copy `.env.local.example` and paste, removing `.example` from the file name
2. Populate the `ALPHABOT_API_KEY` in the new file with your value from your [Alphabot profile](https://alphabot.app/#profile-developer) or [Team Page](https://alphabot.app/team#developer)
3. Copy your team's ID from the end of the [Team Page](https://alphabot.app/team) URL. It will look like `6259d10fd0728949c4ac0520`. Paste this into the `ALPHABOT_TEAM_ID` value.
4. Run `ngrok http 8080` in another terminal, after setting up a free [ngrok](https://ngrok.com/) account (or your choice of localhost tunneling services) to make your webhook a public URL on the internet.
5. Copy the Forwarding url (should end with .ngrok-free.app) and paste it into your Webhook url in your [Alphabot profile](https://alphabot.app/#profile-developer)

## Setup Twitter API

1. Activate the Twitter account you wish to tweet from as a Developer account at https://developer.twitter.com and set up a project + app
2. Click to the "Keys & Tokens" tab
3. You will need to populate the `TWITTER_` env variables in your `.env.local` file with the corresponding keys from this page.

## Run the app

Run `yarn && yarn build && yarn start` to start running the app.

**You are now receiving Alphabot webhooks and sending tweets when your team's raffles are created. Congratulations!**

