import FormField from "../../../components/Form/FormField.tsx";
import ButtonUI from "../../../components/buttons/ButtonUI.tsx";
import MainNavBar from "../../../components/navbar/MainNavBar.tsx";
import {deleteData, getData, postData} from "../../../servies/api.ts";
import {ChangeEvent, useEffect, useState} from "react";
import {Succursale} from "../../../Modules/Succursale.tsx";
import {SC} from "../StyleFormPages/FormPagesStyles.tsx";
import SearchAutoCompleted from "../../../components/searchField/SearchAutoCompleted.tsx";
import {token} from "../../../utils/Constant.ts";
import {IGData} from "../../../Modules/IGData.tsx";

function SuccursaleFormPage() {
    const [items, setItems] = useState<Succursale[]>([]);
    const [succursaleId, setSuccursaleId] = useState<number>(0);
    const [succursaleName, setSuccursaleName] = useState<string>("");
    const [succursaleCode, setSuccursaleCode] = useState<number>(0);
    const [succursaleCodeBpr, setSuccursaleCodeBpr] = useState<number>(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const succursaleResponse = await getData(token, "/bpr/17/succursales");
                setItems(succursaleResponse);
            } catch (error) {
                console.error('Error fetching succursale data', error);
            }
        };
        fetchData();
    }, [token]);
    
    const onSubmitCreatItem = async () => {
        const postSuccursaleData = async () => {
            try {
                const succursaleResponse = await postData(token, "/addSuccursale", {
                    name: succursaleName,
                    code: succursaleCode,
                    codeBpr: succursaleCodeBpr
                });
                console.log(succursaleResponse);
            } catch (error) {
                console.error('error fetching succursale data', error);
            }
        }
        await postSuccursaleData();
    }

    const onSubmitUpdateItem = async () => {
        try {
            const succursaleResponse = await postData(token, `/updateSuccursale${succursaleId}`, {
                name: succursaleName,
                code: succursaleCode,
                codeBpr: succursaleCodeBpr
            });
            console.log(succursaleResponse);
        } catch (error) {
            console.error('error fetching succursale data', error);
        }

    }
    const onSubmitDeleteItem = async () => {
        try {
            const succursaleResponse = await deleteData(token, `/deleteSuccursale`, {
                id: succursaleId
            });
            console.log(succursaleResponse);
        } catch (error) {
            console.error('error fetching succursale data', error);
        }

    }
    const onSubmitCancelAction = async () => {
        setOpen(false);
    }
    const handleChanges = async (succursale: IGData) => {
        const succursaleTarget = items.find((item) => item.name === succursale.name);
        if (succursaleTarget){
            setOpen(true);
            setSuccursaleId(succursaleTarget.id);
            setSuccursaleName(succursaleTarget.name);
            setSuccursaleCode(succursaleTarget.code);
            setSuccursaleCodeBpr(succursaleTarget.bprId);
        }

    }

    const handleInputName = async (event: ChangeEvent<HTMLInputElement>) => {
        setSuccursaleName(event.target.value);
    }
    const handleInputCode = async (event: ChangeEvent<HTMLInputElement>) => {
        setSuccursaleCode(parseInt(event.target.value));
    }
    const handleInputCodeBpr = async (event: ChangeEvent<HTMLInputElement>) => {
        setSuccursaleCodeBpr(parseInt(event.target.value));
    }

    return (
        <>

            <MainNavBar/>
            <SC.DivStyle>
                <div style={{flexDirection: 'row'}}>
                    <SearchAutoCompleted items={items} arrName={"Succursale"} handleSelection={handleChanges}/>
                    <FormField labelName={"Nome"} massage={"Entrer Nome de succursale"} handleInput={handleInputName} required={true}/>
                    <FormField labelName={"Code"} massage={"Entrer Code de succursale"} handleInput={handleInputCode} required={true}/>
                    <FormField labelName={"Code Bpr"} massage={"Entrer Code Bpr"} handleInput={handleInputCodeBpr} required={true}/>
                </div>
                <div style={{flexDirection:"column",display:"flex", gap:"30px"}}>
                    {!open && <ButtonUI bgColor={"orange"} textColor={"black"} name={"Ajouter"} onClick={onSubmitCreatItem}/>}
                    <ButtonUI bgColor={"orange"} textColor={"black"} name={"Modifier"} onClick={onSubmitUpdateItem}/>
                    <ButtonUI bgColor={"orange"} textColor={"black"} name={"Supprimer"} onClick={onSubmitDeleteItem}/>
                    {open && <ButtonUI bgColor={"#D9D9D9"} textColor={"black"} name={"Annuler"} onClick={onSubmitCancelAction}/>}
                </div>
            </SC.DivStyle>

        </>


    );
}

export default SuccursaleFormPage;