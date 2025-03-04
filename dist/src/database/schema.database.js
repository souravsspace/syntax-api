import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
const createdAt = integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date());
const updatedAt = integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()).$onUpdate(() => new Date());
export const tasks = sqliteTable("tasks", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    completed: integer("completed", { mode: "boolean" }).notNull().default(false),
    createdAt,
    updatedAt,
});
export const selectTaskSchema = createSelectSchema(tasks);
export const insertTaskSchema = createInsertSchema(tasks).required({
    name: true,
    description: true,
    completed: true,
}).omit({ id: true, createdAt: true, updatedAt: true });
