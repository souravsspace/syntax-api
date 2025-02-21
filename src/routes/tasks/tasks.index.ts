import { createRouter } from "@/lib/create-router";
import * as handlers from "@/routes/tasks/tasks.handlers";
import * as routes from "@/routes/tasks/tasks.routes";

const router = createRouter();

router.openapi(routes.list, handlers.list);

export default router;
