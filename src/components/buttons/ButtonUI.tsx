
import {Button} from "@mui/material";

type ButtonProps = {
    name: string;
    onClick: () => void;
    textColor?: string;
    bgColor?: string;
};
function ButtonUI({ name, onClick, textColor, bgColor }: ButtonProps)  {
    return (
        <Button
            onClick={onClick}
            size="large"
            sx={{
                height: 50,
                width: 200,
                borderRadius: 20,
                color: textColor,
                backgroundColor: bgColor,
                "&:hover": {
                    backgroundColor: bgColor,
                },
                "@media (max-width: 600px)": {
                    maxWidth: "100%"
                }
            }}
        >
            {name}
        </Button>
    );
}

export default ButtonUI;