import { configureOpenAPI } from "@/lib/configure-open-api";
import { createApp } from "@/lib/create-app";
/**
 * @routes
 *
 * Here you can define routes which are the main entry point for your API.
 */
import indexRouter from "@/routes/index.route";
import tasksRouter from "@/routes/tasks/tasks.index";
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
