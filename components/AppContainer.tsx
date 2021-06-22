import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { FiActivity, FiBook, FiChevronDown, FiUserPlus, FiUsers } from 'react-icons/fi';
import { AiFillClockCircle, AiOutlinePlus } from 'react-icons/ai';
import { FaUsers, FaVoteYea } from 'react-icons/fa';
import { GiShakingHands } from 'react-icons/gi';
import { BiPlanet } from 'react-icons/bi';
import { MdGrade } from 'react-icons/md';
import { RiArticleLine, RiStarSFill, RiSurveyLine } from 'react-icons/ri';
import { Disclosure } from '@headlessui/react';
type Children = JSX.Element | JSX.Element[];

interface ContainerProp {
    children?: Children;
}

interface SubMenu {
    name: string;
    url: string;
    icon: Children;
}

interface Menu {
    icon: Children;
    name: string;
    menus: SubMenu[];
}

const AppMenu: Menu[] = [
    {
        name: 'Dosen',
        icon: <FiUsers size="1.5em" />,
        menus: [
            {
                name: 'Data',
                url: '/lecturers',
                icon: <FiUsers size="1.5em" />
            },
            {
                name: 'Buat',
                url: '/lecturers/create',
                icon: <FiUserPlus size="1.5em" />
            }
        ]
    },
    {
        name: 'Studi Program',
        icon: <FiBook size="1.5em" />,
        menus: [
            {
                name: 'Data',
                url: '/studyprograms',
                icon: <FiBook size="1.5em" />
            },
            {
                name: 'Buat',
                url: '/studyprograms/create',
                icon: <AiOutlinePlus size="1.5em" />
            }
        ]
    },
    {
        name: 'Siswa',
        icon: <FaUsers size="1.5em" />,
        menus: [
            {
                name: 'Data',
                url: '/students',
                icon: <FaUsers size="1.5em" />
            },
            {
                name: 'Buat',
                url: '/students/create',
                icon: <AiOutlinePlus size="1.5em" />
            }
        ]
    },
    {
        name: 'Kerjasama',
        icon: <GiShakingHands size="1.5em" />,
        menus: [
            {
                name: 'Data',
                url: '/cooperations',
                icon: <GiShakingHands size="1.5em" />
            },
            {
                name: 'Buat',
                url: '/cooperations/create',
                icon: <AiOutlinePlus size="1.5em" />
            }
        ]
    },
    {
        name: 'PKM',
        icon: <FiActivity size="1.5em" />,
        menus: [
            {
                name: 'Data',
                url: '/pkms',
                icon: <FiActivity size="1.5em" />
            },
            {
                name: 'Buat',
                url: '/pkms/create',
                icon: <AiOutlinePlus size="1.5em" />
            }
        ]
    },
    {
        name: 'Artikel',
        icon: <RiArticleLine size="1.5em" />,
        menus: [
            {
                name: 'Data',
                url: '/articles',
                icon: <RiArticleLine size="1.5em" />
            },
            {
                name: 'Buat',
                url: '/articles/create',
                icon: <AiOutlinePlus size="1.5em" />
            }
        ]
    },
    {
        name: 'Survey',
        icon: <RiSurveyLine size="1.5em" />,
        menus: [
            {
                name: 'Data',
                url: '/surveys',
                icon: <RiSurveyLine size="1.5em" />
            },
            {
                name: 'Buat',
                url: '/surveys/create',
                icon: <AiOutlinePlus size="1.5em" />
            }
        ]
    },
    {
        name: 'Pengakuan',
        icon: <RiStarSFill size="1.5em" />,
        menus: [
            {
                name: 'Data',
                url: '/recognitions',
                icon: <RiStarSFill size="1.5em" />
            },
            {
                name: 'Buat',
                url: '/recognitions/create',
                icon: <AiOutlinePlus size="1.5em" />
            }
        ]
    },
    {
        name: 'Mata Kuliah',
        icon: <FiBook size="1.5em" />,
        menus: [
            {
                name: 'Data',
                url: '/courses',
                icon: <FiBook size="1.5em" />
            },
            {
                name: 'Buat',
                url: '/courses/create',
                icon: <AiOutlinePlus size="1.5em" />
            }
        ]
    },
    {
        name: 'Seleksi Mahasiswa',
        icon: <FaVoteYea size="1.5em" />,
        menus: [
            {
                name: 'Data',
                url: '/selections',
                icon: <FaVoteYea size="1.5em" />
            },
            {
                name: 'Buat',
                url: '/selections/create',
                icon: <AiOutlinePlus size="1.5em" />
            }
        ]
    },
    // {
    //     name: 'IPK',
    //     icon: <MdGrade size="1.5em" />,
    //     menus: [
    //         {
    //             name: 'Data',
    //             url: '/ipks',
    //             icon: <MdGrade size="1.5em" />
    //         },
    //         {
    //             name: 'Buat',
    //             url: '/ipks/create',
    //             icon: <AiOutlinePlus size="1.5em" />
    //         }
    //     ]
    // },
    // {
    //     name: 'Mahasiswa Asing',
    //     icon: <BiPlanet size="1.5em" />,
    //     menus: [
    //         {
    //             name: 'Data',
    //             url: '/foreigns',
    //             icon: <BiPlanet size="1.5em" />
    //         },
    //         {
    //             name: 'Buat',
    //             url: '/foreigns/create',
    //             icon: <AiOutlinePlus size="1.5em" />
    //         }
    //     ]
    // },
    {
        name: 'Prestasi Akademik Mahasiswa',
        icon: <RiStarSFill size="1.5em" />,
        menus: [
            {
                name: 'Data',
                url: '/achievements',
                icon: <RiStarSFill size="1.5em" />
            },
            {
                name: 'Buat',
                url: '/achievements/create',
                icon: <AiOutlinePlus size="1.5em" />
            }
        ]
    },
    {
        name: 'Waktu Tunggu Lulusan',
        icon: <AiFillClockCircle size="1.5em" />,
        menus: [
            {
                name: 'Data',
                url: '/waitingtimes',
                icon: <AiFillClockCircle size="1.5em" />
            },
            {
                name: 'Buat',
                url: '/waitingtimes/create',
                icon: <AiOutlinePlus size="1.5em" />
            }
        ]
    }
];

export default function AppContainer(props: ContainerProp): JSX.Element {
    const { children } = props;
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="grid grid-cols-12 h-screen">
                <div className="col-span-3 shadow rounded max-h-screen overflow-y-auto">
                    <Link href="/">
                        <a>
                            <button className="w-full flex gap-2 py-4 text-2xl font-semibold px-4">
                                SISTEM LKPS
                            </button>
                        </a>
                    </Link>
                    <ul className="flex flex-col">
                        {AppMenu.map((e) => (
                            <li key={e.name}>
                                <Disclosure>
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="w-full flex justify-between p-4 bg-gray-50 hover:bg-gray-100">
                                                <div>{e.icon}</div>
                                                <span>{e.name}</span>
                                                <FiChevronDown
                                                    className={`${
                                                        open ? 'transform rotate-180' : ''
                                                    } w-5 h-5 text-purple-500`}
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="text-md">
                                                <ul>
                                                    {e.menus.map((e) => (
                                                        <li key={e.name} className="pl-4">
                                                            <Link href={e.url}>
                                                                <a className="flex w-full gap-4 hover:bg-gray-50 shadow rounded p-4">
                                                                    <div>{e.icon}</div>
                                                                    <span>{e.name}</span>
                                                                </a>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="col-span-9 h-screen overflow-y-auto p-10">
                    <div className="min-h-full min-w-full">
                        <div className="rounded shadow  p-4 min-h-full min-w-full">{children}</div>
                        <footer className="text-center p-4">
                            <a
                                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                                target="_blank"
                                rel="noopener noreferrer">
                                Powered by{' '}
                                <span>
                                    <Image
                                        src="/vercel.svg"
                                        alt="Vercel Logo"
                                        width={72}
                                        height={16}
                                    />
                                </span>
                            </a>
                        </footer>
                    </div>
                </div>
            </main>
        </div>
    );
}
