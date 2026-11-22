import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const mongoUri =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/assetloopDB";

const globalForMongo = globalThis as unknown as {
  mongoClient?: MongoClient;
};

export const mongoClient =
  globalForMongo.mongoClient ??
  new MongoClient(mongoUri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 15000,
    connectTimeoutMS: 15000,
  });

if (!globalForMongo.mongoClient) {
  globalForMongo.mongoClient = mongoClient;
}

const db = mongoClient.db("assetloopDB");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL,
  trustedOrigins: [
    process.env.BETTER_AUTH_URL || "",
    process.env.NEXT_PUBLIC_APP_URL || "",
    "https://asset-loop-client.vercel.app",
    "http://localhost:3000",
  ].filter(Boolean),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "customer",
      },
      phone: {
        type: "string",
        required: false,
      },
      address: {
        type: "string",
        required: false,
      },
    },
  },
});