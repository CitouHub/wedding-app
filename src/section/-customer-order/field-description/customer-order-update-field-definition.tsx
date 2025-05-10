import { FieldDefinition } from "../../../component/form/field-definition";

export const customerOrderUpdateFieldDefinitions: FieldDefinition[] = [
    {
        id: "id",
        name: "Id",
        type: "text",
        required: true,
        disabled: false,
        hidden: true
    },
    {
        id: "customerProjectDescription",
        name: "Beskrivning",
        type: "text-area",
        required: true,
        disabled: false,
        fullInput: true
    }
];