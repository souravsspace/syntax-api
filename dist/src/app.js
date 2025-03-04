import { configureOpenAPI } from "./lib/configure-open-api.js";
import { createApp } from "./lib/create-app.js";
/**
 * @routes
 *
 * Here you can define routes which are the main entry point for your API.
 */
import indexRouter from "./routes/index.route.js";
import tasksRouter from "./routes/tasks/tasks.index.js";
const app = createApp();
const routes = [
    indexRouter,
    tasksRouter,
];
configureOpenAPI(app);
routes.forEach((route) => {
    app.route("/", route);
});
export default app;
