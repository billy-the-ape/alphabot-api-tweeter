import { TwitterApi } from 'twitter-api-v2';

const ONE_MINUTE = 60000;
const ONE_HOUR = 3600000;
const ONE_DAY = 86400000;

const getDateDifference = ({
  startDate,
  endDate,
}: {
  startDate: number;
  endDate: number;
}) => {
  const dt = new Intl.RelativeTimeFormat('en-us', { numeric: 'auto' });
  const diff = endDate - startDate;

  if (diff > ONE_DAY) {
    return dt.format(Math.round(diff / ONE_DAY), 'days');
  }

  if (diff > ONE_HOUR) {
    return dt.format(Math.round(diff / ONE_HOUR), 'hours');
  }

  return dt.format(Math.round(diff / ONE_MINUTE), 'minutes');
};

export const sendRaffleTweet = async (raffle: any) => {
  const client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY!,
    appSecret: process.env.TWITTER_API_KEY_SECRET!,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });

  const handle = raffle.twitterUrl
    .split('?')[0]
    .replace('https://twitter.com/', '@');

  await client.v2.tweet(
    `New Alphabot ${raffle.type} posted${
      handle ? ` with ${handle}` : ''
    }\n\n✨ ${raffle.name} ✨\n\n🏆 ${
      raffle.winnerCount
    } winners\n⏰ Ends ${getDateDifference(
      raffle
    )}\n\nEnter below 👇 https://alphabot.app/${raffle.slug}`
  );
};
