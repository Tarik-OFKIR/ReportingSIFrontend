import {IGData} from "../Modules/IGData.tsx";
import {Application} from "../Modules/Application.tsx";
import {State} from "../Modules/State.tsx";
import {Bpr} from "../Modules/Bpr.tsx";
import {Agency} from "../Modules/Agency.tsx";
import {Succursale} from "../Modules/Succursale.tsx";
import {Agent} from "../Modules/Agent.tsx";

export function mapApplicationToIGData(application: Application[]): IGData[] {
    return application.map((app) => {
        return {
            name: app.name,
            id: app.id,
            code: app.code,
        };
    });
}
export function mapStateToIGData(state: State[]): IGData[] {
    return state.map((stat) => {
        return {
            name: stat.name,
            id: stat.id,
            code: stat.code,
            extension: stat.extension,
        };
    });
}

export function mapBprToIGData(bpr: Bpr[]): IGData[] {
    return bpr.map((bpr) => {
        return {
            name: bpr.name,
            id: bpr.code,
            code: bpr.code,
        };
    });
}
export function mapAgencyToIGData(agency: Agency[]): IGData[] {
    return agency.map((agency) => {
        return {
            name: agency.name,
            id: agency.id,
            code: agency.code,
        };
    });
}
export function mapSuccursaleToIGData(succursale: Succursale[]): IGData[] {
    return succursale.map((succursale) => {
        return {
            name: succursale.name,
            id: succursale.id,
            code: succursale.code,
        };
    });
}
export function mapAgentToIGData(agent: Agent[]): IGData[] {
    return agent.map((agent) => {
        return {
            name: agent.name,
            id: agent.id,
            code: agent.agencyCode,
        };
    });
}


