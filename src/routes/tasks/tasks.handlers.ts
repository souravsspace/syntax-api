import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";

import type { CreateRoute, GetOneRoute, ListRoute, PatchRoute, RemoveRoute } from "@/routes/tasks/tasks.routes";
import type { AppRouterHandler } from "@/types/app-type";

import { db } from "@/database";
import { tasks } from "@/database/schema.database";
import * as httpStatusCodes from "@/status/http-status-codes";
import * as httpStatusPhrases from "@/status/http-status-phrases";
// import { tasks } from "@/database/schema.database";
// import { getRandomTasks } from "@/helpers/tasks/random-task";

export const list: AppRouterHandler<ListRoute> = async (c) => {
  const dbTasks = await db.query.tasks.findMany();
  return c.json(dbTasks);

  // const insertedTasks = await db.insert(tasks).values(getRandomTasks(100)).returning();
  // return c.json(insertedTasks);
};

export const getOne: AppRouterHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const task = await db.query.tasks.findFirst({ where: eq(tasks.id, id) });

  if (!task) {
    return c.json({ message: httpStatusPhrases.NOT_FOUND }, httpStatusCodes.NOT_FOUND);
  }

  return c.json(task, httpStatusCodes.OK);
};

export const patch: AppRouterHandler<PatchRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const updateTask = c.req.valid("json");

  const [task] = await db.update(tasks).set(updateTask).where(eq(tasks.id, id)).returning();

  if (!task) {
    return c.json({ message: httpStatusPhrases.NOT_FOUND }, httpStatusCodes.NOT_FOUND);
  }

  return c.json(task, httpStatusCodes.OK);
};

export const remove: AppRouterHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const task = await db.delete(tasks).where(eq(tasks.id, id));

  if (task.rowsAffected === 0) {
    return c.json({ message: httpStatusPhrases.NOT_FOUND }, httpStatusCodes.NOT_FOUND);
  }

  return c.body(null, httpStatusCodes.NO_CONTENT);
};

export const create: AppRouterHandler<CreateRoute> = async (c) => {
  const task = c.req.valid("json");
  const [insertedTask] = await db.insert(tasks).values({ id: createId(), ...task }).returning();

  return c.json(insertedTask, httpStatusCodes.OK);
};
