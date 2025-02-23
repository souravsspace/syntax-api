import { createId } from "@paralleldrive/cuid2";

import type { CreateRoute, ListRoute } from "@/routes/tasks/tasks.routes";
import type { AppRouterHandler } from "@/types/app-type";

import { db } from "@/database";
import { tasks } from "@/database/schema.database";
// import { tasks } from "@/database/schema.database";
// import { getRandomTasks } from "@/helpers/tasks/random-task";

export const list: AppRouterHandler<ListRoute> = async (c) => {
  const dbTasks = await db.query.tasks.findMany();
  return c.json(dbTasks);

  // const insertedTasks = await db.insert(tasks).values(getRandomTasks(100)).returning();

  // return c.json(insertedTasks);
};

export const create: AppRouterHandler<CreateRoute> = async (c) => {
  const task = c.req.valid("json");
  const [insertedTask] = await db.insert(tasks).values({ id: createId(), ...task }).returning();
  return c.json(insertedTask);
};
