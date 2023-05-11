import api from "./api";

export interface User{
    id: number;
    email: string;
    password:string;
}

export const getUserByEmail = async (email:string) => {
    const response = await api.get('/usuarios', {params: { email }});
    return response.data[0];
}

