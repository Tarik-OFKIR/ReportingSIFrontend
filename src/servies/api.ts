import axios from "axios";
import {proxy} from "../utils/Constant.ts";
export const getData = async (token:string | null, path:string)  => {
    try {
        const response = await axios.get(proxy+path,
            {headers: {"Authorization": `Bearer ${token}`}});
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
export const postData = async (token:string | null,path:string,data:object)  => {
    try {
        const response = await axios.post(proxy+path,data,
            {headers: {"Authorization": `Bearer ${token}`}});
        return response.status;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export const postDataTest = async (token:string | null,path:string,data:object)  => {
    try {
        const response = await axios.post(proxy+path,data,
            {headers: {"Authorization": `Bearer ${token}`}});
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export const putData = async (token:string | null, path:string, data:object)  => {
    try {
        const response = await axios.put(proxy+path,data,
            {headers: {"Authorization": `Bearer ${token}`}});
        return response.status;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export const deleteData = async (token:string | null,path:string,data:object)  => {
    try {
        const response = await axios.delete(proxy+path,
            {headers: {"Authorization": `Bearer ${token}`},data});
        return response.status;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}