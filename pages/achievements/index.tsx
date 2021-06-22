import { gql } from '@apollo/client';
import React from 'react';
import AppContainer from '../../components/AppContainer';
import Table from '../../components/Table';
import { GQLVar, Achievement } from '../../types/type';

type LecturerVar = GQLVar;

export default function index(): JSX.Element {
    return (
        <AppContainer>
            <Table<Achievement, LecturerVar>
                fields="achievements"
                gqlVar={{ cursor: '' }}
                gqlGetQuery={gql`
                    query ($after: String) {
                        achievements(first: 5, after: $after) {
                            edges {
                                node {
                                    id
                                    name
                                    is_local
                                    is_national
                                    is_international
                                    is_academic
                                    description
                                    start_at
                                    finish_at
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
                        formatted: 'Nama Prestasi Akademik'
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
                        formatted: 'International'
                    },
                    {
                        name: 'is_academic',
                        formatted: 'Akademik'
                    },
                    {
                        name: 'description',
                        formatted: 'Deskripsi'
                    },
                    {
                        name: 'start_at',
                        formatted: 'Dimulai'
                    },
                    {
                        name: 'finish_at',
                        formatted: 'Selesai'
                    }
                ]}
            />
        </AppContainer>
    );
}
