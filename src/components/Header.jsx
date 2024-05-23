import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faB, faBars, faChain, faCheck, faClose, faLongArrowAltUp, faSignOut, faU, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import React, { useState } from 'react'
import { useEffect } from 'react';

export default function Header() {

    const [open, setOpen] = useState(false);

    function handleMenuToggle() {
        setOpen(!open);
    }

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    function handleLogout() {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        window.location.href = '/home';
    }

    const { id } = useParams();

    

    return (
        <>
            <header className='sticky top-0 w-full bg-white z-100 p-3 shadow-md'>
                <nav className='h-14 flex justify-between items-center pl-4 pr-4 md:px-10'>
                    {id ? (
                        <Link to={`/home/${id}`} className='font-bold text-3xl text-primary-dark hover:text-primary transition-all duration-300'> AllianceBasket</Link>
                    ) : (
                        <Link to="/home" className='font-bold text-3xl text-primary-dark hover:text-primary transition-all duration-300'> AllianceBasket</Link>
                    )}
                    <div className='ml-auto flex '>
                        <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute gap-5 md:static bg-white md:z-50 z-50 top-[78px] border-t md:border-t-0 pt-8 md:pt-0 left-0 w-full md:w-auto md:pl-0 pl-9 transition-all ease-in ${open ? '' : 'hidden'}`}>
                            {isLoggedIn ? (
                                <>
                                    <li>
                                        <Link to={`/criar-grupo/${id}`} className='font-bold text-lg cursor-pointer text-primary-dark hover:text-meteorite-dark transition-all duration-300 hover:text-xl hover:duration-200'>Criar grupo</Link>
                                    </li>
                                    <li className='max-[767px]:pt-5'>
                                        <Link to="/login" className='font-bold text-lg cursor-pointer text-primary-dark hover:text-meteorite-dark transition-all duration-300 hover:text-xl hover:duration-200'>Meus grupos</Link>
                                    </li>
                                    <li className='max-[767px]:pt-5'>
                                        <Link to="/login" className='font-bold text-lg cursor-pointer text-primary-dark hover:text-meteorite-dark transition-all duration-300 hover:text-xl hover:duration-200'>Sobre nós</Link>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <Link to="/criar-grupo" className='font-bold text-lg cursor-pointer text-primary-dark hover:text-meteorite-dark transition-all duration-300 hover:text-xl hover:duration-200'>Sobre nós</Link>
                                </li>
                            )}
                        </ul>


                    </div>
                    <div className=' flex items-center gap-4 pl-10 '>
                        {isLoggedIn ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger><Link to="/login" className='border-none outline-none bg-white'> <FontAwesomeIcon icon={faUser} className='text-xl cursor-pointer' /> </Link></DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[12rem] flex flex-col max-[500px]:w-[4rem]">
                                    <DropdownMenuLabel className="text-center">Meu perfil</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Link to={`/perfil/${id}`} className='flex items-center gap-3'>
                                            <FontAwesomeIcon icon={faUser} />
                                            Perfil
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link className='flex items-center gap-3' onClick={handleLogout}>
                                            <FontAwesomeIcon icon={faSignOut} />
                                            Sair
                                        </Link>
                                    </DropdownMenuItem>

                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
                                <Link to="/login" className='border-none outline-none bg-white'> <FontAwesomeIcon icon={faUser} className='text-xl cursor-pointer' /> </Link>
                            </>
                        )}

                        <div onClick={() => setOpen(!open)}>
                            <FontAwesomeIcon icon={faBars} className='text-xl cursor-pointer md:hidden ' />
                        </div>
                        
                    </div>
                </nav>

            </header>


        </>
    )
}   