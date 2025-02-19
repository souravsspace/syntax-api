import { serve } from "@hono/node-server";

import app from "@/app";
import { env } from "@/env";

// eslint-disable-next-line no-console
console.info(`Server is running on http://localhost:${env.PORT}`);

serve({
  fetch: app.fetch,
  port: env.PORT,
});
