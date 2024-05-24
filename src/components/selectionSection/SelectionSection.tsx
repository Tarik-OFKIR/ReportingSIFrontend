import {SC} from "./BoxStyle.tsx";
import Date from "../date/Date.tsx";
import DropDownListAutoCommitted from "../dropdownList/DropDownListAutoCommitted.tsx";
import {Application} from "../../Modules/Application.tsx";
import {getData} from "../../servies/api.ts";
import {State} from "../../Modules/State.tsx";
import {Dayjs} from "dayjs";
import {useEffect, useState} from "react";
import {token} from "../../utils/Constant.ts";
import {mapApplicationToIGData, mapStateToIGData} from "../../utils/Mappers.tsx";
import {IGData} from "../../Modules/IGData.tsx";

type SelectionSectionProps = {
    fileData: (applicationName: string, statName: string, extinction: string, startDate: string, endDate: string) => void
}

function SelectionSection( {fileData}: SelectionSectionProps) {
    const [application, setApplication] = useState<Application[]>([]);
    const [stat, setStat] = useState<State[]>([]);
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    const [selectedApplicationName, setSelectedApplicationName] = useState<string>();
    const [selectedStatName, setSelectedStatName] = useState<string>();
    const [statExtension, setStatExtension] = useState<string>();
    const [folderName, setFolderName] = useState<string>('');


    useEffect(() => {
        const fetchStatData = async () => {
            try {
                const applicationResponse = await getData(token, '/applications');
                setApplication(applicationResponse);

            } catch (error) {
                console.error('error fetching application data', error);
            }
        };
        fetchStatData();
    }, []);

    const handleApplicationSelection = async (application: IGData) => {
        console.log("app: "+ application.id);
        try {
            const statResponse = await getData(token, `/application/${application.id}/stats`);
            setStat(statResponse);
            console.log("stat: "+ statResponse);
            setSelectedApplicationName(application.name);
        } catch (error) {
            console.error('Error fetching stats:', error);
            setStat([]);
        }
        folderName.concat(application.name);
    }

    const handleStatSelection = async (state: IGData) => {
        const statTarget = stat.find((statItem) => statItem.id === state.id);
        if (statTarget){
            setSelectedStatName(statTarget.name);
            setStatExtension(statTarget.extension);
            console.log("stat: "+ statTarget.extension);
        }

    }

    const handleStartDateChange = (date: Dayjs | null) => {
        if (date) {
            const formattedDate = date.format('DD/MM/YYYY');
            setStartDate(formattedDate);
        }

    };

    const handleEndDateChange = (date: Dayjs | null) => {
        if (date) {
            const formattedDate = date.format('DD/MM/YYYY');
            setEndDate(formattedDate);
        }
    };

    useEffect(() => {
        if (selectedApplicationName && selectedStatName && startDate && endDate && statExtension) {
            const newFolderName = `${selectedApplicationName}\\${selectedStatName}\\startDate:${startDate}\\endDate:${endDate}`;
            setFolderName(newFolderName);
            fileData(selectedApplicationName, selectedStatName,statExtension, startDate, endDate);
        } else {
            setFolderName('');
        }
    }, [selectedApplicationName, selectedStatName, startDate, endDate]);

    return (
        <>
            <SC.BoxStyle>
                <DropDownListAutoCommitted items={mapApplicationToIGData(application)} arrName={"Application"}
                                           handleSelection={handleApplicationSelection} />
                <DropDownListAutoCommitted items={mapStateToIGData(stat)} arrName={"Etats"} handleSelection={handleStatSelection}/>
                <Date setDate={handleStartDateChange} labelName={"Date De Début"}/>
                <Date setDate={handleEndDateChange} labelName={"Date De Fin"}/>
            </SC.BoxStyle>
            <div style={{textAlign:"center"}}>{folderName}</div>
        </>

    );
}

export default SelectionSection;