import { gql } from '@apollo/client';
import React from 'react';
import AppContainer from '../../components/AppContainer';
import Table from '../../components/Table';
import { GQLVar, StudentSelection } from '../../types/type';

type LecturerVar = GQLVar;

export default function index(): JSX.Element {
    return (
        <AppContainer>
            <Table<StudentSelection, LecturerVar>
                fields="student_selections"
                gqlVar={{ cursor: '' }}
                gqlGetQuery={gql`
                    query ($after: String) {
                        student_selections(first: 20, after: $after) {
                            edges {
                                node {
                                    id
                                    year
                                    student {
                                        name
                                    }
                                    is_accepted
                                    is_regular
                                    is_transfer
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
                        name: ['student', 'name'],
                        formatted: 'Nama Mahasiswa'
                    },
                    {
                        name: 'year',
                        formatted: 'Tahun'
                    },
                    {
                        formatted: 'Diterima',
                        name: 'is_accepted'
                    },
                    {
                        formatted: 'Regular',
                        name: 'is_regular'
                    },

                    {
                        formatted: 'Transfer',
                        name: 'is_transfer'
                    }
                ]}
            />
        </AppContainer>
    );
}
