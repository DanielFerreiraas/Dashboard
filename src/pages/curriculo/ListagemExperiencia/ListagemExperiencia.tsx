import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Title } from '../../../components/common/Title';
import { Column } from '../../../components/common/Table/Table';
import { Table } from '../../../components/common/Table';

import { Experiencias, deleteExperiencia, getExperiencia } from '../../../services/experienciasServices';

const ListagemExperiencia: React.FC = () => {

    const navigate = useNavigate();
    const[experiencias, setExperiencias] = useState<Experiencias[]>([]);

    const fetchExperiencias = async () => {
        try {
            const experiencias = await getExperiencia()
            setExperiencias(experiencias)
        } catch (error) {
            console.log('Não foi possível listar os dados, tente novamente!', error)
            alert('Não foi possível listar os dados!')
        }
    }

    useEffect(()=>{
        fetchExperiencias()
    }, []);

    const handleEdit = (experiencia: Experiencias) => {
        try{
            if(confirm('Você deseja realmente editar esse produto?'))
                navigate('/curriculo/experiencia/cadastro', {state: experiencia})
        }catch{

        }
            
    }
    
    const handleDelete = async (experiencia: Experiencias) => {
        try {
            if(confirm('Você deseja realmente deletar as experiências?')){
                await deleteExperiencia(experiencia.id);
                fetchExperiencias();
                alert('Os dados foram deletados com sucesso!');
            }
        } catch (error) {
            console.log(error)
            alert('Não foi possível deletar.')
        }
    }

    const columns: Column<Experiencias>[] = [
      { header: "titulo", acessor: "titulo" },
      { header: "tipo", acessor: "tipo" },
      { header: "anoInicio", acessor: "anoInicio" },
      { header: "anoFim", acessor: "anoFim" }
    ]

    return (
        <>  
        <Title>Listagem de Experiências</Title>

        <Table
            columns={columns}
            data={experiencias}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
        </>
    )
}

export default ListagemExperiencia;