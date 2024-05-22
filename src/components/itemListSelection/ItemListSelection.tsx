import {useEffect, useState} from "react";
import CheckboxItem from "../checkboxItme/CheckboxItem.tsx";
import {SC} from "./ContentCenter.tsx";
import {token} from "../../utils/Constant.ts";
import { postDataTest} from "../../servies/api.ts";
import {FileData} from "../../Modules/FileData.tsx";

// const files:string[] = [
//     "document1.csv",
//     "presentation1.pdf",
//     "archive1.zip",
//     "textfile1.txt",
// ];

interface ItemListSelectionProps {
    applicationName: string
    statName: string
    extinction: string
    startDate: string
    endDate: string
}

function ItemListSelection({applicationName, statName, extinction, endDate, startDate}: ItemListSelectionProps) {
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

    return (
        <div>
            <SC.ContentCenter>
                <CheckboxItem
                    item={"Select all"}
                    labelId={"sellect"}
                    checkedBool={selectAll}
                    onClickFunction={handleToggleSelectAll}
                />
            </SC.ContentCenter>
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
    );
}

export default ItemListSelection;