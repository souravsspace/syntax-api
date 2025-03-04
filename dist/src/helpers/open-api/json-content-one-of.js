import oneOf from "@/helpers/open-api/one-of";
function jsonContentOneOf(schemas, description) {
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
