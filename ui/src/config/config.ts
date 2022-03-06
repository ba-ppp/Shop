// STAGING LOCAL
const dev = {
  apiGateway: {
    URL: "https://localhost:8080",
  },
  WEBSOCKET_URL: "wss://ws.voice-intellect.com/v2",
  LINKEDIN_REDIRECT_URL: "http://localhost:3000/linkedin",
  LINKEDIN_CLIENT_ID: "865va5wg7qq0mw",
  DOMAIN_NAME: "sonnant.cf",
  STRIPE_P_KEY:
    "pk_test_51I3VwJHecKqeF9LIKU5aiG1TXFEDb2mVx93o5n4mHTIvazPqqSEZTfm7oj3vr5gIQUtuEJ3kg1BH5wpyKb1tXBd700mTlGUgcP",
  TWITTER_REDIRECT_URL: "http://localhost:3000/twitter",
  TWITTER_CONSUMER_KEY: "VDyXhA5MQ8SQT5r2pP8c90VON",
  TWITTER_CONSUMER_SECRET: "Hhi5yGInGaqFZRiPjnbsEJGKA1oXo5Hn8x2NBohaNFXPFcdwSs",
  UPPY_COMPANION_URL: "https://companion.sonnant.xyz",
  FB_CLIENT_ID: "378938290607567",
  FB_CLIENT_SECRET: "b45937280e994b8297a88cf17d8fdc1d",
  FB_REDIRECT_URL: "https://sonnant.cf/facebook",
  YT_CLIENT_ID:
    "692875910345-3k2lghbp06t7jq7hi41djmr30hs155gc.apps.googleusercontent.com",
  YT_REDIRECT_URL: "https://sonnant.cf/youtube",
  APPLE_CLIENT_ID: "ai.sonnant.applesignin",
  APPLE_REDIRECT_URI: "https://sonnant.cf",
  TIKTOK_CLIENT_ID: "awifw6pdx9enj385",
  TIKTOK_CLIENT_SECRET: "f401a482ccb9a3d388e05042aa51cac2",
  TIKTOK_REDIRECT_URL: "https://sonnant.cf/tiktok",
  INSTAGRAM_REDIRECT_URL: "https://sonnant.cf/instagram",
};

export const config = {
  MAX_ATTACHMENT_SIZE: 5000000,
  ...dev,
};
