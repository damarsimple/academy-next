import { gql } from '@apollo/client';
import React from 'react';
import AppContainer from '../../components/AppContainer';
import Table from '../../components/Table';
import { GQLVar, Student } from '../../types/type';
import moment from 'moment';

type LecturerVar = GQLVar;

export default function index(): JSX.Element {
    return (
        <AppContainer>
            <Table<Student, LecturerVar>
                fields="students"
                gqlVar={{ cursor: '' }}
                gqlGetQuery={gql`
                    query {
                        students(first: 10) {
                            edges {
                                node {
                                    id
                                    name
                                    studyprogram {
                                        name
                                    }
                                    graduation {
                                        job_type
                                        year
                                        is_job_related
                                        has_job
                                        has_job_at
                                    }
                                }
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
                        name: ['studyprogram', 'name'],
                        formatted: 'Program Studi'
                    },
                    {
                        name: ['graduation', 'year'],
                        formatted: 'Tahun Kelulusan'
                    },
                    {
                        name: ['graduation', 'job_type'],
                        formatted: 'Tipe Pekerjaan'
                    },
                    {
                        name: ['graduation', 'is_job_related'],
                        formatted: 'Pekerjaan Related'
                    },
                    {
                        name: ['graduation', 'job_type'],
                        formatted: 'Memiliki Pekerjaan Pada',
                        formatter: (e) => moment(e as string).format('Do MM YYYY')
                    }
                ]}
            />
        </AppContainer>
    );
}
