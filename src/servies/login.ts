import axios from "axios";



export const login = async (username:string, password:string,path:string) => {
    try {
        const response = await axios.post(
            "http://localhost:8080"+path,
            `username=${username}&password=${password}`,
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );
        const token = response.data['access-token'];
        localStorage.setItem('token', token);
        return response.status
    } catch (error) {
        console.error('Error logging in:', error);
    }

};