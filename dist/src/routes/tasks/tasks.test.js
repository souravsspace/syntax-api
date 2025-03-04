import { describe, expect, it } from "vitest";
import { createTestApp } from "../../lib/create-app.js";
import router from "../../routes/tasks/tasks.index.js";
const client = createTestApp(router);
describe("tasks list", () => {
    it("responds with an array", async () => {
        const res = await client.request("/tasks");
        const result = await res.json();
        expect(result).toBeInstanceOf(Array);
    });
});
