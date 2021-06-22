import { gql } from '@apollo/client';
import React from 'react';
import AppContainer from '../../components/AppContainer';
import Table from '../../components/Table';
import { GQLVar, Course } from '../../types/type';

type LecturerVar = GQLVar;

export default function index(): JSX.Element {
    return (
        <AppContainer>
            <Table<Course, LecturerVar>
                fields="courses"
                gqlVar={{ cursor: '' }}
                gqlGetQuery={gql`
                    query ($after: String) {
                        courses(first: 20, after: $after) {
                            edges {
                                node {
                                    id
                                    name
                                    competency
                                    code
                                    organizing_unit
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
                        formatted: 'Nama'
                    },
                    {
                        name: 'competency',
                        formatted: 'Kompetensi'
                    },
                    {
                        name: 'code',
                        formatted: 'Kode'
                    },
                    {
                        name: 'organizing_unit',
                        formatted: 'Unit yang mengorganisir'
                    }
                ]}
            />
        </AppContainer>
    );
}
