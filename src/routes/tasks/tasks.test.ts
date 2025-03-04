import { testClient } from "hono/testing";
import { describe, expect, it } from "vitest";

import { createApp } from "@/lib/create-app";
import router from "@/routes/tasks/tasks.index";

const client = testClient(createApp().route("/", router));

describe("tasks list", () => {
  it("responds with an array", async () => {
    const res = await client.tasks.$get();
    const result = await res.json();

    expect(result).toBeInstanceOf(Array);
  });
});
