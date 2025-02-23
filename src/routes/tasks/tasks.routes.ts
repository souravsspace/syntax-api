import { createRoute, z } from "@hono/zod-openapi";

import { insertTaskSchema, selectTaskSchema } from "@/database/schema.database";
import { jsonContent, jsonContentRequired } from "@/helpers/open-api";
import { createErrorSchema } from "@/schemas/open-api";
import * as httpStatusCodes from "@/status/http-status-codes";

const tags = ["Tasks"];

export const list = createRoute({
  tags,
  method: "get",
  path: "/tasks",
  responses: {
    [httpStatusCodes.OK]: jsonContent(z.array(selectTaskSchema), "The list of tasks"),
  },
});

export const create = createRoute({
  tags,
  method: "post",
  path: "/tasks",
  request: {
    body: jsonContentRequired(insertTaskSchema, "The task to create"),
  },
  responses: {
    [httpStatusCodes.OK]: jsonContent(insertTaskSchema, "The created task"),
    [httpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      // createErrorSchema(),
      z.object({
        success: z.boolean(),
        error: z.object({
          message: z.string(),
          path: z.string(),
        }),
      }),
      "The task is invalid",
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
