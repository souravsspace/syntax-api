import env from "@/env";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as schema from "@/database/schema.database";

const client = createClient({ url: env.TURSO_CONNECTION_URL, authToken: env.TURSO_AUTH_TOKEN });

export const db = drizzle(client, { schema });
