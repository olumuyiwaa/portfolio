import { MongoClient } from "mongodb";

// One shared client per server instance, reused across requests.
// Returns null when MONGODB_URI is not set, so the site works without analytics.
export function analyticsConfigured() {
  return Boolean(process.env.MONGODB_URI);
}

export async function getDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;
  if (!globalThis._portfolioMongo) {
    globalThis._portfolioMongo = new MongoClient(uri, {
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
    }).connect();
  }
  try {
    const client = await globalThis._portfolioMongo;
    return client.db(process.env.MONGODB_DB || "portfolio");
  } catch (err) {
    globalThis._portfolioMongo = undefined; // retry on the next request
    throw err;
  }
}
