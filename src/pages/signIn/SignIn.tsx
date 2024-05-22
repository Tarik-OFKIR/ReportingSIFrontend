import {useNavigate} from "react-router-dom";
import {Avatar, Box, Button, Container, CssBaseline, TextField, ThemeProvider, Typography} from "@mui/material";
import Copyright from "../../components/copyright/Copyright.tsx";
import defaultTheme from "../../theme/Theme.tsx";
import {useState} from "react";
import {login} from "../../servies/login.ts";


export default function SignIn() {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigatTo = () => {
        navigate("/administration");
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        login(username, password, "/auth/login")
            .then((state) => {if (state === 200) navigatTo()});
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container
                maxWidth="xs"
                sx={{
                    justifyContent: "",
                    backgroundColor: "white",
                }}
            >
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar
                        alt="Travis Howard"
                        src="./src/assets/bcp.png"
                        sx={{m: 1}}
                    />
                    <Typography component="h1" variant="h5">
                        Connexion
                    </Typography>
                    <ThemeProvider theme={defaultTheme}>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{mt: 1}}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Saisissez votre Matricule"
                                name="email"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Saisissez votre mot de passe"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                color={"orange"}

                            >
                                Se connecter
                            </Button>
                        </Box>
                    </ThemeProvider>

                </Box>
                <Copyright sx={{mt: 8, mb: 4}}/>
            </Container>
        </ThemeProvider>
    );
}