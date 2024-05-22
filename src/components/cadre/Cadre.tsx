import {Box, Grid, Paper} from "@mui/material";
import { styled} from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import {MouseEventHandler, MouseEvent} from "react";


const Item = styled(Paper)(({theme}) => {
    return ({
        ...theme.typography.body2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 180,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    });
});

const myMap: string[] = [
    "bpr",
    "succursale",
    "agence",
    "agent",
    // "responsable-bpr",
    // "agent-bpr",
    // "agent-succursale",
    // "agent-agence",
    // "controler-bpr",
    // "controleur-bcp",
    "application",
    "etat"
];
function Cadre() {
    const navigate = useNavigate();
    const handleNavigation = function (path: string): MouseEventHandler<HTMLDivElement> {
        return function (event:MouseEvent<HTMLDivElement>) {
            event.preventDefault()
            navigate(path);
        };
    };
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
        <Grid container spacing={10} justifyContent="center" alignItems="center">

                <Grid item xs={6} >

                        <Box
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                display: 'grid',
                                gridTemplateColumns: {md: '1fr 1fr 1fr '},
                                gap: 3,
                            }}
                        >
                            {myMap.map((key) => (
                                <Item key={key} onClick={handleNavigation("/"+key)} elevation={7}>
                                    {`${key}`}
                                </Item>
                            ))}
                        </Box>

                </Grid>

        </Grid>
        </Box>
    );
}


export default Cadre;