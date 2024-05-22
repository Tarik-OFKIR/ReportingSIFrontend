import SearchIcon from "@mui/icons-material/Search";
import {SC} from "./SerchFieldComponentStyled.tsx";





function SearchField( ) {
    return (
        <SC.Search>
            <SC.SearchIconWrapper>
                <SearchIcon/>
            </SC.SearchIconWrapper>
            <SC.StyledInputBase
                placeholder="Search…"
                inputProps={{'aria-label': 'search'}}
            />
        </SC.Search>
    );
}

export default SearchField;