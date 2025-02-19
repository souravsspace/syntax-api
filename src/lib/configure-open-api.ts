import { apiReference } from "@scalar/hono-api-reference";

import type { AppOpenAPI } from "@/types/app-type";

import packageJson from "../../package.json";

export function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/docs", {
    openapi: "3.1.0",
    info: {
      title: packageJson.name
        .replace(/-/g, " ")
        .replace(/^(\w)(\w+)\s+(\w+)$/, (_, first, rest, secondWord) =>
          `${first.toUpperCase()}${rest} ${secondWord.toUpperCase()}`),
      version: packageJson.version,
    },
  });

  app.get(
    "/reference",
    apiReference({
      theme: "deepSpace",
      spec: {
        url: "/docs",
      },
      defaultHttpClient: {
        targetKey: "node",
        clientKey: "axios",
      },
    }),
  );
}
