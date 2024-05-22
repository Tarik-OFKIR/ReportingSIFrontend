import {Autocomplete, TextField} from "@mui/material";
import {IGData} from "../../Modules/IGData.tsx";

type DropDownListAutoCommittedProps<T extends IGData> = {
    items: T[];
    arrName: string;
    handleSelection?: (value: T) => void;
    
}
function getFirstLetter(value: string) {
    return value[0].toUpperCase();
}
function DropDownListAutoCommitted<T extends IGData>({items, arrName, handleSelection}: DropDownListAutoCommittedProps<T>) {

    const sortedItems = items.sort((a, b) => a.name.localeCompare(b.name));
    const key = items.length > 0 ? items[0].id : null;

    return (
        <Autocomplete
            id="grouped-demo"
            options={sortedItems}
            groupBy={(option) => getFirstLetter(option.name)}
            getOptionLabel={(item) => item.code==undefined ? `${item.name}`:`${item.code}: ${item.name}` }
            sx={{width: 400, bgcolor: '#fff'}}
            renderInput={(params) => <TextField {...params} label={arrName} key={key}/>}
            onChange={(e, value) => e.target &&
                handleSelection && handleSelection(value as T) }

        />
    );
}

export default DropDownListAutoCommitted;
