import { jsonContent } from "@/helpers/open-api";
import { createRoute } from "@hono/zod-openapi";
import { createRouter } from "@/lib/create-router";
import { createMessageObjectSchema } from "@/schemas/open-api";
import * as httpStatusCodes from "@/status/http-status-codes";
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
