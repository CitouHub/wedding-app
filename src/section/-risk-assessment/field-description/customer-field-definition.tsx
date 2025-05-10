import { FieldDefinition } from "../../../component/form/field-definition";

const GROUP_ADDRESS = "Vem är du?";
const GROUP_CONTACT = "Hur når vi dig?";
const GROUP_DESCRIPTION = "Beskriv ditt projekt";

export const customerFieldDefinitions: FieldDefinition[] = [
    {
        id: "firstName",
        name: "Namn",
        type: "text",
        required: true,
        disabled: false,
        group: GROUP_ADDRESS
    },
    {
        id: "lastName",
        name: "Efternamn",
        type: "text",
        required: true,
        disabled: false,
        group: GROUP_ADDRESS
    },
    {
        id: "street",
        name: "Gata",
        type: "text",
        required: true,
        disabled: false,
        group: GROUP_ADDRESS
    },
    {
        id: "postalCode",
        name: "Postnummer",
        type: "text",
        required: true,
        disabled: false,
        group: GROUP_ADDRESS
    },
    {
        id: "city",
        name: "Ort",
        type: "text",
        required: true,
        disabled: false,
        group: GROUP_ADDRESS
    },
    {
        id: "phoneNumber",
        name: "Telefonnummer",
        type: "phone",
        required: true,
        disabled: false,
        group: GROUP_CONTACT
    },
    {
        id: "emailAddress",
        name: "E-mail adress",
        type: "email",
        required: true,
        disabled: false,
        group: GROUP_CONTACT
    },
    {
        id: "projectDescription",
        name: "Beskrivning",
        type: "text-area",
        required: true,
        disabled: false,
        fullInput: true,
        group: GROUP_DESCRIPTION
    }
];