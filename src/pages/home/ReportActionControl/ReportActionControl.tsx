import ButtonUI from "../../../components/buttons/ButtonUI.tsx";
import { SC } from "./ButtonPosition.tsx";


interface ReportActionControlProps {
    onClick: ()
        => void;
}

function ReportActionControl({onClick} : ReportActionControlProps) {
    // const [hideButtons, setHideButtons] = useState(isVisible);

    // const handleToggleValider = () => {
    //   // setHideButtons(true);
    // };
    const handleToggleAnnule = () => {
    };
    return (
        <>

            <SC.ButtonPosition>
                <ButtonUI
                    name={"Annule"}
                    onClick={handleToggleAnnule}
                    bgColor={"white"}
                    textColor={"black"}
                />
                <ButtonUI
                    name={"Valider"}
                    onClick={onClick}
                    bgColor={"orange"}
                    textColor={"white"}
                />
            </SC.ButtonPosition>

        </>
    );
}

export default ReportActionControl;
