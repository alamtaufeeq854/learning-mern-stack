const env = {
  appwrite: {
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_HOST_URL,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
    apiKey: process.env.APPWRITE_API_KEY,
  },
};

console.log("APPWRITE ENV:", {
  endpoint: env.appwrite.endpoint,
  projectId: env.appwrite.projectId ? "FOUND" : "MISSING",
  apiKey: env.appwrite.apiKey ? "FOUND" : "MISSING",
});

export default env;
