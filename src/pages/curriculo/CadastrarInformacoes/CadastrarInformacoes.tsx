import React, { useEffect, useState } from 'react';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { Title } from '../../../components/common/Title';
import { CardInformacoes } from '../CardInformacoes';
import { Input } from '../../../components/forms/Input';
import { Button } from '../../../components/common/Button';

import { Informacoes, updateInformacoes, getInformacoes } from '../../../services/informacoesServices';

import styles from './CadastrarInformacoes.module.css';

const CadastrarInformacoes: React.FC = () => {

    const [informacoes, setInformacoes] = useState<Informacoes>({} as Informacoes);

    const initialValues: Informacoes = {
        foto: '',
        nome: '',
        cargo: '',
    };

    const validationSchema = Yup.object().shape({

        foto: Yup.string().required('Campo obrigatório'),
        nome: Yup.string().required('Campo obrigatório'),
        cargo: Yup.string().required('Campo obrigatório'),

    });

    const fetchInformacoes = async () => {
        try {
            const informacao = await getInformacoes();
            setInformacoes(informacao)
        } catch (error) {
            console.log("erro de requisição", error)
        }
    }
    useEffect(() => {
        fetchInformacoes()
    }, []);

    const onSubmit = async (values: Informacoes, { resetForm }: { resetForm: () => void }) => {

        try {
            await updateInformacoes(values);
            setInformacoes(values);
            console.log(values);
            alert('Formulário enviado com sucesso!');
        } catch (error) {
            console.log('erro ao enviar o formulário, Tente novamente.', error)
            alert("Erro ao enviar formulário, Tente novamente!")
        }

    };

    const handleDelete = async () => {
        try {
            if(confirm('Você deseja realmente deletar as informacões?')){
            await updateInformacoes(initialValues);
            setInformacoes(initialValues);
            alert('Informações deletadas com sucesso!!');
            }
        } catch (error) {
            console.log(error)
            alert('Não foi possível deletar.')
        }
    };

    return (
        <div className={styles.formWrapper}>
            <Formik
                initialValues={informacoes || initialValues}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>

                {({ errors, touched }) => (
                    <Form className={styles.form}>

                        <Title>Cadastra Informações</Title>

                        <Input
                            label="Foto"
                            name="foto"
                            errors={errors.foto}
                            touched={touched.foto}
                        />

                        <Input
                            label="Nome"
                            name="nome"
                            errors={errors.nome}
                            touched={touched.nome}
                        />

                        <Input
                            label="Cargo"
                            name="cargo"
                            errors={errors.cargo}
                            touched={touched.cargo}
                        />

                        <Button type="submit">Salvar</Button>

                    </Form>
                )}
            </Formik>

                    {informacoes &&
                        <div className={styles.cardContainer}>
                            <CardInformacoes informacoes={informacoes} />
                            <Button type="button" onClick={handleDelete} red>Deletar</Button>
                        </div>
                    }
        </div>
    )
};

export default CadastrarInformacoes;