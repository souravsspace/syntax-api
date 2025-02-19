import { configureOpenAPI } from "@/lib/configure-open-api";
import { createApp } from "@/lib/create-app";
import { router as indexRouter } from "@/routes/index.route";

const app = createApp();

const routes = [
  indexRouter,
];

configureOpenAPI(app);

routes.forEach((route) => {
  app.route("/", route);
});

export default app;
