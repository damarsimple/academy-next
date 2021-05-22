import { gql } from '@apollo/client';
import React from 'react';
import { Column } from 'react-table';
import AppContainer from '../../components/AppContainer';
import Table from '../../components/Table';
import { GQLCursorVar, Lecturer } from '../../types/type';

interface LecturerVar extends GQLCursorVar {}

export default function index() {
    const data: Lecturer[] = Array(100)
        .fill({
            id: 1,
            name: 'Joko Hermawan',
            nidn: 1,
            doctorate: 'S3 Komputer',
            magistrate: 'S2 AI',
            specialty: 'Menggambar',
            is_conform_with_ps: true,
            academic_job: 'any',
            certificate_education:
                'SAP University Alliance, Jakarta SAP Fundamental Training (Training for Trainers)',
            certificate_industry:
                'SAP University Alliance, Jakarta SAP Fundamental Training (Training for Trainers)'
        })
        .map((e, i) => {
            return { ...e, id: i };
        });

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
