import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import styles from './ListagemExperiencia.module.css';

import { Experiencias, deleteExperiencia, getExperiencia } from '../../../services/experienciasServices';

import { Title } from '../../../components/common/Title';


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

    const handleEdit = (experiencias: Experiencias) => {
        navigate('/curriculo/experiencia/cadastro', {state: experiencias})
    }
    
    const handleDelete = async (experiencias: Experiencias) => {
        try {
            await deleteExperiencia(experiencias.id);
            fetchExperiencias();
            alert('Deletado com sucesso!')
        } catch (error) {
            console.log('Erro ao deletar', error)
            alert('Erro ao deletar tente novamente.')
        }
    }

    return (
        <>  
        <Title>Listagem de Experiências</Title>
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Titulo</th>
                    <th>Tipo</th>
                    <th>Ano de inicio</th>
                    <th>Ano de Fim</th>
                    <th>Ação</th>
                </tr>
            </thead>
            <tbody>
                {experiencias.map((experiencia, index) => (
                    <tr key={index}>
                        <td>{experiencia.titulo}</td>
                        <td>{experiencia.tipo}</td>
                        <td>{experiencia.anoInicio}</td>
                        <td>{experiencia.anoFim}</td>
                        <td className={styles.buttonGroup}>
                            <button onClick={() => handleEdit(experiencia)} className={styles.button}>Editar</button>
                            <button onClick={() => handleDelete(experiencia)} className={styles.buttonDelete}>Apagar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}

export default ListagemExperiencia;