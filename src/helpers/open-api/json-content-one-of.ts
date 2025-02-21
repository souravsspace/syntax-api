import type { ZodSchema } from "@/types/helper-type.ts";

import oneOf from "@/helpers/open-api/one-of";

function jsonContentOneOf<
  T extends ZodSchema,
>(schemas: T[], description: string) {
  return {
    content: {
      "application/json": {
        schema: {
          oneOf: oneOf(schemas),
        },
      },
    },
    description,
  };
}

export default jsonContentOneOf;
