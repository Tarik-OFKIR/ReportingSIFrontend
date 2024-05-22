import {Link, Typography} from "@mui/material";

interface CopyrightProps {
    [key: string]: any;
}
function Copyright({Props}:CopyrightProps) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...Props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}
export default Copyright;