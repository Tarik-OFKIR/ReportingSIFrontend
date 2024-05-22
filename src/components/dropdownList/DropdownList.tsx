import {IGData} from "../../Modules/IGData.tsx";
import {SC} from "./DropdownStyle.tsx";
import {MenuItem} from "@mui/material";



type DropdownListProps <T extends IGData> = {
    items: T[] ;
    arrName: string;
    handleSelection?: (value: T) => void;

}

function DropdownList<T extends IGData>({ items, arrName, handleSelection }: DropdownListProps<T>) {
    const defaultValue = items.find((item) => item.name === arrName)|| '';
    const randomNumber = Math.floor(Math.random() * 1000);

    return (
        <div>
            <SC.SelectStyle
                defaultValue={defaultValue}
                onChange={(e) => handleSelection && handleSelection(items.find((item) => item.name === e.target.value) as T)}
                key={randomNumber}
            >
                {items.map((item) => {
                return(
                    <MenuItem sx={{ borderRadius: 10 }} key={item.id+randomNumber} value={item.name} >
                        {item.name}
                    </MenuItem>
                )})}
            </SC.SelectStyle>
        </div>
    );
}

export default DropdownList;
