import React, {useEffect, useState} from 'react';

import { useNavigate } from 'react-router-dom';

import styles from './PortfolioListagem.module.css';

import { Portfolios, deletePortfolio, getPortfolio } from '../../../services/portfoliosServices';


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
        navigate('/portfolio/cadastro',{state: portfolios});
    }

    const handleDelete = async (index:number) => {
        try {
            await deletePortfolio(index)
            fetchPortfolios();
            alert('Os dados foram deletados com sucesso!')
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
                            <button onClick={() => handleDelete(index)} className={styles.buttonDelete}>Apagar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}

export default PortfolioListagem;