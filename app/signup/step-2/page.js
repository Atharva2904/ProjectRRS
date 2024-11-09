"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import local from 'next/font/local';
import { Quicksand, Work_Sans } from 'next/font/google';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import { motion } from 'framer-motion';

const workSans = Work_Sans({ weight: "400", subsets: ["latin"] })

function Step2() {
    const [userFname, setUserFName] = useState('');
    const [userLName, setUserLName] = useState('');
    const [userDomain, setUserDomain] = useState('');
    const [userGender, setUserGender] = useState('');
    const [userAge, setUserAge] = useState(16);
    const [userCredentials, setUserCred] = useState({});
    const inputRef = useRef(null);
    const inputRef2 = useRef();
    const inputRef3 = useRef();


    const router = useRouter();
    const validate = async (e) => {
        e.preventDefault()
        const userCred = {
            ...userCredentials,
            'First Name': userFname,
            'Last Name': userLName,
            'Gender': userGender,
            'Age': userAge,
            'Domain': userDomain,
        };
        // console.log(userCred);
        // userCred['First Name'] = userFname;
        // userCred['Last Name'] = userLName;
        // userCred['Gender'] = userGender;
        // userCred['Age'] = userAge;
        // userCred['Domain'] = userDomain;

        setUserCred(JSON.stringify(userCred));



        if (userFname && userDomain) {
            sessionStorage.setItem('userCredentials', JSON.stringify(userCred));
            // console.log("Written userCreds", userCredentials);
            router.push('/signup/step-3');
        }

    }
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


    function changeGender(e) {
        setUserGender(e.target.value);
        // if(inputRef.current)
        // if (userFname == '') {
        //     inputRef.current.style.border = "2px solid red"
        // }
        // else {
        //     inputRef.current.style.border = "2px solid green"
        // }

    }

    function changeFName(e) {
        setUserFName(e.target.value);
        // if(inputRef.current)
        if (userFname == '') {
            inputRef.current.style.border = "2px solid red"
        }
        else {
            inputRef.current.style.border = "2px solid green"
        }

    }
    function changeDomain(e) {
        setUserDomain(e.target.value);
        // if(inputRef.current)
        if (userDomain == '') {
            inputRef2.current.style.border = "2px solid red"
        }
        else {
            inputRef2.current.style.border = "2px solid green"
        }
    }
    function changeAge(e) {
        setUserAge(e.target.value);
    }

       return (
        <motion.div
            className={`${workSans.className} login-container flex mx-auto justify-center items-center h-screen relative bg-gradient-to-br from-[#134074] to-[#72a4c2] overflow-hidden`}
            initial={{ opacity: 10 }}  // Start invisible
            animate={{ opacity: 1 }}  // Fade in to visible
            transition={{ duration: 0.5 }} // Duration for fade-in effect
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0 opacity-30 bg-cover bg-center bg-no-repeat" 
                 style={{ backgroundImage: 'url("/path/to/background-image.jpg")' }}>
            </div>

            {/* Animated Floating Elements */}
            <div className="absolute z-0 top-10 right-20 w-40 h-40 bg-[#eef4ed] rounded-full opacity-60 animate-float"></div>
            <div className="absolute z-0 bottom-10 left-20 w-32 h-32 bg-[#eef4ed] rounded-full opacity-50 animate-float-slower"></div>

            <motion.div
                className="login-div shadow-2xl z-10 relative min-h-[400px] min-w-[300px] bg-white bg-opacity-90 rounded-lg p-6 backdrop-blur-sm"
                initial={{ y: -50 }} // Start from above
                animate={{ y: 0 }} // Slide to original position
                transition={{ duration: 0.5 }} // Duration for slide-in effect
            >
                <h3 className='text-[#134074] p-4 text-2xl font-bold text-center'> Personal Info</h3>
                <form action="#" className="login flex flex-col justify-center p-4 space-y-6" onSubmit={validate}>
                    <div className="flex items-center flex-col space-y-4">
                        <label htmlFor="fname" className='text-[#134074] text-md'> First Name </label>
                        <input
                            type="text"
                            className='p-2 text-black w-80 rounded-md shadow-md outline-none focus:ring-2 focus:ring-[#72a4c2] transition-all duration-300 ease-in-out'
                            name='sign-up'
                            value={userFname}
                            required
                            onChange={changeFName}
                            ref={inputRef}
                            id='fname'
                        />

                        <label htmlFor="lname" className='text-[#134074] text-md'> Last Name </label>
                        <input
                            type="text"
                            className='p-2 text-black w-80 rounded-md shadow-md outline-none focus:ring-2 focus:ring-[#72a4c2] transition-all duration-300 ease-in-out'
                            name='sign-up'
                            value={userLName}
                            required
                            onChange={e => setUserLName(e.target.value)}
                            id='lname'
                        />

                        <label htmlFor="gender" className='text-[#134074] text-md'> Gender </label>
                        <input
                            type="text"
                            className='p-2 text-black w-80 rounded-md shadow-md outline-none focus:ring-2 focus:ring-[#72a4c2] transition-all duration-300 ease-in-out'
                            name='sign-up'
                            value={userGender}
                            onChange={changeGender}
                            id='gender'
                        />

                        <label htmlFor="age" className='text-[#134074] text-md'> Age </label>
                        <input
                            type="number"
                            className='p-2 text-black w-80 rounded-md shadow-md outline-none focus:ring-2 focus:ring-[#72a4c2] transition-all duration-300 ease-in-out'
                            name='sign-up'
                            value={userAge}
                            onChange={changeAge}
                            id='age'
                        />

                        <label htmlFor="domain" className='text-[#134074] text-md'> Domain </label>
                        <input
                            type="text"
                            className='p-2 text-black w-80 rounded-md shadow-md outline-none focus:ring-2 focus:ring-[#72a4c2] transition-all duration-300 ease-in-out'
                            name='sign-up'
                            value={userDomain}
                            required
                            ref={inputRef2}
                            onChange={changeDomain}
                            id='domain'
                        />

                        <button
                            className='login-btn text-center mx-auto bg-[#134074] text-white p-3 rounded-lg mt-4 w-fit shadow-lg hover:bg-[#293241] hover:scale-105 transition-all duration-300 ease-in-out'
                            type='submit'
                        >
                            Next
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}

export default Step2;


/// PREVIOUS CODE

//     return (
//         <div className={`${workSans.className} login-container flex mx-auto bg-gradient-to-br from-[#47126b] via-[#973aa8] to-[#ea698b] justify-center items-center h-screen`}>
//             <div className="login-div shadow-lg min-h-96 min-w-96 bg-gradient-to-br to-[#ff9ebb] from-[#f5e6e8]">
//                 <h3 className='text-black p-4 text-2xl font-bold'> Personal Info</h3>
//                 <form action="#" className="login flex flex-col justify-center p-4" onSubmit={validate}>
//                     <div className="flex items-center flex-col justify-between">

//                         <label htmlFor="fname" className='text-black p-2'> First Name </label>
//                         <input type="text" className=' p-2 text-black w-80 outline-none focus: border-2 focus-within:border-red-600 text-sm' name='sign-up' value={userFname} required onChange={changeFName} ref={inputRef} id=' fname' />

//                         <label htmlFor="lname" className='text-black p-2'> Last Name </label>
//                         <input type="text" className=' p-2 text-gray-400 w-80 outline-none focus: border-2 focus-within:border-red-600 focus-within:text-black text-sm' name='sign-up' id='lname' />




//                         <label htmlFor="gender" className='text-black p-2'> Gender </label>
//                         <input type="text" className=' p-2 text-black w-80 outline-none focus: border-2 focus-within:border-red-600 text-sm' name='sign-up' value={userGender} id='gender' onChange={changeGender} />

//                         <label htmlFor="Age" className='text-black p-2'> Age </label>
//                         <input type="text" className=' p-2 text-gray-400 w-80 outline-none focus: border-2 focus-within:border-red-600 focus-within:text-black text-sm' name='sign-up' id='Age' value={userAge} onChange={changeAge} />

//                         <label htmlFor="domain" className='text-black p-2'> Domain </label>
//                         <input type="text" className=' p-2 text-gray-400 w-80 outline-none focus: border-2 focus-within:border-red-600 focus-within:text-black text-sm' name='sign-up' id='domain' required ref={inputRef2} onChange={changeDomain} />


//                         {/* 
//                         <button className='login-btn text-center mx-auto text-black p-2  mt-4 w-fit outline-none outline-black hover:bg-[#293241] hover:text-white' type='submit' > Next  </button> */}
//                         <button className='login-btn text-center mx-auto text-black p-2  mt-4 w-fit outline-none outline-white rounded-md  hover:scale-105 hover:bg-gradient-to-tl hover:from-[#cbb2fe] hover:to-[#8187dc] hover:text-white transition-transform duration-300 ease-in-out hover:shadow-lg' type='submit'> Next </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Step2


/// END OF PREVIOUS CODE