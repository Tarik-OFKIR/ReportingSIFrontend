import {AppBar, Box, Container, Toolbar} from "@mui/material";
import DropdownList from "../dropdownList/DropdownList.tsx";
import Profile from "../profile/Profile.tsx";


const profiles:string[] = [
    "Responsable BPR",
    "AgentBPR",
    "Contrôleur BPR",
    "Contrôleur BCP",
    "AgentSuccursale",
    "AgentAgence",
    "Administrateur",
];



function MainNavBar() {
    return (
        <AppBar sx={{ background: "#e67900" }}>
            <Container maxWidth={false}>
                <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>

                    <a href="/administration">
                        <img
                            src="./src/assets/logo-bp.svg"
                            alt=""
                            style={{ backgroundColor: "white", width: 200, borderRadius: 30 }}
                        />
                    </a>
                    <Box sx={{ display: "flex" }}>
                        <DropdownList items={profiles} />

                        <Profile name={'Tarik'} />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default MainNavBar;