import { serve } from "@hono/node-server";
import app from "./app.js";
import env from "./env.js";
// eslint-disable-next-line no-console
console.info(`Server is running on http://localhost:${env.PORT}`);
serve({
    fetch: app.fetch,
    port: env.PORT,
});
