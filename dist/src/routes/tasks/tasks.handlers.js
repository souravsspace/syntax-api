import { createId } from "@paralleldrive/cuid2";
import { db } from "@/database";
import { tasks } from "@/database/schema.database";
// import { tasks } from "@/database/schema.database";
// import { getRandomTasks } from "@/helpers/tasks/random-task";
export const list = async (c) => {
    const dbTasks = await db.query.tasks.findMany();
    return c.json(dbTasks);
    // const insertedTasks = await db.insert(tasks).values(getRandomTasks(100)).returning();
    // return c.json(insertedTasks);
};
export const create = async (c) => {
    const task = c.req.valid("json");
    const [insertedTask] = await db.insert(tasks).values({ id: createId(), ...task }).returning();
    if (!insertedTask) {
        return c.json({ success: false, error: { message: "Failed to create task", path: "tasks" } }, 422);
    }
    return c.json(insertedTask);
};
