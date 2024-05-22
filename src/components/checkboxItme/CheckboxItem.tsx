import {Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {SC} from "./DivCenter";

type CheckboxItemProps = {
    item: string;
    labelId: string;
    checkedBool: boolean;
    onClickFunction: () => void;
}

function CheckboxItem({item, labelId, checkedBool, onClickFunction}: CheckboxItemProps) {
    return (
        <SC.DivCenter>
            <List
                sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                }}
            >

                <ListItem key={item} disablePadding>
                    <ListItemButton
                        role={undefined}
                        // onClick={handleToggleSelect(item)}
                        onClick={onClickFunction}
                        dense
                    >
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                // checked={checked.indexOf(item) !== -1}
                                checked={checkedBool}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{"aria-labelledby": labelId}}
                            />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={`${item}`}/>
                    </ListItemButton>
                </ListItem>

            </List>
        </SC.DivCenter>
    );
}

export default CheckboxItem;