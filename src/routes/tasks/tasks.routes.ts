import { createRoute, z } from "@hono/zod-openapi";

import { insertTaskSchema, patchTaskSchema, selectTaskSchema } from "@/database/schema.database";
import { jsonContent, jsonContentRequired } from "@/helpers/open-api";
import { notFoundSchema } from "@/lib/constants";
import { createErrorSchema, IdParamsSchema } from "@/schemas/open-api";
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

export const getOne = createRoute({
  tags,
  method: "get",
  path: "/tasks/{id}",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [httpStatusCodes.OK]: jsonContent(selectTaskSchema, "The requested task"),
    [httpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Task not found"),
    [httpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid path parameters",
    ),

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
    [httpStatusCodes.OK]: jsonContent(selectTaskSchema, "The created task"),
    [httpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertTaskSchema),
      "The validation error(s)",
    ),
  },
});

export const patch = createRoute({
  tags,
  method: "patch",
  path: "/tasks/{id}",
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(patchTaskSchema, "The task to update"),
  },
  responses: {
    [httpStatusCodes.OK]: jsonContent(selectTaskSchema, "The updated task"),
    [httpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Task not found"),
    [httpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(patchTaskSchema).or(createErrorSchema(IdParamsSchema)),
      "The validation error(s)",
    ),
  },
});

export const remove = createRoute({
  tags,
  method: "delete",
  path: "/tasks/{id}",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [httpStatusCodes.NO_CONTENT]: {
      description: "The task was deleted",
    },
    [httpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Task not found"),
    [httpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error",
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
