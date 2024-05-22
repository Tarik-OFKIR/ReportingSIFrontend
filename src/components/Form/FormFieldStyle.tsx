import {styled} from "@mui/system";
import {Input, inputClasses} from "@mui/base/Input";
import * as React from "react";
import {useFormControlContext} from "@mui/base/FormControl";
import clsx from "clsx";
import {Autocomplete} from "@mui/material";

export const SC = {
    StyledInput: styled(Input)(({theme}) => ({
        [`& .${inputClasses.input}`]: {
            width: 320,
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: 3,
            padding: '8px 12px',
            borderRadius: '8px',
            color: theme.palette.mode === 'dark' ? grey[300] : grey[900],
            background: theme.palette.mode === 'dark' ? grey[900] : '#fff',
            border: `1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]}`,
            boxShadow: `0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]}`,
            '&:hover': {
                borderColor: blue[400],
            },
            '&:focus': {
                outline: 0,
                borderColor: blue[400],
                boxShadow: `0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]}`,
            },
        },
    })),

    Label: styled(({children, className}: { children?: React.ReactNode; className?: string }) => {
            const formControlContext = useFormControlContext();
            const [dirty, setDirty] = React.useState(false);

            React.useEffect(() => {
                if (formControlContext?.filled) {
                    setDirty(true);
                }
            }, [formControlContext]);

            if (formControlContext === undefined) {
                return <p>{children}</p>;
            }

            const {error, required, filled} = formControlContext;
            const showRequiredError = dirty && required && !filled;

            return (
                <p className={clsx(className, error || showRequiredError ? 'invalid' : '')}>
                    {children}
                    {required ? ' *' : ''}
                </p>
            );
        },
    )`
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 0.875rem;
      margin-bottom: 4px;

      &.invalid {
        color: red;
      }
    `,

    AutoComplete: styled(Autocomplete)(({
        width: 320,
        background: '#fff',
        borderRadius: "8px",
        fontFamily: 'IBM Plex Sans, sans-serif',
        padding: '8px 12px',
        ".MuiOutlinedInput-notchedOutline": {border: 0},
        "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            border: 0,
        },
        "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
                border: 0,
            },
        "& .MuiAutocomplete-inputRoot": {
            padding: 0,
        },
        "& .MuiAutocomplete-input": {
            padding: 0,
        },
    })),

    HelperText: styled((props: {}) => {
        const formControlContext = useFormControlContext();
        const [dirty, setDirty] = React.useState(false);

        React.useEffect(() => {
            if (formControlContext?.filled) {
                setDirty(true);
            }
        }, [formControlContext]);

        if (formControlContext === undefined) {
            return null;
        }

        const {required, filled} = formControlContext;
        const showRequiredError = dirty && required && !filled;

        return showRequiredError ? <p {...props}>This field is required.</p> : null;
    })`
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 0.875rem;
    `,
}


const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};


