// STAGING LOCAL
const dev = {
  apiGateway: {
    URL: "http://localhost:8080",
  },
};

export const config = {
  MAX_ATTACHMENT_SIZE: 5000000,
  ...dev,
};
