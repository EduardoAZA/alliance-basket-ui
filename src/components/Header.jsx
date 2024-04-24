import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faB, faBars, faClose, faLongArrowAltUp, faSignOut, faU, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
export default function Header() {
    return (
        <>  
            <header className='sticky top-0 w-full bg-white z-100 p-3 shadow-md'>
                <nav className='h-14 flex justify-between items-center pl-4 pr-4'>
                    <Link to="/" className='font-bold text-3xl text-primary-dark'> AllianceBasket</Link>

                    <div className='ml-auto'>
                        <ul className='flex gap-8'>
                            <li>
                                <Link to="/login" className='font-bold text-lg cursor-pointer  text-primary-dark hover:text-meteorite-dark transition-all duration-300 hover:text-xl hover:duration-200'>Criar grupo</Link>
                            </li>
                            <li>
                                <Link to="/login" className='font-bold text-lg cursor-pointer text-primary-dark hover:text-meteorite-dark transition-all duration-300 hover:text-xl hover:duration-200'>Meus grupos</Link>
                            </li>
                            <li>
                                <Link to="/login" className='font-bold text-lg cursor-pointer text-primary-dark hover:text-meteorite-dark transition-all duration-300 hover:text-xl hover:duration-200'>Sobre nós</Link>
                            </li>
                        </ul>

                        <div className='text-xl cursor-pointer'>
                            <FontAwesomeIcon icon={faClose} className='hidden' />
                        </div>
                    </div>

                    <div className='pl-10 flex items-center gap-4 max-[1023px]:absolute top-[1.15rem] right-[1.15rem]'>
                        <Link to="/login" className='border-none outline-none bg-white'> <FontAwesomeIcon icon={faUser} className='text-xl cursor-pointer' /> </Link>
                        <div className='dropdown-menu hidden'>
                            <ul>
                                <li className='flex items-center justify-center'>
                                    <FontAwesomeIcon icon={faUser} className="text-success" />
                                    <a href="">Meu perfil</a>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faSignOut} />
                                    <a href="">Sair</a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <FontAwesomeIcon icon={faBars} className='hidden' />
                        </div>
                    </div>
                </nav>

            </header>


        </>
    )
}   