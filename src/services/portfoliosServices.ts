import api from "./api";

export interface Portfolios {
    id?:number;
    titulo: string;
    imagem: string;
    link: string;
}

export const createPortfolio = async (portfolios:Portfolios): Promise<Portfolios> =>{
    const response = await api.post('/portfolios', portfolios);
    return response.data
}

export const getPortfolio = async():Promise<Portfolios[]> =>{
    const response = await api.get<Portfolios[]>('/portfolios');
    return response.data;
}

export const updatePortfolio = async (portfolios: Portfolios) => {
    const response = await api.put(`/Portfolios/${portfolios.id}`, portfolios);
    return response.data;
}

export const createOrUpdatePortfolio = async (portfolios:Portfolios): Promise<Portfolios> => {
    if(!portfolios.id){
        return await createPortfolio(portfolios);
    }else{
        return await updatePortfolio(portfolios);
    }
}

export const deletePortfolio = async (id:number | undefined): Promise<Portfolios> => {
    const response = await api.delete<Portfolios>(`/portfolios/${id}`);
    return response.data;
}