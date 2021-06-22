import { gql } from '@apollo/client';
import React from 'react';
import AppContainer from '../../components/AppContainer';
import Table from '../../components/Table';
import { GQLVar, Pkm } from '../../types/type';

type LecturerVar = GQLVar;

export default function index(): JSX.Element {
    return (
        <AppContainer>
            <Table<Pkm, LecturerVar>
                fields="pkms"
                gqlVar={{ cursor: '' }}
                gqlGetQuery={gql`
                    query ($after: String) {
                        pkms(first: 20, after: $after) {
                            edges {
                                node {
                                    id
                                    title
                                    theme
                                    year
                                    integration_type
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
                        name: 'title',
                        formatted: 'Judul'
                    },
                    {
                        name: 'theme',
                        formatted: 'Tema'
                    },
                    {
                        name: 'year',
                        formatted: 'Tahun'
                    },
                    {
                        name: 'integration_type',
                        formatted: 'Tipe Integrasi'
                    }
                ]}
            />
        </AppContainer>
    );
}
