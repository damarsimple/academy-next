import { gql } from '@apollo/client';
import React from 'react';
import AppContainer from '../../components/AppContainer';
import Table from '../../components/Table';
import { GQLVar, Recognition } from '../../types/type';

type LecturerVar = GQLVar;

export default function index(): JSX.Element {
    return (
        <AppContainer>
            <Table<Recognition, LecturerVar>
                fields="recognitions"
                gqlVar={{ cursor: '' }}
                gqlGetQuery={gql`
                    query ($after: String) {
                        recognitions(first: 20, after: $after) {
                            edges {
                                node {
                                    id
                                    proof
                                    specialty
                                    is_international
                                    is_national
                                    is_local
                                    start_at
                                    finish_at
                                    lecturer {
                                        name
                                    }
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
                        name: ['lecturer', 'name'],
                        formatted: 'Nama Dosen'
                    },
                    {
                        name: 'is_local',
                        formatted: 'Lokal'
                    },
                    {
                        name: 'is_national',
                        formatted: 'Nasional'
                    },
                    {
                        name: 'is_international',
                        formatted: 'Internasional'
                    },
                    {
                        name: 'start_at',
                        formatted: 'Dimulai Pada'
                    },
                    {
                        name: 'finish_at',
                        formatted: 'Selesai Pada'
                    },
                    {
                        name: 'proof',
                        formatted: 'Bukti'
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
