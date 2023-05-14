import React from "react";

import * as Yup from 'yup';
import { useLocation, useNavigate } from "react-router-dom";

import { Title } from "../../../components/common/Title";
import { Button } from "../../../components/common/Button";
import { Input } from "../../../components/forms/Input";
import { Form } from "../../../components/forms/Form";

import { Portfolios, createOrUpdatePortfolio } from "../../../services/portfoliosServices";

import styles from './CadastrarPortfolio.module.css';

const CadastrarPortfolio: React.FC = () => {


    const navigate = useNavigate();
    const location = useLocation();
    const portfolio = location.state as Portfolios;


    const initialValues: Portfolios = {
        titulo : '',
        imagem : '',
        link : '',
    }

    const validationSchema = Yup.object().shape({

        titulo: Yup.string().required('Campo obrigatório'),
        imagem: Yup.string().required('Campo obrigatório'),
        link: Yup.string().required('Campo obrigatório'),

    });


    const onSubmit = async (values: Portfolios, { resetForm }: { resetForm: () => void }) => {
        try {
            await createOrUpdatePortfolio(values);
            console.log(values);
            resetForm();
            navigate('/portfolio/listagem')
            alert('Formulário enviado com sucesso!');
        } catch (error) {
            console.log(error)
            alert('Erro ao enviar formulário!')
        }
        
    };

    return(
        <div className={styles.formWrapper}>
            <Form
                initialValues={portfolio || initialValues} 
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
            {({ errors, touched }) => ( 
                <div className={styles.form}>

                    {
                        !portfolio ?
                        <Title>Cadastrar portfólios</Title>
                        :
                        <Title>Atualizar Portifólios</Title>
                    }


                    <Input
                        label="Título"
                        name="titulo"
                        errors={errors.titulo}
                        touched={touched.titulo}
                    />

                    <Input
                        label="Imagem"
                        name="imagem"
                        errors={errors.imagem}
                        touched={touched.imagem}
                    />

                    <Input
                        label="Link"
                        name="link"
                        errors={errors.link}
                        touched={touched.link}
                    />

                    <Button type="submit">Salvar</Button>

                </div>
                
            )}
            </Form>
        </div>
    )
}

export default CadastrarPortfolio;