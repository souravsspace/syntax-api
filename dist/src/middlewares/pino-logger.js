import env from "../env.js";
import { pinoLogger as logger } from "hono-pino";
import pino from "pino";
import { PinoPretty as pretty } from "pino-pretty";
export function pinoLogger() {
    return logger({
        pino: pino({
            level: env.LOG_LEVEL ?? "info",
        }, env.NODE_ENV === "development" ? pretty() : undefined),
        http: {
            reqId: () => crypto.randomUUID(),
        },
    });
}
