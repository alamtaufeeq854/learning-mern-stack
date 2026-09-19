import env from "@/app/env";

import {
  Client,
  Databases,
  Storage,
  Users,
} from "node-appwrite";

const client = new Client()
  .setEndpoint(env.appwrite.endpoint)
  .setProject(env.appwrite.projectId)
  .setKey(env.appwrite.apiKey);

const databases = new Databases(client);

const storage = new Storage(client);

const users = new Users(client);

export {
  client,
  databases,
  storage,
  users,
};