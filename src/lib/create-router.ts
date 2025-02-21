import { OpenAPIHono } from "@hono/zod-openapi";

import type { AppBindings } from "@/types/app-type";

import { defaultHook } from "@/hooks/open-api/default-hook";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: true,
    defaultHook,
  });
}
