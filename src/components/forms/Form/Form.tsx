import React from "react";

import * as Yup from 'yup';
import { Formik, Form as FormikForm, FormikHelpers, FormikProps, FormikValues } from 'formik';

import styles from './Form.module.css';

interface FormProps<T> {
    initialValues: T;
    validationSchema: Yup.ObjectSchema<Omit<Partial<T>, "id">>;
    onSubmit: (values: T, formikHelpers:FormikHelpers<T>) => void | Promise<void>;
    children: (formikProps : FormikProps<T>) => React.ReactNode;
}

const Form = <T extends FormikValues>({initialValues, validationSchema, onSubmit, children}: FormProps<T>) => {
    return(
        <div className={styles.formWrapper}>
             <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                {(formikProps) => (
                    <FormikForm>
                        {children(formikProps)}
                    </FormikForm>
                )}
            </Formik>
        </div>
    );
};

export default Form;