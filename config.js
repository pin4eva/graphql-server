require("dotenv").config();

export default {
  MONGODB_URI: process.env.MONGODB_URI,
  SECRET: process.env.SECRET || "kjdnsdlkdslkm",
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  SERVER_URL:
    process.env.NODE_ENV === "production"
      ? process.env.SERVER_URL
      : "http://localhost:8000",
  CLIENT_URL:
    process.env.NODE_ENV === "production"
      ? process.env.CLIENT_URL
      : "http://localhost:3000",
};
