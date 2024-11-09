import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping, faFolderOpen, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { userAgent } from "next/server";
// import './Sidebar.css'; // Ensure you have a CSS file for Sidebar styles

export default function Sidebar({ isOpen, onClose }) {
    const router = useRouter();
    const logout = async () => {
        console.log(localStorage.getItem('auth'));
        localStorage.setItem('auth', 'false');

        router.push('/landing');

    }
    const routeHome = () => {
        router.push('/home');
    }
    return (
        // <div className={`sidebar ${isOpen ? "open" : ""} p-24 `}>
        //   <div className={`sidebar fixed top-0 left-0 h-full bg-[#5236c3] border-2 border-gray-600 items-center justify-center w-24 transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full', 'transition duration-100 ease-in-out'}`}>
        // <div className={`fixed top-0 left-0 h-full bg-[#5236c3] border-2 border-gray-600 w-[90px] transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className={`fixed top-0 left-0 h-full bg-black
 border-none w-[90px] transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            {/* Your sidebar content here */}

            {/* <button onClick={onClose} className="close-btn text-black m-2 p-3 w-32 hover:bg-black hover:text-white">Close</button> */}
            <div className="sidebar-content text-white ml-3 mb-1 mt-0">
                {/* <br></br> */}
                <ul className="flex flex-col justify-center ">
                    <li className="mt-3 m-2 p-3 w-32 "><button onClick={onClose} className="close-btn text-white ">
                        <FontAwesomeIcon icon={faBars} className="w-7 h-auto hover:contrast-50  hover:cursor-pointer" />
                    </button></li>
                    <li className="hover:invert hover:text-black w-32 m-2 p-3 "><a href="#home">
                        <FontAwesomeIcon icon={faHouse} aria-hidden="true" className="w-7 h-auto hover:contrast-50  hover:cursor-pointer pr-2" onClick={routeHome} />
                    </a> </li>
                    <li className="hover:invert  hover:text-black w-32 m-2 p-3"><a href="/profile">
                        <FontAwesomeIcon icon={faUser} className="w-7 h-auto  hover:contrast-50 hover:cursor-pointer" />
                    </a></li>
                    <li className=" hover:invert hover:text-black w-32 m-2 p-3"><a href="#services">
                        <FontAwesomeIcon icon={faFolderOpen} className="w-7 h-auto hover:contrast-50  hover:cursor-pointer" />
                    </a></li>
                    <li className=" hover:invert hover:text-black w-32 m-2 p-3"><a href="#">
                        <FontAwesomeIcon icon={faArrowRightFromBracket} className="w-7 h-auto hover:contrast-50  hover:cursor-pointer" onClick={logout} />

                    </a></li>
                </ul>
            </div>
        </div >
    );
}
