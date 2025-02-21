import type { Hook } from "@hono/zod-openapi";

import { UNPROCESSABLE_ENTITY } from "@/status/http-status-codes";

export const defaultHook: Hook<any, any, any, any> = (result, c) => {
  if (!result.success) {
    return c.json(
      {
        success: result.success,
        error: result.error,
      },
      UNPROCESSABLE_ENTITY,
    );
  }
};
