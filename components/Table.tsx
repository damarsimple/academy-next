import { Popover, Transition } from '@headlessui/react';
import Link from 'next/link';
import React, { Fragment } from 'react';
import { BiMenu } from 'react-icons/bi';
import { FiDelete, FiEdit } from 'react-icons/fi';
import { BaseModel, GQLCursorVar, KeyOf } from '../types/type';

import { useQuery, DocumentNode } from '@apollo/client';

interface MapKeys<T> {
    name: T;
    formatted: string;
}

interface TableProps<T extends BaseModel, C extends GQLCursorVar> {
    headers: MapKeys<KeyOf<T>>[];
    gqlGetQuery: DocumentNode;
    gqlMassDeleteQuery: DocumentNode;
    gqlVar: C;
}

/**
 * the headers props will determine whats data to display
 * @param props.headers receive formatted keyof T
 * @example Person has name    name => formatted
 * @returns JSX.Element
 */

export interface SortData<T> {
    name: T;
    order: 'asc' | 'desc';
}

export default function Table<T extends BaseModel, C extends GQLCursorVar>(
    props: TableProps<T, C>
): JSX.Element {
    const { headers, gqlGetQuery, gqlVar, gqlMassDeleteQuery } = props;

    const { loading, error, data } = useQuery<T[], GQLCursorVar>(gqlGetQuery, {
        variables: gqlVar
    });

    const handleSort = (e: KeyOf<T>, order?: 'asc' | 'desc') => {
        console.log(e, order, gqlMassDeleteQuery);
        return;
    };

    return (
        <table className="min-w-full min-h-full p-4 shadow rounded">
            <thead>
                <tr>
                    {headers.map((header) => (
                        <th key={header.name as string} className="bg-gray-50 hover:bg-gray-100">
                            <Popover className="relative">
                                {() => (
                                    <>
                                        <Popover.Button className="flex justify-between w-full p-4">
                                            <span>{header.formatted}</span>
                                            <BiMenu size="1.5em" />
                                        </Popover.Button>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="opacity-0 translate-y-1"
                                            enterTo="opacity-100 translate-y-0"
                                            leave="transition ease-in duration-150"
                                            leaveFrom="opacity-100 translate-y-0"
                                            leaveTo="opacity-0 translate-y-1">
                                            <Popover.Panel className="absolute z-10">
                                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                                    <div className="relative gap-8 bg-white flex flex-col w-full">
                                                        <button
                                                            onClick={() =>
                                                                handleSort(header.name, 'desc')
                                                            }
                                                            className="w-full hover:bg-gray-100 p-4">
                                                            Urutkan dari Terkecil
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleSort(header.name, 'asc')
                                                            }
                                                            className="w-full hover:bg-gray-100 p-4">
                                                            Urutkan dari Terbesar
                                                        </button>
                                                    </div>
                                                </div>
                                            </Popover.Panel>
                                        </Transition>
                                    </>
                                )}
                            </Popover>
                        </th>
                    ))}
                    <th className="bg-gray-50">AKSI</th>
                </tr>
            </thead>
            <tbody>
                {loading && <tr className="w-full text-center italic px-2">Loading</tr>}
                {error && (
                    <tr className="w-full text-center italic px-2">Error ... {error.message}</tr>
                )}
                {data?.map((cell) => (
                    <tr className="hover:bg-gray-50 p-2" key={cell?.id}>
                        {headers.map((e) => (
                            <td key={e.name as string}>
                                <Link href={'/lecturers/' + cell['id']}>
                                    <a>
                                        <button className="w-full p-4">{cell[e.name]}</button>
                                    </a>
                                </Link>
                            </td>
                        ))}
                        <td className="flex justify-between gap-2 p-2">
                            <input type="checkbox" />
                            <button className="flex justify-center p-2 text-white w-full bg-yellow-500 hover:bg-yellow-600">
                                <FiEdit size="1.5em" />
                            </button>
                            <button className="flex justify-center p-2 text-white w-full bg-red-500 hover:bg-red-600">
                                <FiDelete size="1.5em" />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
