import { gql } from '@apollo/client';
import React from 'react';
import AppContainer from '../../components/AppContainer';
import Table from '../../components/Table';
import { GQLVar, Lecturer } from '../../types/type';

type LecturerVar = GQLVar;

export default function index(): JSX.Element {
    return (
        <AppContainer>
            <Table<Lecturer, LecturerVar>
                fields="lecturers"
                gqlVar={{ cursor: '' }}
                gqlGetQuery={gql`
                    query GetLecturerData($after: String, $where: QueryLecturersWhereWhereConditions) {
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
                                    education_certificate_Int
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
                    query GetLecturerData($year: Int!) {
                        rocketInventory(year: $year) {
                            id
                            model
                            year
                            stock
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
                        formatted: 'Nama Dosen'
                    },
                    {
                        name: 'nidn',
                        formatted: 'NIDN / NIDK'
                    },
                    {
                        name: 'magister_degree',
                        formatted: 'S2'
                    },
                    {
                        name: 'doctor_degree',
                        formatted: 'S3'
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
