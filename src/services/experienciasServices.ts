import api from "./api";

export interface Experiencias{
    id?: number;
    titulo: string;
    tipo: string;
    anoInicio: string | '';
    anoFim: string | '';
}

export const createExperiencia = async (experiencia:Experiencias) => {
    const response = await api.post('/experiencias', experiencia) ;
    return response.data;
}

export const getExperiencia = async () => {
    const response = await api.get('/experiencias');
    return response.data;
}

export const getExperienciaById = async (id:number) => {
    const response = await api.get(`/experiencias/${id}`);
    return response.data;
}

export const updateExperiencia = async (experiencia:Experiencias) => {
    const response = await api.put(`/experiencias/${experiencia.id}`, experiencia);
    return response.data;
}

export const deleteExperiencia = async (id:number | undefined): Promise<Experiencias> => {
    const response = await api.delete<Experiencias>(`/experiencias/${id}}`);
    return response.data;
}

export const updateOrCreateExperiencia = async (experiencia: Experiencias) => {
    if(experiencia.id === 0){
        return await createExperiencia(experiencia);
    }else{
        return await updateExperiencia(experiencia);
    }
}