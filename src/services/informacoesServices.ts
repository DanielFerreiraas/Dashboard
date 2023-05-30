import api from "./api";

export interface Informacoes{
    id?:number;
    foto: string;
    nome:string;
    cargo: string;
}

export const createInformacoes = async (informacao:Informacoes): Promise<Informacoes> => {
    const response = await api.post<Informacoes>('/informacoes', informacao) ;
    return response.data;
}

export const updateInformacoes= async (informacao:Informacoes) : Promise<Informacoes> => {
   const response = await api.put<Informacoes>("/informacoes/1", informacao);
   return response.data
}

export async function getInformacoes() : Promise<Informacoes>{
    const response = await api.get<Informacoes>("/informacoes/1");
    return response.data
 }

 export async function deleteInformacoes(id:number | undefined): Promise<Informacoes>{
    const response = await api.delete<Informacoes>(`/informacoes/1`);
    return response.data;
}

export const updateOrCreateInformacoes = async (informacao: Informacoes): Promise<Informacoes> => {
    if(!informacao.id){
        return await createInformacoes(informacao);
    }else{
        return await updateInformacoes(informacao);
    }
}