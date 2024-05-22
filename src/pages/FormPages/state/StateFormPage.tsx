import FormField from "../../../components/Form/FormField.tsx";
import ButtonUI from "../../../components/buttons/ButtonUI.tsx";
import MainNavBar from "../../../components/navbar/MainNavBar.tsx";
import {getData, postData} from "../../../servies/api.ts";
import {ChangeEvent, useEffect, useState} from "react";
import FormFieldAutoCompleted from "../../../components/Form/FormFieldAutoCompleted.tsx";
import {State} from "../../../Modules/State.tsx";
import {SC} from "../StyleFormPages/FormPagesStyles.tsx";
import {extinction} from "../agency/enums/Enums.tsx";
import SearchAutoCompleted from "../../../components/searchField/SearchAutoCompleted.tsx";
import {token} from "../../../utils/Constant.ts";

function StateFormPage() {
    const [items, setItems] = useState<State[]>([]);
    const [stateId, setStateId] = useState<number>(0);
    const [stateName, setStateName] = useState<string>("");
    const [stateDescription, setStateDescription] = useState<string>("");
    const [stateExtension, setStateExtension] = useState<string>("");
    const [stateApplicationCode, setStateApplicationCode] = useState<number>(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const stateResponse = await getData(token, "/application/474/stats");
                setItems(stateResponse);
            } catch (error) {
                console.error('Error fetching state data', error);
            }
        };
        fetchData();
    }, []);

    const onSubmitCreatItem = async () => {
        const postStateData = async () => {
            try {
                const stateResponse = await postData(token, "/addState", {
                    name: stateName,
                    description: stateDescription,
                    extension: stateExtension,
                    applicationCode: stateApplicationCode
                });
                console.log(stateResponse);
            } catch (error) {
                console.error('error fetching state data', error);
            }
        }
        postStateData();
    }

    const onSubmitUpdateItem = async () => {
        try {
            const stateResponse = await postData(token, `/updateState${stateId}`, {
                name: stateName,
                description: stateDescription,
                extension: stateExtension,
                applicationCode: stateApplicationCode
            });
            console.log(stateResponse);
        } catch (error) {
            console.error('error fetching state data', error);
        }
    }
        const onSubmitDeleteItem = async () => {

        }
        const onSubmitCancelAction = async () => {

        }
        const handleChanges = async (value: State) => {
            setOpen(true);
            setStateId(value.id);
            setStateName(value.name);
            setStateDescription(value.description);
            setStateExtension(value.extension);
            setStateApplicationCode(value.applicationId);
        }

        const handleInputName = async (event: ChangeEvent<HTMLInputElement>) => {
            setStateName(event.target.value);
        }
        const handleInputDescription = async (event: ChangeEvent<HTMLInputElement>) => {
            setStateDescription(event.target.value);
        }
        const handleInputExtension = async (event: ChangeEvent<HTMLInputElement>) => {
            setStateExtension(event.target.value);
        }
        const handleInputApplicationCode = async (event: ChangeEvent<HTMLInputElement>) => {
            setStateApplicationCode(parseInt(event.target.value));
        }

        return (

            <>
                <MainNavBar/>
                <SC.DivStyle>
                    <div style={{flexDirection: 'row'}}>
                        <SearchAutoCompleted items={items} arrName={"state"} handleSelection={handleChanges}/>
                        <FormField labelName={"Nome"} massage={"Entrer le nome d'etat"} handleInput={handleInputName}
                                   required={true}/>
                        <FormField labelName={"description"} massage={"description d'etat"}
                                   handleInput={handleInputDescription} required={true}/>
                        <FormFieldAutoCompleted items={extinction} labelName={"extension"}
                                                massage={"Entrer extension d'etat"} handleInput={handleInputExtension}
                                                required={true}/>
                        <FormField labelName={"Application code"} massage={"Entrer le code de l'application"}
                                   handleInput={handleInputApplicationCode} required={true}/>
                    </div>
                    <div style={{flexDirection: "column", display: "flex", gap: "30px"}}>
                        {!open && <ButtonUI bgColor={"orange"} textColor={"black"} name={"Ajouter"}
                                            onClick={onSubmitCreatItem}/>}
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

    export default StateFormPage;