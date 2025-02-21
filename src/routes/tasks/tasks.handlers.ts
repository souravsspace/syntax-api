import type { ListRoute } from "@/routes/tasks/tasks.routes";
import type { AppRouterHandler } from "@/types/app-type";

import { db } from "@/database";
// import { tasks } from "@/database/schema.database";
// import { getRandomTasks } from "@/helpers/tasks/random-task";

export const list: AppRouterHandler<ListRoute> = async (c) => {
  const dbTasks = await db.query.tasks.findMany();
  return c.json(dbTasks);

  // const insertedTasks = await db.insert(tasks).values(getRandomTasks(100)).returning();

  // return c.json(insertedTasks);
};
