import { gql } from '@apollo/client';
import React from 'react';
import AppContainer from '../../components/AppContainer';
import Table from '../../components/Table';
import { GQLVar, Student } from '../../types/type';

type LecturerVar = GQLVar;

export default function index(): JSX.Element {
    return (
        <AppContainer>
            <Table<Student, LecturerVar>
                fields="lecturers"
                gqlVar={{ cursor: '' }}
                gqlGetQuery={gql`
                    query GetLecturerData(
                        $after: String
                        $where: QueryLecturersWhereWhereConditions
                    ) {
                        lecturers(first: 20, after: $after, where: $where) {
                            edges {
                                node {
                                    name
                                    id
                                    nidn
                                    academic_job
                                    doctor_degree
                                    specialty
                                    is_ps_competent
                                    education_certificate_number
                                }
                                cursor
                            }
                            pageInfo {
                                endCursor
                                hasNextPage
                                total
                            }
                        }
                    }
                `}
                gqlMassDeleteQuery={gql`
                    mutation ($id: [ID!]!) {
                        deleteLecturers(id: $id) {
                            id
                        }
                    }
                `}
                headers={[
                    {
                        name: 'id',
                        formatted: 'ID'
                    },
                    {
                        name: 'name',
                        formatted: 'Nama Siswa'
                    },
                    {
                        name: 'specialty',
                        formatted: 'Keahlian Khusus'
                    }
                ]}
            />
        </AppContainer>
    );
}
