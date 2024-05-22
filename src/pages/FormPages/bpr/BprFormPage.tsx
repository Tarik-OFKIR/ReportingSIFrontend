import FormField from "../../../components/Form/FormField.tsx";
import ButtonUI from "../../../components/buttons/ButtonUI.tsx";
import MainNavBar from "../../../components/navbar/MainNavBar.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import {getData, postData} from "../../../servies/api.ts";
import {Bpr} from "../../../Modules/Bpr.tsx";
import SearchAutoCompleted from "../../../components/searchField/SearchAutoCompleted.tsx";
import {SC} from "../StyleFormPages/FormPagesStyles.tsx";
import {token} from "../../../utils/Constant.ts";
import {mapBprToIGData} from "../../../utils/Mappers.tsx";
import {IGData} from "../../../Modules/IGData.tsx";

function BprFormPage() {
    const [items, setItems] = useState<Bpr[]>([]);
    const [bprName, setBprName] = useState<string>("");
    const [bprCode, setBprCode] = useState<number>(0);
    const [bprAddress, setBprAddress] = useState<string>("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        try {
            const fetchData = async () => {
                const bprResponse = await getData(token, "/bprs");
                setItems(bprResponse);
            };
            fetchData();
        }catch (error) {
            console.error('Error fetching bpr data', error);
        }
    }, []);


    const onSubmitCreatItem = async () => {
        const postBprData = async () => {
            try {
                const bprResponse = await postData(token, "/addBpr", {
                    name: bprName,
                    code: bprCode,
                    address: bprAddress
                });
                console.log(bprResponse);
            } catch (error) {
                console.error('error fetching bpr data', error);
            }
        }
        postBprData();
    }

    const onSubmitUpdateItem = async () => {
        try{
            const bprResponse = await postData(token, `/updateBpr${bprCode}`, {
                name: bprName,
                code: bprCode,
                address: bprAddress
            });
            console.log(bprResponse);
        }catch (error){
            console.error('error fetching bpr data', error);
        }
    }
    const onSubmitDeleteItem = async () => {
        try {
            const bprResponse = await postData(token, "/deleteBpr", {
                code: bprCode
            });
            console.log(bprResponse);
        } catch (error) {
            console.error('error fetching bpr data', error);
        }
    }
    
    const handleChanges = async (bpr: IGData) => {
        const bprTarget = items.find((bprItem) => bprItem.code === bpr.id);
        setOpen(true);
        if (bprTarget){
            setBprName(bprTarget.name);
            setBprCode(bprTarget.code);
            setBprAddress(bprTarget.address);
        }


    }
    const onSubmitCancelAction = async () => {
        setOpen(false);
        setBprName("");
        setBprCode(0);
        setBprAddress("");

    }
    const handleInputName = async (event: ChangeEvent<HTMLInputElement>) => {
        setBprName(event.target.value);
    }
    const handleInputCode = async (event: ChangeEvent<HTMLInputElement>) => {
        setBprCode(parseInt(event.target.value));
    }
    const handleInputAddress = async (event: ChangeEvent<HTMLInputElement>) => {
        setBprAddress(event.target.value);
    }
    return (

        <>
            <MainNavBar/>
            <SC.DivStyle>
                <div style={{flexDirection: 'row'}}>
                    <SearchAutoCompleted items={mapBprToIGData(items)} arrName={"Bpr"} handleSelection={handleChanges}/>
                    <FormField labelName={"Nome Bpr"} massage={"Entrer Nome Bpr"} handleInput={handleInputName} required={true}/>
                    <FormField labelName={"Code Bpr"} massage={"Entrer Code Bpr"} handleInput={handleInputCode} required={true}/>
                    <FormField labelName={"Adresse Bpr"} massage={"Entrer Adresse Bpr"} handleInput={handleInputAddress} required={true}/>
                </div>
                <div style={{flexDirection: "column", display: "flex", gap: "30px"}}>
                    {!open && <ButtonUI bgColor={"orange"} textColor={"black"} name={"Ajouter"} onClick={onSubmitCreatItem}/>}
                    <ButtonUI bgColor={"orange"} textColor={"black"} name={"Modifier"} onClick={onSubmitUpdateItem}/>
                    <ButtonUI bgColor={"orange"} textColor={"black"} name={"Supprimer"} onClick={onSubmitDeleteItem}/>
                    {open && <ButtonUI bgColor={"#D9D9D9"} textColor={"black"} name={"Annuler"} onClick={onSubmitCancelAction}/>}
                </div>
            </SC.DivStyle>
        </>

    );
}

export default BprFormPage;