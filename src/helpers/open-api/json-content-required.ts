import type { ZodSchema } from "@/types/helper-type.ts";

import jsonContent from "@/helpers/open-api/json-content";

function jsonContentRequired<
  T extends ZodSchema,
>(schema: T, description: string) {
  return {
    ...jsonContent(schema, description),
    required: true,
  };
}

export default jsonContentRequired;
