import * as React from 'react';
import {FormControl} from '@mui/base/FormControl';

import {SC} from "./FormFieldStyle.tsx";

type FormFieldProps = {
    labelName: string,
    massage: string,
    handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    required: boolean
}

function FormField({labelName, massage, handleInput, required}: FormFieldProps) {
    return (
        <FormControl defaultValue="" required={required}>
            <SC.Label>{labelName}</SC.Label>
            <SC.StyledInput placeholder={massage} onChange={handleInput}/>
            {/*<HelperText />*/}
        </FormControl>
    );
}


export default FormField;
