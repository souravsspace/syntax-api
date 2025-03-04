import { createRouter } from "../lib/create-router.js";
import notFound from "../middlewares/not-found.js";
import onError from "../middlewares/on-error.js";
import { pinoLogger } from "../middlewares/pino-logger.js";
import serveEmojiFavicon from "../middlewares/serve-emoji-favicon.js";
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
export function createTestApp(router) {
    return createRouter().route("/", router);
}
