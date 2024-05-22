import {styled} from "@mui/material/styles";
import {DatePicker} from "@mui/x-date-pickers";

export const SC = {
    DatePickerStyle: styled(DatePicker)({
        backgroundColor: "white",
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 30,
        boxShadow: "none",
        ".MuiOutlinedInput-notchedOutline": { border: 0 },
        "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            border: 0,
        },
        "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
                border: 0,
            },
    }),
}