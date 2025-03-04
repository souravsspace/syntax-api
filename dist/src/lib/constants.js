import { createMessageObjectSchema } from "../schemas/open-api/index.js";
import * as httpStatusPhrases from "../status/http-status-phrases.js";
export const notFoundSchema = createMessageObjectSchema(httpStatusPhrases.NOT_FOUND);
