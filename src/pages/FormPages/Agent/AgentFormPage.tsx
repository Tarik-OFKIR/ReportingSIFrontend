import FormField from "../../../components/Form/FormField.tsx";
import ButtonUI from "../../../components/buttons/ButtonUI.tsx";
import MainNavBar from "../../../components/navbar/MainNavBar.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import {getData, putData, postData} from "../../../servies/api.ts";
import SearchAutoCompleted from "../../../components/searchField/SearchAutoCompleted.tsx";
import {Agent} from "../../../Modules/Agent.tsx";
import {SC} from "../StyleFormPages/FormPagesStyles.tsx";
import {token} from "../../../utils/Constant.ts";
import {mapAgentToIGData} from "../../../utils/Mappers.tsx";
import {IGData} from "../../../Modules/IGData.tsx";

function AgentFormPage() {
    const [items, setItems] = useState<Agent[]>([]);
    const [agentRegistrationNumber, setAgentRegistrationNumber] = useState<string>("");
    const [agentName, setAgentName] = useState<string>("");
    const [agentCodeAgency, setAgentCodeAgency] = useState<string>("");
    const [open, setOpen] = useState(false);
    const [clear, setClear] = useState<boolean>(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const agentResponse = await getData(token, "/agents");
                setItems(agentResponse);
            } catch (error) {
                console.error('Error fetching agent data', error);
            }
        };
        fetchData();
    }, []);

    const onSubmitCreatItem = async () => {
        const postAgentData = async () => {
            try {
                const agentResponse = await postData(token, "/addAgent", {
                    registrationNumber: agentRegistrationNumber,
                    name: agentName,
                    agencyCode: agentCodeAgency
                });

                console.log(agentResponse);
            } catch (error) {
                console.error('error fetching agent data', error);
            }
        }
        postAgentData();
    }
    const onSubmitUpdateItem = async () => {

        try {
            const agentResponse = await putData(token, "/updateAgent", {
                registrationNumber: agentRegistrationNumber,
                name: agentName,
                agencyCode: agentCodeAgency
            });

            console.log(agentResponse);
        } catch (error) {
            console.error('error fetching agent data', error);
        }
    }
    const onSubmitDeleteItem = async () => {

    }
    const onSubmitCancelAction = async () => {
        setOpen(false);
        setClear(true);
        console.log('cancel action from app: ' + clear);
    }
    const handleChanges = async (agent: IGData) => {
        const agentTarget = items.find((agentItem) => agentItem.id === agent.id);
        setOpen(true);
       if (agentTarget){
           setAgentRegistrationNumber(agentTarget.id.toString());
           setAgentName(agentTarget.name);
           setAgentCodeAgency(agentTarget.agencyCode);
       }

    }

    const handleInputMatriculate = async (event: ChangeEvent<HTMLInputElement>) => {
        setAgentRegistrationNumber(event.target.value);
    }
    const handleInputName = async (event: ChangeEvent<HTMLInputElement>) => {
        setAgentName(event.target.value);
    }
    const handleInputCodeAgency = async (event: ChangeEvent<HTMLInputElement>) => {
        setAgentCodeAgency(event.target.value);
    }
    return (

        <>
            <MainNavBar/>
            <SC.DivStyle>
                <div style={{flexDirection: 'row'}}>
                    <SearchAutoCompleted items={mapAgentToIGData(items)} arrName={"Agent"} handleSelection={handleChanges}/>
                    <FormField labelName={"Matricule"} massage={"Entrer le matricule d'agent"}
                               handleInput={handleInputMatriculate} required={true}/>
                    <FormField labelName={"Nom"} massage={"Entrer le nom d'agent"} handleInput={handleInputName}
                               required={true}/>
                    <FormField labelName={"Code Agence"} massage={"Entrer code d'agence"}
                               handleInput={handleInputCodeAgency} required={true}/>
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

export default AgentFormPage;