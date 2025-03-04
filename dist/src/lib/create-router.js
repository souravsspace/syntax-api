import { OpenAPIHono } from "@hono/zod-openapi";
import { defaultHook } from "@/hooks/open-api/default-hook";
export function createRouter() {
    return new OpenAPIHono({
        strict: true,
        defaultHook,
    });
}
