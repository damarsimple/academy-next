import { gql } from '@apollo/client';
import React from 'react';
import AppContainer from '../../components/AppContainer';
import Table from '../../components/Table';
import { GQLVar, Studyprogram } from '../../types/type';

type LecturerVar = GQLVar;

export default function index(): JSX.Element {
    return (
        <AppContainer>
            <Table<Studyprogram, LecturerVar>
                fields="studyprograms"
                gqlVar={{ cursor: '' }}
                gqlGetQuery={gql`
                    query ($after: String) {
                        studyprograms(first: 10, after: $after) {
                            edges {
                                node {
                                    id
                                    name
                                    accreditation
                                    code
                                    type
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
                        formatted: 'Nama Dosen'
                    },
                    {
                        name: 'accreditation',
                        formatted: 'Akreditasi'
                    },
                    {
                        name: 'code',
                        formatted: 'Kode'
                    },
                    {
                        name: 'type',
                        formatted: 'Tipe'
                    }
                ]}
            />
        </AppContainer>
    );
}
