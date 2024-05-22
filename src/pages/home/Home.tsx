import MainNavBar from "../../components/navbar/MainNavBar.tsx";
import SelectionSection from "../../components/selectionSection/SelectionSection.tsx";
import {useState} from "react";
import ReportActionControl from "./ReportActionControl/ReportActionControl.tsx";
import ResultViewer from "./resultViewer/ResultViewer.tsx";


function Home() {

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [applicationName, setApplicationName] = useState<string>('');
    const [statName, setStatName] = useState<string>('');
    const [extinction, setExtinction] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const handleToggleValid = () => {
        setIsVisible(true);
    };

    // const applicationName:string = "app";
    // const statName:string = "Balance BAM";
    // const extinction:string = "pdf";
    // const startDate:string = "2024-05-13";
    // const endDate:string = "2024-05-16";

    const fileData = (applicationName: string, statName: string, extinction: string, startDate: string, endDate: string) => {
        setApplicationName(applicationName);
        setStatName(statName);
        setExtinction(extinction);
        setStartDate(startDate);
        setEndDate(endDate);
    }

    console.log("app: "+ applicationName+" stat: "+statName+" ext: "+extinction+" start: "+startDate+" end: "+endDate);


    return (
        <div>
            <MainNavBar />

            <div style={{ marginTop: "80px" }}>
                <SelectionSection fileData={fileData} />

                {!isVisible && <ReportActionControl onClick={handleToggleValid} />}
            </div>
            {isVisible && <ResultViewer applicationName={applicationName} statName={statName} extinction={extinction} startDate={startDate} endDate={endDate} />}
            <MainNavBar/>
        </div>
    );
}

export default Home;