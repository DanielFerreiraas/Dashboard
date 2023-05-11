import React from 'react';

import styles from './Header.module.css';

const Header: React.FC = () => {
    return(
    
        <header className={styles.header}>
                <h2 className={styles.logo}>Dashboard</h2>
        </header>
    )
}

export default Header;