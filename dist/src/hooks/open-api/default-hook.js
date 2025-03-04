import { UNPROCESSABLE_ENTITY } from "../../status/http-status-codes.js";
export const defaultHook = (result, c) => {
    if (!result.success) {
        return c.json({
            success: result.success,
            error: result.error,
        }, UNPROCESSABLE_ENTITY);
    }
};
