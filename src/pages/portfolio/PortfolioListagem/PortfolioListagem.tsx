import React, {useEffect, useState} from 'react';

import { useNavigate } from 'react-router-dom';

import { Portfolios, deletePortfolio, getPortfolio } from '../../../services/portfoliosServices';

import styles from './PortfolioListagem.module.css';

const PortfolioListagem: React.FC = () => {

    const navigate = useNavigate();

    const [portfolios, setPortfolios]= React.useState<Portfolios[]>([]);

    const fetchPortfolios = async () => {
        try {
            const portfolios = await getPortfolio()
            setPortfolios(portfolios)
        } catch (error) {
            console.log('Não foi possível listar os dados, tente novamente!', error)
            alert('Não foi possível listar os dados!')
        }
    }

    useEffect(()=>{
        fetchPortfolios()
    }, []);

    
    const handleEdit = (portfolios:Portfolios) => {
        try{
            if(confirm('Você deseja realmente editar esse produto?'))
            navigate('/portfolio/cadastro',{state: portfolios});
        }catch{

        }
    }

    const handleDelete = async (portfolios: Portfolios) => {
        try {
            if(confirm('Você deseja realmente deletar esse projeto?')){
                await deletePortfolio(portfolios.id)
                fetchPortfolios();
                alert('Os dados foram deletados com sucesso!')
            }
        } catch (error) {
            console.log(error)
            alert('Não foi possível deletar.')
        }
    }

    return(
        <>
        <h1 className={styles.title}>Lista de portfólios</h1>
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Título</th>
                    <th>imagem</th>
                    <th>link</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {portfolios.map((portfolio, index)=>(
                    <tr key={index}>
                        <td>{portfolio.titulo}</td>
                        <td>{portfolio.imagem}</td>
                        <td>{portfolio.link}</td>
                        <td className={styles.buttonGroup}>
                            <button onClick={() => handleEdit(portfolio)} className={styles.button}>Editar</button>
                            <button onClick={() => handleDelete(portfolio)} className={styles.buttonDelete}>Apagar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}

export default PortfolioListagem;