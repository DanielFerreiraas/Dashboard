import { getUserByEmail } from "./userServices";

export const login = async (email:string, password: string) => {
    const user = await getUserByEmail(email);

    if(user && user.password === password){
        return user;
    }else{
        throw new Error('E-mail ou senha inválidos!')
    }
}