import { NOT_FOUND } from "../status/http-status-codes.js";
import { NOT_FOUND as NOT_FOUND_MESSAGE } from "../status/http-status-phrases.js";
const notFound = (c) => {
    return c.json({
        message: `${NOT_FOUND_MESSAGE} - ${c.req.path}`,
    }, NOT_FOUND);
};
export default notFound;
