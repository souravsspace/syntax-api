import { INTERNAL_SERVER_ERROR, OK } from "../status/http-status-codes.js";
const onError = (err, c) => {
    const currentStatus = "status" in err
        ? err.status
        : c.newResponse(null).status;
    const statusCode = currentStatus !== OK
        ? currentStatus
        : INTERNAL_SERVER_ERROR;
    const env = c.env?.NODE_ENV || "development";
    return c.json({
        message: err.message,
        stack: env === "production"
            ? undefined
            : err.stack,
    }, statusCode);
};
export default onError;
