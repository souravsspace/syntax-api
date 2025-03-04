import { createMessageObjectSchema } from "@/schemas/open-api";
import * as httpStatusPhrases from "@/status/http-status-phrases";

export const notFoundSchema = createMessageObjectSchema(httpStatusPhrases.NOT_FOUND);
