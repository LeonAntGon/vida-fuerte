import Link from "next/link";
import { IoHomeSharp } from "react-icons/io5";
import { FaBookOpen } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { GiSandsOfTime } from "react-icons/gi";
import { CiSettings } from "react-icons/ci";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function Aside(){

    const router = useRouter();
    const [clicked, setClicked ] = useState(false);
    const [activeLink, setActiveLink ] = useState('/');

    const handleClick = () => {
        setClicked(!clicked);
    }
    
    const handleLinkClick = (link) => {
        setActiveLink(link);
        setClicked(false);
    }

    useEffect(() => {
        // update active link state when the page is reloaded
        setActiveLink(router.pathname);
    }, [router.pathname]);
    
    return <>

    <aside className="asideleft">
        <ul>
            <Link href="/">
                <li className={activeLink === '/' ? 'navactive' : ''}
                    onClick={() => handleClick('/')}>
                    <IoHomeSharp/>
                    <span>Panel</span>
                </li>
            </Link>
            <Link href="/blogs">
                <li className={activeLink === '/blogs' ? 'navactive' : ''}
                    onClick={() => handleClick('/blogs')}>
                    <FaBookOpen/>
                    <span>Blogs</span>
                </li>
            </Link>
            <Link href="/blogs/addblog">
                    <li className={activeLink === '/blogs/addblog' ? 'navactive' : ''}
                        onClick={() => handleClick('/blogs/addblog')}>
                    <IoIosAdd/>
                    <span>Agregar</span>
                </li>
            </Link>
            <Link href="/draft">
                    <li className={activeLink === '/draft' ? 'draft' : ''}
                        onClick={() => handleClick('/draft')}>
                    <GiSandsOfTime/>
                    <span>Borradores</span>
                </li>
            </Link>
            <Link href="/setting">
                    <li className={activeLink === '/setting' ? 'navactive' : ''}
                        onClick={() => handleClick('/setting')}>
                    <CiSettings/>
                    <span>Config</span>
                </li>
            </Link>
        </ul>
    </aside>
    </>
}