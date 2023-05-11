import React, { useState } from 'react';

import styles from './Home.module.css';

const Home: React.FC = () => {


    return (
        <main className={styles.centralizar}>
            
            <h1>Seja bem vindo ao site de DashBoard do meu portfólio!</h1>
            <h3>Visite meu site pelo link abaixo:</h3>
            <a href="https://portfolio-profissional-ten.vercel.app/">https://portfolio-profissional-ten.vercel.app/</a>
           
        </main>
    )
}

export default Home;