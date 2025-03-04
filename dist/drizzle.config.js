import { defineConfig } from "drizzle-kit";
import env from "./src/env.js";
export default defineConfig({
    schema: "./src/database/schema.database.ts",
    out: "./src/database/migrations",
    dialect: "turso",
    dbCredentials: {
        url: env.TURSO_CONNECTION_URL,
        authToken: env.TURSO_AUTH_TOKEN,
    },
    verbose: true,
    strict: true,
});
