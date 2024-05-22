import FormField from "../../../components/Form/FormField.tsx";
import ButtonUI from "../../../components/buttons/ButtonUI.tsx";
import MainNavBar from "../../../components/navbar/MainNavBar.tsx";
import {deleteData, getData, putData, postData} from "../../../servies/api.ts";
import  {ChangeEvent, useEffect, useState} from "react";
import {Application} from "../../../Modules/Application.tsx";
import SearchAutoCompleted from "../../../components/searchField/SearchAutoCompleted.tsx";
import {TextField} from "@mui/material";
import {token} from "../../../utils/Constant.ts";
import {IGData} from "../../../Modules/IGData.tsx";

function ApplicationFormPage() {
    const [items, setItems] = useState<Application[]>([]);
    const [applicationName, setApplicationName] = useState<string>("");
    const [applicationCode, setApplicationCode] = useState<string>("");
    const [open, setOpen] = useState(false);
    const [clear, setClear] = useState<boolean>(false);
    const [id, setId] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const applicationResponse = await getData(token, "/applications");
                setItems(applicationResponse);
            } catch (error) {
                console.error('Error fetching application data', error);
            }
        };
        fetchData();
    }, []);
    const handleChanges = async (application: IGData) => {
        const applicationTarget = items.find((item) => item.name === application.name);
        setOpen(true);
        if (applicationTarget){
            setApplicationName(applicationTarget.name);
            setApplicationCode(applicationTarget.code);
            setId(applicationTarget.id);
        }

    }
    const onSubmitCreatItem = async () => {
        try {
            const applicationResponse = await postData(token, "/addApplication", {
                name: applicationName,
                code: applicationCode
            });
            console.log(applicationResponse);
        } catch (error) {
            console.error('error fetching application data', error);
        }
    }
    const onSubmitUpdateItem = async () => {

        try{
            const applicationResponse = await putData(token, "/updateApplication", {
                id: id,
                code: applicationCode,
                name: applicationName
            });
            console.log(applicationResponse);
        }catch (error){
            console.error('error fetching application data', error);
        }
    }
    const onSubmitDeleteItem = async () => {
        try{
            const id= items.find((item) => item.name === applicationName)?.id
            const applicationResponse = await deleteData(token, `/deleteApplication/${id}`, {});
            console.log(applicationResponse);
        }catch (error){
            console.error('error fetching application data', error);
        }
    }
    const onSubmitCancelAction = async () => {
        setOpen(false);
        setClear(true);
        console.log('cancel action from app: '+ clear);
    }

    const handleInputName = async (event: ChangeEvent<HTMLInputElement>) => {
        setApplicationName(event.target.value);
    }
    const handleInputCode = async (event: ChangeEvent<HTMLInputElement>) => {
        setApplicationCode(event.target.value);
    }
    const handleApplicationNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setApplicationName(event.target.value);
    };
    const handleApplicationCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setApplicationCode(event.target.value);
    }

    return (
        <>
            <MainNavBar/>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '95vh',
                flexDirection: 'row',
                gap: '200px',
            }}>
                <div style={{display: 'flex', flexDirection: 'column', gap: "30px"}}>
                    <SearchAutoCompleted items={items} arrName={"search"} handleSelection={handleChanges}/>
                    {!open && < FormField labelName={"Nom de l’application"} massage={"Entrer Nom de l’application:"}
                                          handleInput={handleInputName} required={true}/>}
                    {!open && <FormField labelName={"Code de l’application"} massage={"Entrer Code de l’application"}
                                         handleInput={handleInputCode} required={true}/>}
                    {open && <TextField sx={{bgcolor:'#fff'}}  value={applicationName} label={"Nom de l’application"} onChange={handleApplicationNameChange}/>}
                    {open && <TextField sx={{bgcolor:'#fff'}} value={applicationCode} label={"Code de l’application"} onChange={handleApplicationCodeChange} />}
                </div>
                <div style={{flexDirection: "column", display: "flex", gap: "30px"}}>
                    {!open && <ButtonUI bgColor={"orange"} textColor={"black"} name={"Ajouter"} onClick={onSubmitCreatItem}/>}
                    <ButtonUI bgColor={"orange"} textColor={"black"} name={"Modifier"}
                              onClick={onSubmitUpdateItem}/>
                    <ButtonUI bgColor={"orange"} textColor={"black"} name={"Supprimer"}
                              onClick={onSubmitDeleteItem}/>
                    {open && <ButtonUI bgColor={"#D9D9D9"} textColor={"black"} name={"Annuler"}
                               onClick={onSubmitCancelAction}/>}
                </div>
            </div>
        </>

    )
        ;
}

export default ApplicationFormPage;