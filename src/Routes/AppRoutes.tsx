import React from "react";

import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from '../components/layout';

import { Home } from '../pages/home';
import { CadastrarInformacoes } from '../pages/curriculo/CadastrarInformacoes';
import { CadastrarExperiencia } from '../pages/curriculo/CadastrarExperiencia'
import { ListagemExperiencia } from '../pages/curriculo/ListagemExperiencia';

import { CadastrarPortfolio } from '../pages/portfolio/CadastrarPortfolio';
import { PortfolioListagem } from '../pages/portfolio/PortfolioListagem';

import { useAuth } from "../contexts/authContext";


const AppRoutes:React.FC = () => {

    const { authenticated, isLoading } = useAuth();
    if(isLoading){
        return <h4>carregando...</h4>
    }
    if(!authenticated){
      return <Navigate to='/login'/>
    }
   
    return(
        <Layout>
            <Routes>
                <Route path='/' element={<Home></Home>}></Route>
                <Route path='curriculo/informacoes/cadastro' element={<CadastrarInformacoes></CadastrarInformacoes>}></Route>
                <Route path='curriculo/experiencia/cadastro' element={<CadastrarExperiencia></CadastrarExperiencia>}></Route>
                <Route path='curriculo/experiencia/listagem' element={<ListagemExperiencia></ListagemExperiencia>}></Route>
                <Route path='portfolio/cadastro' element={<CadastrarPortfolio></CadastrarPortfolio>}></Route>
                <Route path='portfolio/listagem' element={<PortfolioListagem></PortfolioListagem>}></Route>
            </Routes>
        </Layout>
    )
}

export default AppRoutes;