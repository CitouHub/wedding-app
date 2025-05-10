import { ReactElement, useState } from "react";
import styles from './style/base-form.module.css';
import { FieldDefinition } from "./field-definition"
import { Autocomplete, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, InputAdornment, InputLabel, ListItemText, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material";
import { SelectItem } from "./select-item";
import BaseControl from "../control/base-control";

export default function BaseForm({
    children,
    model,
    fields,
    setModel,

    submitButtonText,
    submitIcon,
    submitDisabled,
    submitting,
    onSubmitButtonClick,

    cancelButtonText,
    cancelIcon,
    cancelDisabled,
    cancelling,
    onCancelButtonClick,

    inputFull
}: {
    children?: ReactElement | ReactElement[] | undefined,
    model: any,
    fields: FieldDefinition[],
    setModel(model: any): void,
    
    submitButtonText?: string | undefined,
    submitIcon?: JSX.Element | undefined,
    submitDisabled?: boolean | undefined,
    submitting?: boolean | undefined,
    onSubmitButtonClick?(model: any): void | undefined,

    cancelButtonText?: string | undefined,
    cancelIcon?: JSX.Element | undefined,
    cancelDisabled?: boolean | undefined,
    cancelling?: boolean,
    onCancelButtonClick?(): void | undefined,
    
    inputFull?: boolean | undefined
}) {
    const [errors, setErrors] = useState<any>({});

    const validateSubmit = () => {
        if (onSubmitButtonClick !== undefined) {
            let foundErrors: any = {};
            fields.forEach(field => {
                // Required
                if (field.required && (model[field.id] === undefined || model[field.id] === null || model[field.id] === "")) {
                    foundErrors = { ...foundErrors, [field.id]: `Du måste ange ${field.name}` };
    
                    // Required
                } else if (field.required && (model[field.id] as any[] === undefined || model[field.id] as any[] === null || (model[field.id] as any[]).length === 0)) {
                    foundErrors = { ...foundErrors, [field.id]: `Du måste ange ${field.name}` };
    
                    // Max
                } else if (field.max !== undefined && field.type === 'number' && model[field.id] as number > field.max) {
                    foundErrors = { ...foundErrors, [field.id]: `${field.name} måste vara mindre än eller lika med ${field.max}` };
                } else if (field.max !== undefined && field.type === 'text' && (model[field.id] as string).length > field.max) {
                    foundErrors = { ...foundErrors, [field.id]: `${field.name} måste vara kortare än eller lika med ${field.max} bokstäver` };
    
                    // Min
                } else if (field.min !== undefined && field.type === 'number' && model[field.id] as number < field.min) {
                    foundErrors = { ...foundErrors, [field.id]: `${field.name} måste vara större än eller lika med ${field.min}` };
                } else if (field.min !== undefined && field.type === 'text' && (model[field.id] as string).length < field.min) {
                    foundErrors = { ...foundErrors, [field.id]: `${field.name} måste vara längre än eller lika med ${field.min} bokstäver` };
    
                    // Email
                } else if (field.type === 'email' && !validateEmail(model[field.id] as string)) {
                    foundErrors = { ...foundErrors, [field.id]: `${model[field.id]} är en felaktig e-mail adderss` };
    
                    // Phone
                } else if (field.type === 'phone' && !validatePhone(model[field.id] as string)) {
                    foundErrors = { ...foundErrors, [field.id]: `${model[field.id]} är ett felaktigt telefonnummer` };
                }
            })
    
            setErrors(foundErrors);
    
            if (Object.values(foundErrors).length === 0) {
                onSubmitButtonClick(model);
            }
        }
    }

    const validateEmail = (email: string) => {
        return email === undefined || (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(email);
    }

    const validatePhone = (phone: string) => {
        return phone === undefined || !(/[a-zA-Z]/).test(phone);
    }

    const isDisabled = (fieldDisabled: boolean) => {
        return fieldDisabled || submitting;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.form}>
                {[... new Set(fields.map(_ => _.group))].map(group => {
                    return <div key={group || "general-group"} className={styles.form}>
                        {group && <h3 className={styles.groupTitle}>{group}</h3>}
                        {fields.filter(_ => _.group === group && _.hidden !== true).map(field => {
    
                            switch (field.type) {
                                case 'info':
                                    return <div
                                        key={field.id}
                                        className={inputFull === true || field.fullInput === true ? styles.inputFull : styles.input}
                                        id={`${field.id}-info`}
                                    >
                                        <p><b>{field.name}</b></p>
                                        {model[field.id] !== undefined && <p>{model[field.id]}</p>}
                                        {model[field.id] === undefined && <p><i>{field.name} missing</i></p>}
                                    </div>
                                case 'link':
                                    return <div
                                        key={field.id}
                                        className={inputFull === true || field.fullInput === true ? styles.inputFull : styles.input}
                                        id={`${field.id}-link`}
                                    >
                                        <p><b>{field.name}</b></p>
                                        <a rel="noopener noreferrer" href={model[field.id]} target="_blank">{model[field.id]}</a>
                                    </div>
                                case 'text':
                                case 'phone':
                                case 'email': {
                                    return (<TextField
                                        key={field.id}
                                        className={inputFull === true || field.fullInput === true ? styles.inputFull : styles.input}
                                        id={`${field.id}-text`}
                                        label={field.name}
                                        value={model[field.id] ?? ''}
                                        disabled={isDisabled(field.disabled)}
                                        error={errors[field.id] !== undefined}
                                        helperText={errors[field.id]}
                                        onChange={e => {
                                            setModel({ ...model, [field.id]: e.target.value });
                                        }}
                                        slotProps={{
                                            input: {
                                                endAdornment: field.adornment && <InputAdornment position="end">{field.adornment}</InputAdornment>
                                            }
                                        }}
                                    />)
                                }
                                case 'number': {
                                    return (<TextField
                                        key={field.id}
                                        type='number'
                                        className={inputFull === true || field.fullInput === true ? styles.inputFull : styles.input}
                                        id={`${field.id}-number`}
                                        label={field.name}
                                        value={model[field.id] ?? ''}
                                        disabled={isDisabled(field.disabled)}
                                        error={errors[field.id] !== undefined}
                                        helperText={errors[field.id]}
                                        onChange={e => {
                                            setModel({ ...model, [field.id]: e.target.value })
                                        }}
                                        slotProps={{
                                            input: {
                                                endAdornment: field.adornment && <InputAdornment position="end">{field.adornment}</InputAdornment>
                                            }
                                        }}
                                    />)
                                }
                                case 'text-area': {
                                    return (<TextField
                                        key={field.id}
                                        className={inputFull === true || field.fullInput === true ? styles.inputFull : styles.input}
                                        id={`${field.id}-text-area`}
                                        label={field.name}
                                        value={model[field.id] ?? ''}
                                        disabled={isDisabled(field.disabled)}
                                        error={errors[field.id] !== undefined}
                                        helperText={errors[field.id]}
                                        onChange={e => {
                                            setModel({ ...model, [field.id]: e.target.value });
                                        }}
                                        multiline
                                        minRows={4}
                                        maxRows={4}
                                        slotProps={{
                                            input: {
                                                endAdornment: field.adornment && <InputAdornment position="end">{field.adornment}</InputAdornment>
                                            }
                                        }}
                                    />)
                                }
                                case 'select':
                                case 'number-select': {
                                    return (
                                        <FormControl
                                            key={field.id}
                                            id={`${field.id}-form-control`}
                                            className={inputFull === true || field.fullInput === true ? styles.inputFull : styles.input}
                                            error={errors[field.id] !== undefined}
                                        >
                                            <InputLabel id={`${field.id}-label`}>{field.name}</InputLabel>
                                            <Select
                                                labelId={`${field.id}-label`}
                                                id={`${field.id}-select`}
                                                value={model[field.id] ?? ''}
                                                label={field.name}
                                                disabled={isDisabled(field.disabled)}
                                                onChange={e => {
                                                    setModel({ ...model, [field.id]: e.target.value })
                                                }}
                                            >
                                                {field.type === 'select' && field.values?.map(item => {
                                                    return <MenuItem
                                                        key={item.id}
                                                        id={`${field.id}-${item.id}-menu-item`}
                                                        value={item.id}
                                                    >
                                                        {item.name}
                                                    </MenuItem>
                                                })}
                                                {field.type === 'number-select' && Array.from(Array(field.max! + 1).keys()).filter(_ => _ >= field.min!).map(number => {
                                                    if (number > 0) {
                                                        return <MenuItem
                                                            key={`${field.type}-${number}`}
                                                            id={`${field.type}-${number}-menu-item`}
                                                            value={number}
                                                        >
                                                            <div className={styles.numberSelect}>
                                                                {Array.from(Array(number)).map(() => {
                                                                    return (
                                                                        <span key={`${Math.random()}-select-icon`} >{field.icon}</span>
                                                                    )
                                                                })}
                                                                &nbsp;
                                                                {field.valueSuffixes?.find(_ => _.value === number)?.suffix}
                                                            </div>

                                                        </MenuItem>
                                                    } else {
                                                        return <MenuItem
                                                            key={`${field.type}-${number}`}
                                                            id={`${field.type}-${number}-menu-item`}
                                                            value={number}
                                                        >
                                                            <span key={`${Math.random()}-select-icon`} >None</span>
                                                        </MenuItem>
                                                    }
                                                })}
                                            </Select>
                                            {errors[field.id] !== undefined && <FormHelperText id={`${field.id}-form-helper-text`}>{errors[field.id]}</FormHelperText>}
                                        </FormControl>
                                    )
                                }
                                case 'boolean': {
                                    return (
                                        <FormGroup
                                            key={field.id}
                                            id={`${field.id}-form-group`}
                                            sx={{ marginTop: 'auto', marginBottom: 'auto' }}
                                            className={inputFull === true || field.fullInput === true ? styles.inputFull : styles.input}
                                        >
                                            <FormControlLabel
                                                id={`${field.id}-form-control-label`}
                                                control={
                                                    <Checkbox
                                                        id={`${field.id}-checkbox`}
                                                        checked={model[field.id] ?? true}
                                                        onChange={e => {
                                                            setModel({ ...model, [field.id]: e.target.checked });
                                                        }}
                                                    />
                                                } label={field.name} />
                                        </FormGroup>
                                    )
                                }
                                case 'multi-select': {
                                    return (
                                        <FormControl
                                            key={field.id}
                                            id={`${field.id}-form-control`}
                                            className={inputFull === true || field.fullInput === true ? styles.inputFull : styles.input}
                                            error={errors[field.id] !== undefined}
                                        >
                                            <InputLabel id={`${field.id}-label`}>{field.name}</InputLabel>
                                            <Select
                                                labelId={`${field.id}-label`}
                                                id={`${field.id}-select`}
                                                multiple
                                                value={field.values?.filter(_ => (model[field.id] ?? []).includes(_.id)).map(_ => _.id) ?? []}
                                                renderValue={(selected) => selected.map(_ => field.values?.find(v => v.id === _)?.name).join(', ')}
                                                label={field.name}
                                                disabled={isDisabled(field.disabled)}
                                                onChange={e => {
                                                    const selectedValues = (typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value);
                                                    setModel({ ...model, [field.id]: selectedValues });
                                                }}
                                            >
                                                {field.values?.map(item => {
                                                    return (
                                                        <MenuItem
                                                            key={item.id}
                                                            id={`${field.id}-${item.id}-menu-item`}
                                                            value={item.id}
                                                        >
                                                            <Checkbox
                                                                id={`${field.id}-${item.id}-checkbox`}
                                                                checked={(model[field.id] ?? []).indexOf(item.id) > -1}
                                                            />
                                                            <ListItemText
                                                                primary={item.name}
                                                                id={`${field.id}-${item.id}-list-item.text`}
                                                            />
                                                        </MenuItem>
                                                    )
                                                })}
                                            </Select>
                                            {errors[field.id] !== undefined && <FormHelperText id={`${field.id}-form-helper-text`}>{errors[field.id]}</FormHelperText>}
                                        </FormControl>
                                    )
                                }
                                case 'search-select': {
                                    return (<Autocomplete
                                        key={field.id}
                                        className={inputFull === true || field.fullInput === true ? styles.inputFull : styles.input}
                                        id={`${field.id}-search-select`}
                                        disablePortal
                                        disabled={isDisabled(field.disabled)}
                                        options={field.values!}
                                        value={field.values?.find(_ => _.id === model[field.id]) ?? null}
                                        onChange={(_event: any, newValue: SelectItem | null) => {
                                            setModel({ ...model, [field.id]: newValue?.id });
                                        }}
                                        renderInput={(params) =>
                                            <TextField {...params}
                                                key={`${field.id}-search-select-input`}
                                                error={errors[field.id] !== undefined}
                                                helperText={errors[field.id]} label={field.name}
                                            />}
                                        getOptionLabel={(option) => option.name}
                                        renderOption={(props, option) => <li {...props} key={`${field.id}-search-select-option-${option.id}`}>{option.name}</li>}
                                    />)
                                }
                                case 'radio': {
                                    return (
                                        <FormControl
                                            key={field.id}
                                            id={`${field.id}-form-control`}
                                            className={inputFull === true || field.fullInput === true ? styles.inputFull : styles.input}
                                            error={errors[field.id] !== undefined}
                                            disabled={isDisabled(field.disabled)}
                                        >
                                            <FormLabel id={`${field.id}-form-label`}>{field.name}</FormLabel>
                                            <RadioGroup
                                                row
                                                value={model[field.id]}
                                                name={`${field.id}-radio-button-group`}
                                                onChange={(newValue) => {
                                                    setModel({ ...model, [field.id]: isNaN(Number(newValue?.target.value)) ? newValue?.target.value : Number(newValue?.target.value) })
                                                }}
                                            >
                                                {field.values?.map(item => {
                                                    return (
                                                        <FormControlLabel
                                                            key={item.id}
                                                            id={`${field.id}-${item.id}-radio-button-item`}
                                                            value={item.id}
                                                            control={<Radio />}
                                                            label={item.name}
                                                        />
                                                    )
                                                })}
                                            </RadioGroup>
                                            {errors[field.id] !== undefined && <FormHelperText id={`${field.id}-form-helper-text`}>{errors[field.id]}</FormHelperText>}
                                        </FormControl>
                                    );
                                }
                                default: {
                                    return null
                                }
                            }
                        })}
                    </div>
                })}
            </div>
            {children}
            <BaseControl 
                leftButtonActive={true}
                leftButtonText={cancelButtonText}
                leftButtonIcon={cancelIcon ?? undefined}
                leftButtonDisable={cancelDisabled === true || cancelling === true || submitting === true}
                leftButtonLoading={cancelling === true}
                onLeftButtonClick={onCancelButtonClick}

                rightButtonActive={true}
                rightButtonText={submitButtonText}
                rightButtonIcon={submitIcon ?? undefined}
                rightButtonDisable={submitDisabled === true || submitting === true || cancelling === true}
                rightButtonLoading={submitting}
                onRightButtonClick={() => validateSubmit()}
            />
        </div>
    )
}