import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Title } from '../../../components/common/Title';
import { Table } from '../../../components/common/Table';
import { Column } from '../../../components/common/Table/Table';

import { Portfolios, deletePortfolio, getPortfolio } from '../../../services/portfoliosServices';

import styles from './PortfolioListagem.module.css';

const PortfolioListagem: React.FC = () => {

    const navigate = useNavigate();

    const [portfolios, setPortfolios] = React.useState<Portfolios[]>([]);

    const fetchPortfolios = async () => {
        try {
            const portfolios = await getPortfolio()
            setPortfolios(portfolios)
        } catch (error) {
            console.log('Não foi possível listar os dados, tente novamente!', error)
            alert('Não foi possível listar os dados!')
        }
    }

    useEffect(() => {
        fetchPortfolios()
    }, []);


    const handleEdit = (portfolios: Portfolios) => {
        try {
            if (confirm('Você deseja realmente editar esse produto?'))
                navigate('/portfolio/cadastro', { state: portfolios });
        } catch {

        }
    }

    const handleDelete = async (portfolios: Portfolios) => {
        try {
            if (confirm('Você deseja realmente deletar esse projeto?')) {
                await deletePortfolio(portfolios.id)
                fetchPortfolios();
                alert('Os dados foram deletados com sucesso!')
            }
        } catch (error) {
            console.log(error)
            alert('Não foi possível deletar.')
        }
    }

    const columns: Column<Portfolios>[] = [
        { header: "titulo", acessor: "titulo" },
        { header: "imagem", acessor: "imagem" },
        { header: "link", acessor: "link" },
    ]

    return (
        <>
            <Title>Listagem de Experiências</Title>

            <Table
                columns={columns}
                data={portfolios}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </>
    )
}

export default PortfolioListagem;