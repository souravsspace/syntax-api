import { z } from "@hono/zod-openapi";
function createMessageObjectSchema(exampleMessage = "Hello World") {
    return z.object({
        message: z.string(),
    }).openapi({
        example: {
            message: exampleMessage,
        },
    });
}
export default createMessageObjectSchema;
