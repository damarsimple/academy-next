import React from 'react';
import AppContainer from '../../components/AppContainer';
import Form, { StringMap } from '../../components/Form';
import { gql, useMutation } from '@apollo/client';
import { Lecturer } from '../../types/type';
import withRouter, { WithRouterProps } from 'next/dist/client/with-router';
import { BASE_FORMATTED_LECTURER_ATTRIBUTE } from '../../types/base';

const ADD_LECTURER = gql`
    mutation createLecturer(
        $name: String!
        $nidn: String!
        $doctor_degree: String
        $magister_degree: String
        $academic_job: String
        $specialty: String
        $education_certificate_number: String
        $is_ps_competent: Boolean
    ) {
        createLecturer(
            input: {
                name: $name
                nidn: $nidn
                doctor_degree: $doctor_degree
                magister_degree: $magister_degree
                academic_job: $academic_job
                specialty: $specialty
                education_certificate_number: $education_certificate_number
                is_ps_competent: $is_ps_competent
            }
        ) {
            id
        }
    }
`;
function index({ router }: WithRouterProps): JSX.Element {
    const [createLecturer] = useMutation(ADD_LECTURER);
    const handleSubmit = (e: StringMap) => {
        createLecturer({
            variables: e
        }).then((e) => {
            console.log(e);
            router.push('/lecturers/' + e.data.createLecturer?.id);
        });
    };

    return (
        <AppContainer>
            <div>
                <Form attributes={BASE_FORMATTED_LECTURER_ATTRIBUTE} handleChange={handleSubmit} />
            </div>
        </AppContainer>
    );
}

export default withRouter(index);
