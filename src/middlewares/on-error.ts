import type { ErrorHandler } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";

import { INTERNAL_SERVER_ERROR, OK } from "@/status/http-status-codes";

const onError: ErrorHandler = (err, c) => {
  const currentStatus = "status" in err
    ? err.status
    : c.newResponse(null).status;
  const statusCode: ContentfulStatusCode = currentStatus !== OK
    ? (currentStatus as ContentfulStatusCode)
    : (INTERNAL_SERVER_ERROR as ContentfulStatusCode);

  const env = c.env?.NODE_ENV || "development";
  return c.json(
    {
      message: err.message,

      stack: env === "production"
        ? undefined
        : err.stack,
    },
    statusCode,
  );
};

export default onError;
