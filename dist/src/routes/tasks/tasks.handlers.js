import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { db } from "../../database/index.js";
import { tasks } from "../../database/schema.database.js";
import * as httpStatusCodes from "../../status/http-status-codes.js";
import * as httpStatusPhrases from "../../status/http-status-phrases.js";
// import { tasks } from "../../database/schema.database.js";
// import { getRandomTasks } from "../../helpers/tasks/random-task.js";
export const list = async (c) => {
    const dbTasks = await db.query.tasks.findMany();
    return c.json(dbTasks);
    // const insertedTasks = await db.insert(tasks).values(getRandomTasks(100)).returning();
    // return c.json(insertedTasks);
};
export const getOne = async (c) => {
    const { id } = c.req.valid("param");
    const task = await db.query.tasks.findFirst({ where: eq(tasks.id, id) });
    if (!task) {
        return c.json({ message: httpStatusPhrases.NOT_FOUND }, httpStatusCodes.NOT_FOUND);
    }
    return c.json(task, httpStatusCodes.OK);
};
export const patch = async (c) => {
    const { id } = c.req.valid("param");
    const updateTask = c.req.valid("json");
    const [task] = await db.update(tasks).set(updateTask).where(eq(tasks.id, id)).returning();
    if (!task) {
        return c.json({ message: httpStatusPhrases.NOT_FOUND }, httpStatusCodes.NOT_FOUND);
    }
    return c.json(task, httpStatusCodes.OK);
};
export const remove = async (c) => {
    const { id } = c.req.valid("param");
    const task = await db.delete(tasks).where(eq(tasks.id, id));
    if (task.rowsAffected === 0) {
        return c.json({ message: httpStatusPhrases.NOT_FOUND }, httpStatusCodes.NOT_FOUND);
    }
    return c.body(null, httpStatusCodes.NO_CONTENT);
};
export const create = async (c) => {
    const task = c.req.valid("json");
    const [insertedTask] = await db.insert(tasks).values({ id: createId(), ...task }).returning();
    return c.json(insertedTask, httpStatusCodes.OK);
};
