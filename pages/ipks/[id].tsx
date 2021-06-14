import { gql, useMutation, useQuery } from '@apollo/client';
import withRouter, { WithRouterProps } from 'next/dist/client/with-router';
import React from 'react';
import AppContainer from '../../components/AppContainer';
import Form, { StringMap } from '../../components/Form';
import {
    BASE_FORMATTED_LECTURER_ATTRIBUTE,
    BASE_MODEL_ATTRIBUTE,
    lecturerNameMap,
    lecturerRequiredMap,
    lecturerTypeMap
} from '../../types/base';

const UPDATE_LECTURER = gql`
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

const GET_LECTURER = gql`
    query ($id: ID!) {
        lecturer(id: $id) {
            id
            name
            nidn
            doctor_degree
            magister_degree
            academic_job
            specialty
            education_certificate_number
            is_ps_competent
            created_at
            updated_at
        }
    }
`;

function id({ router }: WithRouterProps): JSX.Element {
    const [createLecturer] = useMutation(UPDATE_LECTURER);
    const { id } = router.query;
    const handleSubmit = (e: StringMap) => {
        createLecturer({
            variables: { ...e, id }
        }).then(() => {
            router.push('/lecturers/');
        });
    };

    const { loading, error, data } = useQuery(GET_LECTURER, {
        variables: { id }
    });

    return (
        <AppContainer>
            <div className="p-4">
                {!loading && !error && (
                    <Form
                        attributes={[
                            ...BASE_FORMATTED_LECTURER_ATTRIBUTE.map((e) => {
                                return {
                                    ...e,
                                    type: lecturerTypeMap[e.name] as string,
                                    name: lecturerNameMap[e.name] as string,
                                    required: (lecturerRequiredMap[e.name] as boolean) ?? false,
                                    defaultValue: data?.lecturer[e.name] as string
                                };
                            }),
                            ...BASE_MODEL_ATTRIBUTE.map((e) => {
                                return { ...e, defaultValue: data?.lecturer[e.name] };
                            })
                        ]}
                        handleChange={handleSubmit}
                    />
                )}
            </div>
        </AppContainer>
    );
}

export default withRouter(id);
