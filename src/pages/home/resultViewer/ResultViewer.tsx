import {useEffect, useState} from "react";
// import ItemListSelection from "../../../components/itemListSelection/ItemListSelection.tsx";
import ButtonUI from "../../../components/buttons/ButtonUI.tsx";
import {SC} from "../ReportActionControl/ButtonPosition.tsx";
import {token} from "../../../utils/Constant.ts";
import CheckboxItem from "../../../components/checkboxItme/CheckboxItem.tsx";
import {SCS} from "./ContentCenter.tsx";
import {FileData} from "../../../Modules/FileData.tsx";
import {postDataFile, postDataTest} from "../../../servies/api.ts";

type ResultViewerProps = {
    applicationName: string
    statName: string
    extinction: string
    startDate: string
    endDate: string
}

function ResultViewer( {applicationName, statName, extinction, startDate, endDate}: ResultViewerProps) {
    const [message, setMessage] = useState<string>("");
    const [checked, setChecked] = useState<string[]>([]);
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const [files, setFiles] = useState<FileData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const listOfFiles = await postDataTest(token, '/folderPath',
                    {
                        applicationName: applicationName,
                        statName: statName,
                        extension: extinction,
                        startDate: startDate,
                        endDate: endDate
                    });
                setFiles(listOfFiles);
                console.log("list of files : "+listOfFiles);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [applicationName, statName, extinction, startDate, endDate]);

    const handleToggleSelectAll = () => {
        if (selectAll) {
            setChecked([]);
        } else {
            setChecked(files.map((item) => item.fileName));
        }
        setSelectAll(!selectAll);
    };

    const handleToggleSelect = (value: string) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        setSelectAll(newChecked.length === files.length);
    };
    const handleToggleImprimer = async () => {
        try {
            const response = await postDataFile(token, '/download',
                {
                    extension: extinction,
                    startDate: startDate,
                    endDate: endDate,
                });
            console.log("response: "+response);
            setMessage("Les documents ont été téléchargés avec succès.");
        } catch (error) {
            console.error("Error downloading file", error);
            setMessage("Erreur lors du téléchargement des documents.");
        }
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
            <div>
                <SCS.ContentCenter>
                    <CheckboxItem
                        item={"Select all"}
                        labelId={"sellect"}
                        checkedBool={selectAll}
                        onClickFunction={handleToggleSelectAll}
                    />
                </SCS.ContentCenter>
                {files.map((item) => {
                    const labelId = `checkbox-list-label-${item}`;
                    return (
                        <CheckboxItem
                            item={item.fileName}
                            labelId={labelId}
                            checkedBool={checked.indexOf(item.fileName) !== -1}
                            onClickFunction={handleToggleSelect(item.fileName)}
                        />
                    );
                })}
            </div>
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