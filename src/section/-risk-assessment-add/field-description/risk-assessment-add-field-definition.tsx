import { FieldDefinition } from "../../../component/form/field-definition";

export const riskAssessmentAddFieldDefinitions: FieldDefinition[] = [
    {
        id: "title",
        name: "Namn",
        type: "text",
        required: true,
        disabled: false,
        fullInput: true
    },
    {
        id: "description",
        name: "Beskrivning",
        type: "text-area",
        required: false,
        disabled: false,
        fullInput: true
    },
    {
        id: "riskCategoryId",
        name: "Kategori",
        type: "text",
        required: true,
        disabled: false,
        hidden: true
    },
    {
        id: "riskCategoryName",
        name: "Kategori namn",
        type: "text",
        required: true,
        disabled: false,
        hidden: true
    }
];