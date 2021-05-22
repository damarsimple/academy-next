import { gql } from '@apollo/client';
import React from 'react';
import AppContainer from '../../components/AppContainer';
import Table from '../../components/Table';
import { GQLCursorVar, Lecturer } from '../../types/type';

type LecturerVar = GQLCursorVar;

export default function index(): JSX.Element {
    return (
        <AppContainer>
            <Table<Lecturer, LecturerVar>
                gqlVar={{ cursor: '' }}
                gqlGetQuery={gql`
                    query GetRocketInventory($year: Int!) {
                        rocketInventory(year: $year) {
                            id
                            model
                            year
                            stock
                        }
                    }
                `}
                gqlMassDeleteQuery={gql`
                    query GetRocketInventory($year: Int!) {
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
                        name: 'magistrate',
                        formatted: 'S2'
                    },
                    {
                        name: 'doctorate',
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
