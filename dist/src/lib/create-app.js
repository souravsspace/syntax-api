import { createRouter } from "@/lib/create-router";
import notFound from "@/middlewares/not-found";
import onError from "@/middlewares/on-error";
import { pinoLogger } from "@/middlewares/pino-logger";
import serveEmojiFavicon from "@/middlewares/serve-emoji-favicon";
export function createApp() {
    const app = createRouter();
    const logger = pinoLogger();
    const favicon = serveEmojiFavicon();
    app.use(logger);
    app.use(favicon);
    app.notFound(notFound);
    app.onError(onError);
    return app;
}
