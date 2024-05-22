import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";
import {SC} from "./DateStayle.tsx";
// import  { Dayjs } from 'dayjs';

type DateProps = {
    setDate: (date: Dayjs | null) => void;
    labelName: string;
}

function Date({setDate, labelName}: DateProps) {
    return (

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <SC.DatePickerStyle
                    onChange={setDate}
                    label={labelName}
                />
            </LocalizationProvider>
     

    );
}

export default Date;