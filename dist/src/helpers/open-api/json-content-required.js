import jsonContent from "@/helpers/open-api/json-content";
function jsonContentRequired(schema, description) {
    return {
        ...jsonContent(schema, description),
        required: true,
    };
}
export default jsonContentRequired;
