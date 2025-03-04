import { createRoute } from "@hono/zod-openapi";
import { jsonContent } from "../helpers/open-api/index.js";
import { createRouter } from "../lib/create-router.js";
import { createMessageObjectSchema } from "../schemas/open-api/index.js";
import * as httpStatusCodes from "../status/http-status-codes.js";
const router = createRouter()
    .openapi(createRoute({
    tags: ["Index"],
    method: "get",
    path: "/",
    responses: {
        [httpStatusCodes.OK]: jsonContent(createMessageObjectSchema("Task API"), "Task API Index"),
    },
}), (c) => {
    return c.json({
        message: "Task API",
    }, httpStatusCodes.OK);
});
export default router;
