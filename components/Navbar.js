"use client"
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from './Sidebar';
import Filter from './Filter';
import FontAwesome from 'react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleUser, faFilter, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { DM_Sans } from 'next/font/google';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Navbar.module.css';
import Loading from '@/app/Loading';


import Card from './Card';

const opensans = DM_Sans({ weight: '500', subsets: ['latin-ext'] });
export default function Navbar({ onSearch }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchValue, setSearch] = useState('search')
    const [recommended_books, setRecommendedbooks] = useState(null);
    const [showFilter, setshowFilter] = useState(false);

    const [loading, setLoading] = useState(true);
    // const [selectedTags, setSelectedTags] = useState([]);

    const tagRef = useRef(null);
    const [preferences, setPreferences] = useState([]);
    const tags = [
        "python",
        "java",
        "cplusplus",
        "javaScript",
        "html",
        "css",
        "R",
        "C",
        "C#",
        "Rust",
        "TypeScript",
        "Ruby",
        "Computernetworks",
        "Programming",
        "MachineLearning",
        "DataScience",
        "SoftwareEngineering",
        "WebDevelopment",
        "Database",
        "Cybersecurity",
        "CloudComputing",
        "OperatingSystems",
        "DataStructuresAlgorithms",
        "IoT",
        "ComputerArchitectures",
        "Microprocessors"];

    const router = useRouter();
    const handleTagSelection = (tag, index) => {
        const tagElement = document.getElementById(`tag-${index}`);
        setPreferences((prev) => {
            if (prev.includes(tag)) {
                tagElement.style.background = "#eef4ed";
                tagElement.style.color = "black";
                const updatedPreferences = prev.filter((eachTag) => eachTag !==
                    tag);
                // onTagsChange(updatedPreferences);
                return updatedPreferences;

            }
            else {
                tagElement.style.background = "green";
                tagElement.style.color = "white";
                const updatedPreferences = [...prev, tag];
                // onTagsChange(updatedPreferences);
                return updatedPreferences;
            }
        })
    }

    // const handleTagsChange = (tags) =>{
    //     console.log('In the navbar component triggered handleTagsChange');
    //     setSelectedTags(tags);
    // }

    // Function to toggle the sidebar

    const handleSearch = (Event) => {
        let value = Event.target.value;
        setSearch((Event.target.value));
        console.log(Event.target.value);

        // Event.target.value = value;

        console.log('SearchValue: ', searchValue);




    };
    const handleResetClick = () => {
        setSearch(''); // Reset search value to an empty string
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!searchValue.trim()) return;
        try {

            onSearch(searchValue);
            // setLoading(true);
            router.push(`/search/${decodeURIComponent(searchValue)}`);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            // setLoading(false);
        }


        // try {
        //     const response = await fetch('http://localhost:5000/search', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',

        //         },
        //         body: JSON.stringify({ 'query': searchValue }),
        //     });

        //     const result = await response.json();
        //     let recommended_books = result['recommended'];

        //     setRecommendedbooks(recommended_books)
        //     console.log(recommended_books);

        //     const newResponse = await fetch()

        //     // return <Card {...recommended_books}/>

        // }
        // catch (error) {
        //     console.error('ERROR OCCURED', error);
        // }
    };
    // if (loading) {
    //     return <Loading />;
    // }
    const toggleFilter = () => {
        // setshowFilter((prevShowFilter) => prevShowFilter != showFilter);
        setshowFilter(!showFilter);
        if (showFilter) {
            console.log("I was clicked");
            // return <Filter/>;
        }
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const filterByTags = async () => {
        try {
            const response = await fetch('/api/filter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({ 'tags': preferences }),
            });

            const data = await response.json();

            if (data.success) {


                const searchResults = data['searchRes'];
                console.log(searchResults);
                sessionStorage.setItem('filterResults', JSON.stringify(searchResults));
                router.push('/filterPage');
            }
            else {
                console.log(data.message);
            }

        }
        catch (error) {
            console.error("ERROR while fetching api/filter", error);
        }
    }

    useEffect(() => {
        console.log('I am in Navbar')
        preferences.map((tag, index) => {
            console.log(tag, index);
        })
    }, [preferences]);


    //// OLD CODE
    //     return (
    //         <>
    //             {/* <Helmet>
    //                 <link
    //                     rel="stylesheet"
    //                     href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
    //                 />
    //                 <link rel="preconnect" href="https://fonts.googleapis.com" />
    //                 <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
    //                 <link href="https://fonts.googleapis.com/css2?family=Caudex:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
    //             </Helmet> */}

    //             {/* <nav className={`${opensans.className} flex justify-between gap h-20 w-full p-6 text-black items-center bg-[#140342] text-lg relative `}> */}
    //             <nav className={`${opensans.className} flex justify-between gap h-20 w-full p-6 text-black items-center  text-lg relative border-b-slate-50 border-b bg-gradient-to-l  from-[#160f29] to-[#134074]`}>
    //             {/* <nav className={`${opensans.className} flex justify-between gap h-20 w-full p-6 text-black items-center  text-lg relative border-b-slate-50 border-b bg-transparent`}> */}


    //                 {/* <nav className={`${opensans.className} flex justify-between items-center h-20 w-full p-6 text-black bg-[#140342] text-lg`}> */}
    //                 <div className="openSidebar invert flex items-center">

    //                     {!isSidebarOpen && (
    //                         <button onClick={toggleSidebar} className="sidebar-toggle flex mr-4 items-center">
    //                             <FontAwesomeIcon icon={faBars} className="w-8 h-auto hover:contrast-50 hover:cursor-pointer" />
    //                         </button>
    //                     )}
    //                     {/* <button onClick={toggleSidebar} className="sidebar-toggle">
    //                         <FontAwesomeIcon icon={faBars} className="w-8 h-auto hover:contrast-50  hover:cursor-pointer"/> */}
    //                     {/* <img
    //                             // src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACUCAMAAAAj+tKkAAAAY1BMVEX///8AAAABAQH+/v7n5+fk5OSAgIBMTEzW1taenp4FBQXz8/P6+vrJyclRUVHf39+Pj49eXl6np6e7u7t1dXUhISFra2vBwcEXFxcqKioSEhLt7e1EREQ1NTU/Pz8wMDCxsbHjTyWXAAADBUlEQVR4nO2bCU/jMBCFPXFaWjt3ehIo/P9fiY+EaLVImUB33BXvoypVG8nP48jHvIlSAAAAAAAA/HfoB29UO+ZPMoxtcfsiHELt1SnNbZfdkfvimy2YlypbdntRutIyA+Ov0WV1JGEuVV+wRtjfCI20usiBo9CHuSMyJkugsGEE0PWhPDp9xojLy8j0yyHUuthSlqUQ6AbtZBkBzK+UGUowxK7J55xxF27ElY1kLiYlI4K7lALPDIF1SoG7RYFKDy+pBBJd82V9Wu19Z3x3wpuQtvjXcCZqVb+SCRLlcLOae6MjZ4TdhqKkeEOEOGbxY3zFfk4f5x9/eJ1fGPy/M3OpU/1NaGj/4O2ds1mI29ph/ya8kpjXbc7bb02X1DtR6pV75CRb6lXI7vq/1ZjcgW4809271/fkocUBAAAAAPw+dEy7yyXTQ1Oa7y4ISovthcQzPyIJbQi2kTOcm60oTZ+viEzxXske2z0vneUcTkInDvLyPCeeDaGKhnyWWpqMaLucQ/cCywuZLEESPSPDSW8VxcHHTyx3OeszhlqWDXGcMqxy2kJj3prZMAT6JHoKHyy0umxDqMe3IZIaOfWywIQ2RMaxIRz7JOrC1MuwIVwM8+pzHpSzIcivDDfOCOvo1o3TjJANESSybQinsE0xylXJSbPGXePQtRdZdce2Y9kQn7tam29Eya1KtlMGAAAAAAAAPBahjEW80TXXOgoteoSZntZg+yRqOuD9XSP0Vd3Qz74bQ7HCJ1FqI29DbFaURw37BBWO12bgKdSqOMVcjlyNbczQtJZnQ9htKCoVEjerJF/Kv5z7UKp/nopeZQW6kDCqWN0Ec/Bl/wkEuoFm2BBK5xfXGVkbImJ4OWpvQySJYPBJVjwNkcAKe3AbImSBl2vltR4SeMWjQroNDIFpbAgKdz7vaYihnR7XoDkfP7/+xXc+9e8CWC17iWE1rK/RMpAjrluXkrPUqWQ2xNMKG6LoD9WTKNWpt6zCnnFbqWwuy2AV//liAAAAAAAAAAAAAADA7+ADf98+/0h3NkcAAAAASUVORK5CYII="
    //                             src='https://img.icons8.com/?size=100&id=36389&format=png&color=1A1A1A'
    //                             alt="Menu"
    //                             className="w-10 filter hover:invert transition duration-200 ease-in-out left-0"
    //                         /> */}
    //                     {/* </button> */}
    //                 </div>
    //                 <div className="logo m-0 invert">
    //                     <FontAwesomeIcon icon={faCircleCheck} className='w-8 h-auto' aria-hidden="true" />
    //                     {/*
    //                     Add Logo here
    //                     */}
    //                 </div>
    //                 <div className="search w-4/12 h-12 p-1 text-black border-2 border-black rounded-2xl text-center mt-0 invert justify-center" >
    //                     <div className="box text-black flex justify-around">

    //                         {(
    //                             <FontAwesomeIcon icon={faFilter} aria-hidden="true" className='h-6 p-2 hover:cursor-pointer' onClick={toggleFilter} />

    //                         )}

    //                         <input type='text' placeholder='Search a Book...' className='outline-none bg-transparent placeholder:text-black text-sm' value={searchValue} onClick={handleResetClick} onChange={handleSearch} />
    //                         <button>
    //                             <FontAwesomeIcon icon={faMagnifyingGlass} className='p-2 h-5' onClick={handleSubmit} />
    //                         </button>
    //                     </div>

    //                 </div>
    //                 {/* <button className="submit-btn"></button> */}


    //                 <div className="right invert">
    //                     <ul className='flex gap-10 text-black'>
    //                         <li className='text-black m-auto'><i className="fa fa-sign-out text-black" aria-hidden="true"></i>&nbsp;
    //                             Sign Out
    //                         </li>
    //                         <a href='/profile'>
    //                             <FontAwesomeIcon icon={faCircleUser} className='w-8 h-auto m-0' aria-hidden="true" />
    //                         </a>
    //                     </ul>
    //                 </div>
    //                 {/* {showFilter && <Filter isSet={showFilter} onTagsChange={handleTagsChange} />} */}
    //                 {showFilter &&

    //                     <div className='text-black text-xl absolute flex flex-col justify-between gap-2 top-[100%] left-[35%] shadow-md mt-4 bg-[#eef4ed] opacity-75 h-fit p-4'
    //                     >
    //                         <div className="mb-3 space-y-3">
    //                             <span className='text-sm font-semibold'>Filter by tags</span>
    //                             <ul className='flex flex-wrap gap-4 max-w-2xl w-full'>
    //                                 {tags.map((tag, index) => (
    //                                     <li key={index} className='p-2 text-black border-2 rounded  border-black hover:cursor-pointer hover:bg-black hover:text-white text-sm'
    //                                         onClick={() => handleTagSelection(tag, index)}
    //                                         ref={tagRef} id={`tag-${index}`}>{tag}</li>
    //                                 ))}
    //                             </ul>
    //                             <button className='p-2 text-black border-2 text-sm font-extrabold border-red-400 bg-white hover:bg-green-600 hover:text-white' onClick={filterByTags}> Apply Filters </button>
    //                         </div>
    //                     </div>
    //                 }
    //             </nav>

    //             {isSidebarOpen && (
    //                 <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    //             )}
    //             {/* <Routes>
    //                 <Route
    //                     path="/"
    //                     element={recommended_books ?
    //                         <BookList books={recommended_books} /> :
    //                         <p>Loading books...</p>}  // Show loading message if books are null
    //                 />
    //                 <Route
    //                     path="/book/:id"
    //                     element={recommended_books ?
    //                         <BookDetail books={recommended_books} /> :
    //                         <p>Loading book details...</p>}  // Show loading message if books are null
    //                 />
    //             </Routes> */}
    //             {/* Render Recommended Books
    //             <div id="recommended-books" className="flex flex-wrap justify-center gap-6 mt-10 text-black">
    //             {recommended_books && recommended_books.length > 0 ? (
    //                     recommended_books.map((book, index) => (
    //                         <Card key={index} {...book} />
    //                     ))
    //                 ) : (
    //                     <p>No recommendations available.</p>
    //                 )}
    //             </div> */}
    //         </>
    //     );
    // }


    //// END OF OLD CODE

    return (
        <>
            <nav className={`${opensans.className} flex justify-between items-center h-20 w-full px-6 bg-white/90 text-gray-800 shadow-lg `}>
                <div className="flex items-center ml-[0.5rem]">
                    <button onClick={toggleSidebar} className="mr-4 text-teal-600 hover:text-teal-700">
                        <FontAwesomeIcon icon={faBars} className="w-6 h-6 left-1" />
                    </button>
                    <FontAwesomeIcon icon={faCircleCheck} className="w-8 h-8 ml-[10rem] text-teal-600" />
                </div>

                <div className="flex items-center max-w-100 bg-white rounded-full shadow-inner px-4 py-1 border border-gray-300 w-4/12 h-12 p-1">
                    <FontAwesomeIcon icon={faFilter} className="mr-2 text-teal-600 cursor-pointer p-2" onClick={toggleFilter} />
                    <input
                        type="text"
                        placeholder="Search a Book..."
                        className="flex-grow text-lg text-gray-700 outline-none placeholder-gray-400"
                        value={searchValue}
                        onClick={handleResetClick}
                        onChange={handleSearch}
                    />
                    <button onClick={handleSubmit}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-teal-600 hover:text-teal-700 transition-colors duration-200" />
                    </button>
                </div>

                <ul className="flex items-center gap-6">
                    <li className="text-gray-800 cursor-pointer hover:text-teal-700">
                        <a href="/landing">
                            Sign Out
                            </a>
                        </li>
                    <a href="/profile">
                        <FontAwesomeIcon icon={faCircleUser} className="w-6 h-6 text-teal-600 hover:text-teal-700" />
                    </a>
                </ul>
            </nav>

            {isSidebarOpen && (
                <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
            )}

            {showFilter && (
                <>
                    {/* Overlay to dim background and make it unclickable */}
                    <div className="fixed inset-0 bg-black opacity-50 z-40"></div>

                    {/* Filter Modal */}
                    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-[#eef4ed] p-4 rounded-lg shadow-lg text-gray-800 w-2/3 max-w-xl z-50">
                        <span className="block text-sm font-semibold mb-3">Filter by tags</span>
                        <ul className="flex flex-wrap gap-3">
                            {tags.map((tag, index) => (
                                <li
                                    key={index}
                                    id={`tag-${index}`}
                                    className="px-3 py-1 border rounded border-gray-500 cursor-pointer text-sm hover:bg-teal-600 hover:text-white"
                                    onClick={() => handleTagSelection(tag, index)}
                                >
                                    {tag}
                                </li>
                            ))}
                        </ul>
                        <div className="flex gap-4 mt-4">
                            <button
                                onClick={filterByTags}
                                className="flex-1 py-2 bg-teal-600 text-white font-bold rounded hover:bg-teal-700 transition-colors duration-200"
                            >
                                Apply Filters
                            </button>
                            <button
                                onClick={toggleFilter}
                                className="flex-1 py-2 bg-gray-300 text-gray-700 font-bold rounded hover:bg-gray-400 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
