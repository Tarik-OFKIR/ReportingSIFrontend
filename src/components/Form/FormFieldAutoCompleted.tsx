import * as React from 'react';
import {FormControl} from '@mui/base/FormControl';
import {TextField} from "@mui/material";
import {SC} from "./FormFieldStyle.tsx";

type FormFieldProps  = {
    labelName: string,
    massage: string,
    handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void,
    items: string[]
    required: boolean
}

function FormFieldAutoCompleted({labelName, massage, handleInput, items, required}: FormFieldProps) {
    return (
        <FormControl defaultValue="" required={required}>
            <SC.Label>{labelName}</SC.Label>
            <SC.AutoComplete
                id="custom-input-demo"
                options={items}
                renderInput={(params) => (
                    <TextField placeholder={massage} onChange={handleInput}  {...params} />
                )}
            />
            <SC.HelperText/>
        </FormControl>
    );
}
export default FormFieldAutoCompleted;
