import {useNavigate} from "react-router-dom";
import {Box, IconButton, Menu, MenuItem, Typography, Tooltip} from "@mui/material";
import React, {useState} from "react";

type ProfileProps = {
    name : string;
};
function Profile({name}:ProfileProps) {

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleLogout = () => {
        navigate("/");
        handleCloseUserMenu();
    };
    return (
        <Box>
            <Tooltip title="Open Setting">
                <IconButton onClick={handleOpenUserMenu}>{name}</IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
}

export default Profile;
