import { Popover, Transition } from '@headlessui/react';
import Link from 'next/link';
import React, { Fragment, useEffect } from 'react';
import { BiMenu } from 'react-icons/bi';
import { FiDelete, FiEdit, FiPlus } from 'react-icons/fi';
import { BaseModel, Edge, GQLVar, KeyOf, PageInfo } from '../types/type';
import { useQuery, DocumentNode, useMutation } from '@apollo/client';
import { get } from 'lodash';
import { AiOutlineLoading, AiFillWarning } from 'react-icons/ai';

// https://stackoverflow.com/questions/58434389/typescript-deep-keyof-of-a-nested-object

type Cons<H, T> = T extends readonly unknown[]
    ? ((h: H, ...t: T) => void) extends (...r: infer R) => void
        ? R
        : never
    : never;

type Prev = [
    never,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    ...0[]
];

type Leaves<T, D extends number = 10> = [D] extends [never]
    ? never
    : // eslint-disable-next-line @typescript-eslint/ban-types
    T extends object
    ? { [K in keyof T]-?: Cons<K, Leaves<T[K], Prev[D]>> }[keyof T]
    : [];

interface MapKeys<T> {
    name: T;
    formatted: string;
    formatter?: (t: unknown) => string;
}

interface TableProps<T extends BaseModel, C extends GQLVar> {
    headers: MapKeys<KeyOf<T> | Leaves<T, 3>>[];
    gqlGetQuery: DocumentNode;
    gqlMassDeleteQuery: DocumentNode;
    gqlVar: C;
    fields: string;
    url?: string;
    options?: {
        create?: boolean;
    };
    route?: string;
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

export type CursorData<T> = {
    pageInfo: PageInfo;
    edges: Array<Edge<T>>;
};

export enum SORT {
    NEWEST,
    OLDEST
}

export interface Data<T> {
    [fields: string]: CursorData<T>;
}

export default function Table<T extends BaseModel, C extends GQLVar>(
    props: TableProps<T, C>
): JSX.Element {
    const { url, fields, headers, gqlGetQuery, gqlVar, gqlMassDeleteQuery } = props;

    const { loading, error, data, fetchMore, refetch } = useQuery<Data<T>, GQLVar>(gqlGetQuery, {
        variables: gqlVar
    });

    const nodes = data && data[fields]?.edges.map((edge) => edge.node);
    const pageInfo = data && data[fields]?.pageInfo;
    const route = props.route ?? 'admins';
    // useEffect(() => {
    //     let cp: WhereConditions = {
    //         AND: [
    //             {
    //                 column: 'test',
    //                 operator: SqlOperator.Like,
    //                 value: 'test'
    //             }
    //         ]
    //     };

    // }, [WhereCondition]);

    useEffect(() => {
        refetch(gqlVar);
    }, [gqlVar]);

    const getMoreData = () => {
        if (data && pageInfo?.hasNextPage) {
            fetchMore({
                variables: {
                    ...gqlVar,
                    after: data[fields].pageInfo.endCursor
                }
            });

            console.log(data);
        }
    };

    const handleSort = (e: KeyOf<T> | Leaves<T, 3>, order?: 'asc' | 'desc') => {
        console.log(Array.isArray(e) ? e.join('.') : e, order, gqlMassDeleteQuery);
        return;
    };

    const [massDelete] = useMutation(gqlMassDeleteQuery);

    const handleMassDelete = (ids: Array<string | number>) => {
        massDelete({ variables: { id: ids } }).then(() => {
            refetch();
        });
    };

    const OPTION = props.options ?? {
        create: true
    };

    return (
        <div>
            <div className="flex justify-between mb-6">
                <div className="flex gap-4">
                    {OPTION?.create && (
                        <div>
                            <Link href={`/${route}/${url ?? fields}/create`}>
                                <button className="rounded shadow focus-within:flex p-2 text-white w-full bg-green-500 hover:bg-green-600">
                                    <FiPlus size="1.5em" /> Buat
                                </button>
                            </Link>
                        </div>
                    )}
                    <div>
                        <select className="w-56 p-4 shadow rounded">
                            <option value={SORT.OLDEST}>Terlama</option>
                            <option value={SORT.NEWEST}>Terbaru</option>
                        </select>
                    </div>
                </div>
                <div>
                    <input
                        type="text"
                        className="w-56 p-4 shadow rounded"
                        placeholder={'Cari...'}
                    />
                </div>
            </div>
            <table className="min-w-full min-h-full p-4 shadow rounded">
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th
                                key={header.name as string}
                                className="bg-gray-50 hover:bg-gray-100">
                                <Popover className="relative">
                                    {({ open }) => (
                                        <>
                                            <Popover.Button className="flex justify-between w-full p-4">
                                                <span>{header.formatted}</span>
                                                <BiMenu size="1.5em" />
                                            </Popover.Button>
                                            <Transition
                                                show={open}
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
                    {loading && (
                        <tr className="w-full text-center italic px-2">
                            <td colSpan={headers?.length ?? 1} className="flex justify-center">
                                <AiOutlineLoading className="animate-spin" size="2em" />
                            </td>
                        </tr>
                    )}
                    {error && (
                        <tr className="w-full text-center italic px-2">
                            <td colSpan={headers?.length ?? 1} className="flex justify-center">
                                <AiFillWarning size="2em" /> Error ... {error.message}
                            </td>
                        </tr>
                    )}
                    {nodes &&
                        nodes?.map((cell) => (
                            <tr className="hover:bg-gray-50 p-2" key={`${cell?.id}`}>
                                {headers.map((e) => (
                                    <td key={`${cell?.id}-${e.name}-${e.formatted}`}>
                                        <Link href={`/${route}/${fields}/` + cell?.id}>
                                            <a>
                                                <button className="w-full p-4">
                                                    {cell && e.formatter
                                                        ? e.formatter(
                                                              get(
                                                                  cell,
                                                                  Array.isArray(e.name)
                                                                      ? e.name.join('.')
                                                                      : e.name,
                                                                  'Kosong'
                                                              )
                                                          )
                                                        : get(
                                                              cell,
                                                              Array.isArray(e.name)
                                                                  ? e.name.join('.')
                                                                  : e.name,
                                                              'Kosong'
                                                          )?.toString()}
                                                </button>
                                            </a>
                                        </Link>
                                    </td>
                                ))}
                                <td className="flex justify-between gap-2 p-2">
                                    <input type="checkbox" />
                                    <Link href={`/${fields}/` + cell?.id}>
                                        <button className="flex justify-center p-2 text-white w-full bg-yellow-500 hover:bg-yellow-600">
                                            <FiEdit size="1.5em" />
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() =>
                                            handleMassDelete([cell?.id as unknown as number])
                                        }
                                        className="flex justify-center p-2 text-white w-full bg-red-500 hover:bg-red-600">
                                        <FiDelete size="1.5em" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            {pageInfo?.hasNextPage ? (
                <button
                    className="p-4 w-full bg-green-500 hover:bg-green-600 text-white"
                    onClick={getMoreData}>
                    Muat Lebih Banyak...
                </button>
            ) : (
                <div>Data sudah habis...</div>
            )}
        </div>
    );
}
