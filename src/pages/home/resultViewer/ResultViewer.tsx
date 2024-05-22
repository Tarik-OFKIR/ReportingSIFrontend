import {useState} from "react";
import ItemListSelection from "../../../components/itemListSelection/ItemListSelection.tsx";
import ButtonUI from "../../../components/buttons/ButtonUI.tsx";
import {SC} from "../ReportActionControl/ButtonPosition.tsx";

type ResultViewerProps = {
    applicationName: string
    statName: string
    extinction: string
    startDate: string
    endDate: string
}

function ResultViewer( {applicationName, statName, extinction, startDate, endDate}: ResultViewerProps) {
    const [message, setMessage] = useState<string>("");
    const handleToggleImprimer = () => {
        setMessage("Les documents ont été téléchargés avec succès.");
    };
    const handleToggleAnnule = () => {
    };
    return (
        <div>
            {message && (
                <p style={{display: "flex", justifyContent: "center", color: "green"}}
                >
                    {message}
                </p>
            )}
            <ItemListSelection applicationName={applicationName} statName={statName} extinction={extinction} startDate={startDate} endDate={endDate}/>
            <SC.ButtonPosition>
                <ButtonUI
                    name={"Annule"}
                    onClick={handleToggleAnnule}
                    bgColor={"white"}
                    textColor={"black"}
                />
                <ButtonUI
                    name={"Imprimer"}
                    onClick={handleToggleImprimer}
                    bgColor={"orange"}
                    textColor={"white"}
                />
            </SC.ButtonPosition>
        </div>
    );
}

export default ResultViewer;