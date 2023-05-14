import React from 'react';

import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';

import { Title } from '../../../components/common/Title';
import { Button } from '../../../components/common/Button';

import { Input } from '../../../components/forms/Input';
import { Select } from '../../../components/forms/Select';

import { Experiencias, updateOrCreateExperiencia } from '../../../services/experienciasServices';

import styles from './CadastrarExperiencia.module.css';


const CadastrarExperiencia: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const experiencia = location.state as Experiencias;

    const initialValues: Experiencias = {
    
        titulo: '',
        instituicao: '',
        tipo: '',
        anoInicio: '',
        anoFim: '',

    };

    const validationSchema = Yup.object().shape({

        titulo: Yup.string().required('Campo obrigatório'),
        instituicao: Yup.string().required('Campo obrigatório'),
        tipo: Yup.string().required('Campo obrigatório'),
        anoInicio: Yup.number().required('Campo obrigatório').typeError('Este campo aceita apenas números!'),
        anoFim: Yup.number().required('Campo obrigatório').typeError('Este campo aceita apenas números!'),

    });

    const onSubmit = async (values: Experiencias, { resetForm }: { resetForm: () => void }) => {
        try {
            await updateOrCreateExperiencia(values);
            resetForm();
            navigate('/curriculo/experiencia/listagem');
            alert('Formulário enviado com sucesso!');
        } catch (error) {
            console.log('Erro de não foi possível criar, tente novamente.', error);
            alert('Não foi possível enviar o formulário.');
        }

    };

    return (
        <div className={styles.formWrapper}>
            <Formik
                initialValues={experiencia || initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                {({ errors, touched }) => (
                    <Form className={styles.form}>

                        {
                            !experiencia ? 
                            <Title>Cadastrar Experiências</Title>
                            :
                            <Title>Atualizar Experiências</Title>
                        }

                        <Input
                            label="Título"
                            name="titulo"
                            errors={errors.titulo}
                            touched={touched.titulo}
                        />

                        <Input      
                            label="Instituição"
                            name="instituicao"
                            errors={errors.instituicao}
                            touched={touched.instituicao}
                        />

                        <Select
                            label="Tipo de experiência"
                            name="tipo"
                            options={[
                                { value: "Profissional", label: "Profissional" },
                                { value: "Academica", label: "Acadêmica" },
                                { value: "Certificacoes", label: "Certificações" }
                            ]}
                            errors={errors.tipo}
                            touched={touched.tipo}
                        />

                        <Input
                            label="Ano de Inicio"
                            name="anoInicio"
                            type="number"
                            errors={errors.anoInicio}
                            touched={touched.anoInicio}
                        />

                        <Input
                            label="Ano de Fim"
                            name="anoFim"
                            type="number"
                            errors={errors.anoFim}
                            touched={touched.anoFim}
                        />

                        <Button type="submit">Salvar</Button>

                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CadastrarExperiencia;