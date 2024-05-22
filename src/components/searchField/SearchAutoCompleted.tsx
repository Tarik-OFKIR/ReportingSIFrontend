import {Autocomplete, TextField} from "@mui/material";
import {IGData} from "../../Modules/IGData.tsx";
import {FormControl, useFormControlContext} from "@mui/base/FormControl";
import * as React from "react";
import {styled} from "@mui/system";
import clsx from "clsx";
import SearchIcon from "@mui/icons-material/Search";

interface SearchAutoCompletedProps<T extends IGData> {
    items: T[];
    arrName: string;
    handleSelection?: (value: T) => void;

}

function getFirstLetter(value: string) {
    return value[0].toUpperCase();
}
function SearchAutoCompleted<T extends IGData>({items, arrName,handleSelection}: SearchAutoCompletedProps<T>) {


    const options = items.sort((a, b) => a.name.localeCompare(b.name));
    // const key = items.length > 0 ? items[0].id : null;

    return (
        <FormControl defaultValue="" required>
            <Label>{arrName}</Label>
            <Autocomplete
                disableClearable={true}
                popupIcon={<SearchIcon />}

                sx={{
                    width: 320,
                    background: '#fff',
                    borderRadius: "8px",
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    padding: '8px 12px',
                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
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

                }}
                groupBy={(item) => getFirstLetter(item.name)}
                getOptionLabel={(item) => item.name}
                id="custom-input-demo"
                options={options}
                renderInput={(params) => (<TextField  placeholder={arrName} {...params} />)}
                onChange={(e, value) => e.target && handleSelection && handleSelection(value as T)}
            />
        </FormControl>
    );
}


const Label = styled(
    ({children, className}: { children?: React.ReactNode; className?: string }) => {
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
`;


export default SearchAutoCompleted;