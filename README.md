# alphabot-api-example

Uses 

Install [ngrok](https://ngrok.com/) or your own local web service engine to 

1. Copy `.env.local.example` and paste, removing `.example` from the file name
2. Populate the `ALPHABOT_API_KEY` in the new file with your value from your [Alphabot profile](https://alphabot.app/#profile-developer)
3. Run `yarn && yarn build && yarn start` - run the server at port 8080
4. Run `ngrok http 8080` in another terminal, after setting up a free [ngrok](https://ngrok.com/) account (or your choice of localhost tunneling services) to make your webhook a public URL on the internet.
5. Copy the Forwarding url (should end with .ngrok-free.app) and paste it into your Webhook url in your [Alphabot profile](https://alphabot.app/#profile-developer)
6. You are now receiving Alphabot webhooks and receiving real time data updates. Congratulations!