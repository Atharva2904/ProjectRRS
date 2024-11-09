"use client"
import React, { useState, useEffect } from 'react'
import { redirect, useRouter } from 'next/navigation';
import local from 'next/font/local';
import { Quicksand, Work_Sans } from 'next/font/google';
import { useRef } from 'react';
import { motion } from 'framer-motion';

const workSans = Work_Sans({ weight: "400", subsets: ["latin"] })

function Page() {
    const router = useRouter()
    const tagRef = useRef(null);
    const [preferences, setPreferences] = useState([]);
    const [userCredentials, setUserCred] = useState({});
    const tags = [
        "Python",
        "Java",
        "C++",
        "JavaScript",
        "HTML",
        "CSS",
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
        "Microprocessors"
    ];


    const handleTagSelection = (tag, index) => {
        const tagElement = document.getElementById(`tag-${index}`);
        setPreferences((prev) => {
            if (prev.includes(tag)) {
                tagElement.style.background = "inherit";
                tagElement.style.color = "black";
                return prev.filter((eachTag) => eachTag !== tag);
            }
            else {
                // tagElement.style.background = "#006d77";
                tagElement.style.background = "linear-gradient(to right, #02c39a, #05668d)";
                tagElement.style.color = "white";
                return [...prev, tag];
            }
        })





    }

    const submitResponse = async (e) => {
        e.preventDefault();
        // const storedCredentials = sessionStorage.getItem('userCredentials');
        // const userCredentials = storedCredentials ? JSON.parse(storedCredentials) : {};
        // const userCredentials = sessionStorage.getItem('userCredentials');
        if (preferences.length < 2) {
            alert("Select two or more preferences");
        }
        else {
            const userCred = {
                ...userCredentials,
                'Preferences': preferences,
            };
            setUserCred(userCred);


            // userCredentials['Preferences'] = preferences;
            sessionStorage.setItem('userCredentials', JSON.stringify(userCred));

            const registerResponse = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userCred),
            });

            const result = await registerResponse.json();
            if (result.success) {
                sessionStorage.setItem('auth', true);
                sessionStorage.setItem('userid', result.userid);
                sessionStorage.setItem('activeUser', userCred.username); // Accessing username directly
                router.push('/home');
            } else {
                console.log('THENGA');
            }

            // router.push('/register');


        }
    }
    useEffect(() => {
        console.log('Selected Preferences:', preferences);
    }, [preferences]);

    useEffect(() => {
        const userCredentials = sessionStorage.getItem('userCredentials');
        console.log(userCredentials);
        if (userCredentials) {
            try {
                const usercred = JSON.parse(userCredentials);
                setUserCred(usercred);
            } catch (error) {
                console.error('Failed to parse user credentials:', error);
            }
        } else {
            console.log('No user credentials found in session storage.');
        }
    }, []);


    return (
        <motion.div
            className={`${workSans.className} login-container flex mx-auto bg-[#134074] justify-center items-center h-screen`}
            initial={{ opacity: 0 }}  // Start invisible
            animate={{ opacity: 1 }}  // Fade in to visible
            transition={{ duration: 0.5 }} // Duration for fade-in effect
        >
            <motion.div
                className="login-div shadow-lg min-h-96 min-w-96 bg-[#eef4ed] rounded-lg z-10 relative"
                initial={{ y: -50 }} // Start from above
                animate={{ y: 0 }} // Slide to original position
                transition={{ duration: 0.5 }} // Duration for slide-in effect
            >
                <h3 className='text-black p-4 text-2xl font-bold text-center'>Preferences</h3>
                <h4 className='text-black p-4 text-xl font-bold text-center'>Select 2 or more preferences</h4>
                <form className="login flex flex-col justify-center p-4" onSubmit={submitResponse}>
                    <div className="flex items-center flex-col justify-between">
                        <ul className='flex flex-wrap max-w-screen-sm w-full gap-4 justify-center'>
                            {tags.map((tag, index) => (
                                <li
                                    key={index}
                                    className='p-2 text-black border-2 rounded border-red hover:cursor-pointer hover:bg-black hover:text-white'
                                    onClick={() => handleTagSelection(tag, index)}
                                    id={`tag-${index}`}
                                >
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button
                        className='login-btn text-center mx-auto bg-[#134074] text-white p-3 rounded-lg mt-4 w-fit shadow-lg hover:bg-[#293241] transition-all duration-300 ease-in-out'
                        type='submit'
                    >
                        Submit
                    </button>
                </form>
            </motion.div>
        </motion.div>
    );
}

export default Page;


/// PREVIOUS CODE

//     return (
//         <div className={`${workSans.className} login-container flex mx-auto bg-gradient-to-br from-[#47126b] via-[#973aa8] to-[#ea698b] justify-center items-center h-screen`}>
//             <div className="login-div shadow-lg min-h-96 min-w-96 bg-gradient-to-br to-[#ff9ebb] from-[#f5e6e8]">
//                 <h3 className='text-black p-4 text-2xl font-bold'> Preferences </h3>
//                 <h4 className='text-black p-4 text-xl font-bold'> Select 2 or more preferences </h4>
//                 <form action="#" className="login flex flex-col justify-center p-4" onSubmit={submitResponse}>
//                     <div className="flex items-center flex-col justify-between">
//                         <ul className='flex flex-wrap max-w-screen-sm w-full gap-4 justify-center '>
//                             {tags.map((tag, index) => (
//                                 <li key={index} className='p-2 text-black border-2 rounded  border-red hover:cursor-pointer hover:bg-black hover:text-white' onClick={() => handleTagSelection(tag, index)} ref={tagRef} id={`tag-${index}`}>{tag}</li>
//                             ))}
//                         </ul>

//                     </div>

//                     {/* <button className='login-btn text-center mx-auto text-black p-2  mt-8 w-fit outline-none outline-black rounded-xl hover:bg-[#293241] hover:text-white' type='submit' > Submit  </button> */}
//                 <button className='login-btn text-center mx-auto text-black p-2  mt-4 w-fit outline-none outline-white rounded-md  hover:scale-105 hover:bg-gradient-to-tl hover:from-[#cbb2fe] hover:to-[#8187dc] hover:text-white transition-transform duration-300 ease-in-out hover:shadow-lg' type='submit'> Submit </button>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default page

/// END OF PREVIOUS CODE
