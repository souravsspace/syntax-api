import { createRouter } from "../../lib/create-router.js";
import * as handlers from "../../routes/tasks/tasks.handlers.js";
import * as routes from "../../routes/tasks/tasks.routes.js";
const router = createRouter()
    .openapi(routes.list, handlers.list)
    .openapi(routes.create, handlers.create)
    .openapi(routes.getOne, handlers.getOne)
    .openapi(routes.patch, handlers.patch)
    .openapi(routes.remove, handlers.remove);
export default router;
