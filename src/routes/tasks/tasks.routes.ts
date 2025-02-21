import { createRoute, z } from "@hono/zod-openapi";

import { jsonContent } from "@/helpers/open-api";
import * as httpStatusCodes from "@/status/http-status-codes";

const tags = ["Tasks"];

export const list = createRoute({
  tags,
  method: "get",
  path: "/tasks",
  responses: {
    [httpStatusCodes.OK]: jsonContent(z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        completed: z.boolean(),
      }),
    ), "The list of tasks"),
  },
});

export type ListRoute = typeof list;
