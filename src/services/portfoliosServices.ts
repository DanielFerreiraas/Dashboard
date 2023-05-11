import api from "./api";

export interface Portfolios {
    id?:number;
    titulo: string;
    imagem: string;
    link: string;
}

export const createPortfolio = async (portfolios:Portfolios) =>{
    const response = await api.post('/portfolios', portfolios);
    return response.data
}

export const getPortfolio = async() =>{
    const response = await api.get('/portfolios');
    return response.data;
}

export const updatePortfolio = async (portfolios: Portfolios) => {
    const response = await api.put(`/portfolios/${portfolios.id}`, portfolios);
    return response.data;
}

export const createOrUpdatePortfolio = async (portfolios:Portfolios) => {
    if(portfolios.id === 0){
        return await createPortfolio(portfolios);
    }else{
        return await updatePortfolio(portfolios);
    }
}


export const deletePortfolio = async (id:number) => {
    const response = await api.delete(`/portfolios/${id}`);
    return response.data;
}