import { SelectItem } from "./select-item";

export interface ValueSuffix {
    value: any,
    suffix: string
}

export interface FieldDefinition {
    id: string;
    name: string;
    type: string;
    required: boolean;
    disabled: boolean;
    hidden?: boolean | undefined;
    group?: string | undefined;
    fullInput?: boolean | undefined;
    adornment?: string | undefined;
    icon?: JSX.Element | undefined;
    min?: number | undefined;
    max?: number | undefined;
    values?: SelectItem[] | undefined;
    valueSuffixes?: ValueSuffix[] | undefined
}