import React from 'react';

import { NavLink } from 'react-router-dom';

import { useAuth } from '../../../contexts/authContext';

import styles from './Siderbar.module.css';

const Sidebar: React.FC = () => {

    const { logout } = useAuth();

    return(
        <>
            <div className={styles.sidebar}>
            <nav className={styles.navigation}>
            <ul>
                <li>
                    <NavLink to='/' className={styles.active}>
                        <h3>Home</h3>
                    </NavLink>
                </li>
            </ul>   
                    <h3>Currículo</h3>
                    <ul>
                        <li className={styles.rows}>
                            <NavLink to='curriculo/informacoes/cadastro' className={styles.active}>
                                Cadastrar Informações
                            </NavLink>
                        </li>
                        <li className={styles.rows}>
                            <NavLink to='curriculo/experiencia/cadastro' className={styles.active}>
                                Cadastrar Experiências
                            </NavLink>
                        </li>
                        <li className={styles.rows}>
                            <NavLink to='curriculo/experiencia/listagem' className={styles.active}>
                                Manipular Experiências
                            </NavLink>
                        </li>
                    </ul>
                    <h3>Portfólio</h3>
                    <ul>
                        <li className={styles.rows}>
                            <NavLink to='portfolio/cadastro' className={styles.active}>
                                Cadastrar Portfólios
                            </NavLink>
                        </li>
                        <li className={styles.rows}>
                            <NavLink to='portfolio/listagem' className={styles.active}>
                                Manipular Portfólios
                            </NavLink>
                        </li>
                    </ul>
                    <ul>
                <li>
                    <NavLink onClick={logout} to='/login' className={styles.active}>
                        <h3>Sair</h3>
                    </NavLink>
                </li>
            </ul>   
            </nav>
            </div>
        </>
    )
}

export default Sidebar;