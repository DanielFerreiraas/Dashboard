import React from "react";

import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";

import { Title } from "../../components/common/Title";
import { Input } from "../../components/forms/Input";
import { Form } from "../../components/forms/Form";
import { Button } from "../../components/common/Button";

import { useAuth } from "../../contexts/authContext";

import { login as loginService } from "../../services/authServices";

import styles from './Login.module.css';

interface LoginValues {
    email: string;
    password: string;
}

const initialValues:LoginValues = {
    email: '',
    password: '',
}

const validationSchema = Yup.object().shape({

    email: Yup.string().email('Esse e-mail é inválido!').required('Este e-mail é obrigatório!'),
    password: Yup.string().min(6," A senha deve ter pelo menos 6 caracteres!").required('A senha é obrigatória!')

});


const Login:React.FC = () => {

    const navigate = useNavigate();
    const { login } = useAuth();

    const onSubmit = async (values: LoginValues) => {
        try {
            const user = await loginService(values);
            login(user)
            navigate('/')
        } catch (error) {
            console.log('Erro de não foi possível criar, tente novamente.', error)
            alert('Não foi possível enviar o formulário.')
        }
    
    };
    
    return(
        <div className={styles.formWrapper}>
            <Form
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
            {({ errors, touched }) => (
                <div className={styles.form}>
                <Title>Login</Title>
                <Input
                    label="E-mail"
                    name="email"
                    type="email"
                    errors={errors.email}
                    touched={touched.email}
                />


                <Input
                    label="Password"
                    name="password"
                    type="password"
                    errors={errors.password}
                    touched={touched.password}
                />

                <Button type="submit">Login</Button>
                </div>
            )}
            </Form>
        </div>
    )
}

export default Login;