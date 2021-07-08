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
                fields="students"
                gqlVar={{ cursor: '' }}
                gqlGetQuery={gql`
                    query ($after: String) {
                        students(first: 20, after: $after) {
                            edges {
                                node {
                                    id
                                    name
                                    nim
                                    is_active
                                    is_foreign
                                    is_fulltime
                                    is_graduated
                                    graduated_at
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
                        name: 'nim',
                        formatted: 'Nim'
                    },
                    {
                        name: 'is_active',
                        formatted: 'Aktif'
                    },
                    {
                        name: 'is_foreign',
                        formatted: 'Asing'
                    },

                    {
                        name: 'is_fulltime',
                        formatted: 'Fulltime'
                    },
                    {
                        name: 'graduated_at',
                        formatted: 'Lulus pada '
                    }
                ]}
            />
        </AppContainer>
    );
}
