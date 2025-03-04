/* eslint-disable node/no-process-env */
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import path from "node:path";
import { z } from "zod";
expand(config({
    path: path.resolve(process.cwd(), process.env.NODE_ENV === "test" ? ".env.test" : ".env.local"),
}));
const EnvSchema = z.object({
    PORT: z.coerce.number().default(3000),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]),
    TURSO_CONNECTION_URL: z.string().url(),
    TURSO_AUTH_TOKEN: z.string(),
});
// eslint-disable-next-line ts/no-redeclare
const { data: env, error } = EnvSchema.safeParse(process.env);
if (error) {
    console.error("❌ Invalid env:");
    console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
    process.exit(1);
}
export default env;
