import React from "react";
import styles from "./CardInformacoes.module.css";

import { Informacoes } from "../../../services/informacoesServices";

interface InformacoesCardProps {
    informacoes: Informacoes;
}

const InformacoesCards:React.FC<InformacoesCardProps> = ({informacoes}) => {
    const {foto, nome , cargo} = informacoes

    return(
        <div className={styles.card}>
            <img src={foto} alt={`${nome}"s foto`} className={styles.foto}/>
                <div className={styles.content}>
                    <h3 className={styles.nome}>{nome}</h3>
                    <h6 className={styles.cargo}>{cargo}</h6>
                </div>
        </div>
    )
}

export default InformacoesCards;