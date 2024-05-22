import FormField from "../../../components/Form/FormField.tsx";
import ButtonUI from "../../../components/buttons/ButtonUI.tsx";
import MainNavBar from "../../../components/navbar/MainNavBar.tsx";
import  {ChangeEvent, useEffect, useState} from "react";
import {deleteData, getData, putData, postData} from "../../../servies/api.ts";
import FormFieldAutoCompleted from "../../../components/Form/FormFieldAutoCompleted.tsx";
import {agencyTypeEnum} from "./enums/Enums.tsx";
import {Agency} from "../../../Modules/Agency.tsx";
import SearchAutoCompleted from "../../../components/searchField/SearchAutoCompleted.tsx";
import {SC} from "../StyleFormPages/FormPagesStyles.tsx";
import {Bpr} from "../../../Modules/Bpr.tsx";
import DropDownListAutoCommitted from "../../../components/dropdownList/DropDownListAutoCommitted.tsx";
import {token} from "../../../utils/Constant.ts";
import {mapBprToIGData} from "../../../utils/Mappers.tsx";
import {IGData} from "../../../Modules/IGData.tsx";

function AgencyFormPage() {
    const [items, setItems] = useState<Agency[]>([]);
    const [bprItems, setBprItems] = useState<Bpr[]>([]);
    const [agencyName, setAgencyName] = useState<string>("");
    const [agencyCode, setAgencyCode] = useState<number>(0);
    const [agencyAddress, setAgencyAddress] = useState<string>("");
    const [agencyType, setAgencyType] = useState<string>("");
    const [agencyCodeSuccursale, setAgencyCodeSuccursale] = useState<string>("");
    const [agencyCodeBpr, setAgencyCodeBpr] = useState<string>("");
    const [open, setOpen] = useState(false);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const bprResponse = await getData(token, "/bprs");
                setBprItems(bprResponse);
            } catch (error) {
                console.error('Error fetching agency data', error);
            }
        };
        fetchData();
    }, [token]);

    const handleBarSection = async (bpr: IGData) => {

console.log(bpr.code);
            try {
                const agencyResponse = await getData(token, `/bpr/${bpr.code}/agencies`);
                setItems(agencyResponse);
            } catch (error) {
                console.error('Error fetching agency data', error);
            }

    }

    
    
    const onSubmitCreatItem = async () => {
            try {
                const agencyResponse = await postData(token, "/addAgency", {
                    name: agencyName,
                    code: agencyCode,
                    address: agencyAddress,
                    type: agencyType,
                    codeSuccursale: agencyCodeSuccursale,
                    codeBpr: agencyCodeBpr
                });
                console.log(agencyResponse);
            } catch (error) {
                console.error('error fetching agency data', error);
            }

    }

    const onSubmitUpdateItem = async () => {
        try {
            const agencyResponse = await putData(token, "/updateAgency", {
                name: agencyName,
                code: agencyCode,
                address: agencyAddress,
                type: agencyType,
                codeSuccursale: agencyCodeSuccursale,
                codeBpr: agencyCodeBpr
            });
            console.log(agencyResponse);
        }catch (error){
            console.error('error fetching agency data', error);
        }
    }
    const onSubmitDeleteItem = async () => {
       try{
           
              const agencyResponse = await deleteData(token, `/deleteAgency/${agencyCode}`, {});
              console.log(agencyResponse);
       }catch (error){
           console.error('error fetching agency data', error);
       }
    }
    const onSubmitCancelAction = async () => {
        setOpen(false);
        setAgencyName("");
        setAgencyCode(0);
        setAgencyAddress("");
        setAgencyType("");
        setAgencyCodeSuccursale("");
        setAgencyCodeBpr("");
     
    }

    const handleChanges = async (value: Agency) => {
        setOpen(true);
        setAgencyName(value.name);
        setAgencyCode(value.id);
        setAgencyAddress(value.address);
        setAgencyType(value.type);
        setAgencyCodeSuccursale(value.succursaleId.toString());
        setAgencyCodeBpr(value.bprId.toString());
    }
    
    

    const handleInputName = async (event: ChangeEvent<HTMLInputElement>) => {
        setAgencyName(event.target.value);
    }
    const handleInputCode = async (event: ChangeEvent<HTMLInputElement>) => {
        setAgencyCode(parseInt(event.target.value));
    }
    const handleInputAddress = async (event: ChangeEvent<HTMLInputElement>) => {
        setAgencyAddress(event.target.value);
    }
    const handleInputType = async (event: ChangeEvent<HTMLInputElement>) => {
        setAgencyType(event.target.value);
    }
    const handleInputCodeSuccursale = async (event: ChangeEvent<HTMLInputElement>) => {
        setAgencyCodeSuccursale(event.target.value);
    }
    const handleInputCodeBpr = async (event: ChangeEvent<HTMLInputElement>) => {
        setAgencyCodeBpr(event.target.value);
    }


    return (
        <>
        <MainNavBar/>
            <SC.DivStyle>
                <div style={{flexDirection: 'row'}}>
                    <DropDownListAutoCommitted arrName={"Bpr"} handleSelection={handleBarSection} items={mapBprToIGData(bprItems)}/>
                    <SearchAutoCompleted items={items} arrName={"Agnecy"} handleSelection={handleChanges}/>
                    <FormField labelName={"Nome"} massage={"Entrer le nome d'agence"} handleInput={handleInputName} required={true}/>
                    <FormField labelName={"Code"} massage={"Saisir Code d’agence"} handleInput={handleInputCode} required={true}/>
                    <FormField labelName={"Adresse"} massage={"Entrer Adresse d’agence"} handleInput={handleInputAddress} required={true} />
                    <FormFieldAutoCompleted labelName={"Type d’agence"} massage={"Selectione Type d’agence"} handleInput={handleInputType} items={agencyTypeEnum} required={true}/>
                    <FormField labelName={"Code Succursale"} massage={"Entrer Code Succursale"} handleInput={handleInputCodeSuccursale} required={false}/>
                    <FormField labelName={"Code Bpr"} massage={"Entrer Code Bpr"} handleInput={handleInputCodeBpr} required={true}/>
                </div>
                <div style={{flexDirection:"column",display:"flex", gap:"30px"}}>
                    {!open && <ButtonUI bgColor={"orange"} textColor={"black"} name={"Ajouter"} onClick={onSubmitCreatItem}/>}
                    <ButtonUI bgColor={"orange"} textColor={"black"} name={"Modifier"}
                              onClick={onSubmitUpdateItem}/>
                    <ButtonUI bgColor={"orange"} textColor={"black"} name={"Supprimer"}
                              onClick={onSubmitDeleteItem}/>
                    {open && <ButtonUI bgColor={"#D9D9D9"} textColor={"black"} name={"Annuler"}
                                       onClick={onSubmitCancelAction}/>}
                </div>

            </SC.DivStyle>
        </>



    );
}

export default AgencyFormPage;