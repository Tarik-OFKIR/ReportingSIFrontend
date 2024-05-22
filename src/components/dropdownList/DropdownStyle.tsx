import {styled} from "@mui/material/styles";
import {Select} from "@mui/material";

export const SC = {
    SelectStyle: styled(Select)({
        minWidth: 250,
        maxWidth: '100%',
        width: "auto",
        height: 50,
        backgroundColor: "white",
        marginRight: 10,
        borderRadius: 10,
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