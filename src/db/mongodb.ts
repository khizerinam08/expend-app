

import { MongoClient, MongoClientOptions } from "mongodb";

const uri: string | undefined = process.env.MONGO_URI;
const options: MongoClientOptions = {};

if (!uri) {
  throw new Error("Please define the MONGO_URI environment variable in .env.local");
}

// Declare a global variable to cache the MongoClient promise during development
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
