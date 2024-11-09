"use client"
import React from 'react'

import { Quicksand, Work_Sans } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';

const quickSand = Quicksand({ weight: "300", subsets: ["latin"] })
const workSans = Work_Sans({ weight: "400", subsets: ["latin"] })



export default function page() {
    const [signUserName, setsignUpUser] = useState('');
    const [signUpPassword, setsignUpPswd] = useState('');
    const router = useRouter();
    function changeFieldUser(e) {
        setsignUpUser(e.target.value);

    }
    function changeFieldPswd(e) {
        const value = e.target.value;
        setsignUpPswd(value);
    }
    const validate = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: signUserName, password: signUpPassword }),
        });


        const result = await response.json();

        if (result.success) {
            sessionStorage.setItem('auth', true);
            sessionStorage.setItem('activeUser', signUserName);
            sessionStorage.setItem('userid', result.id);
            router.push('/home');

        }
        else {
            console.log("THENGA");
        }
    }


    return (
        <div className={`${workSans.className} flex mx-auto h-screen items-center justify-center bg-cover bg-center`} style={{ backgroundImage: "url('/login-background.webp')" }}>
            <div className="flex shadow-lg max-w-[700px] w-full bg-[#e6d2c5] rounded-md overflow-hidden">
                {/* Left Side for Image */}
                <div className="w-1/2 flex items-center justify-center bg-[#d9e8f5]">
                    <img src="/books.jpg" alt="Descriptive Alt Text" className="object-cover h-full w-full max-w-[350px]" />
                </div>

                {/* Right Side for Form */}
                <div className="w-1/2 p-8 bg-[#f5e6e8]">
                    <h3 className="text-black text-2xl font-bold mb-4 ">Sign In</h3>
                    <form action="#" className="flex flex-col" onSubmit={validate}>
                        <label htmlFor="uname" className="text-black p-2">Username</label>
                        <input
                            type="text"
                            className="p-2 text-black w-full outline-none focus:border-2 focus:border-red-600 text-sm mb-4"
                            name="sign-up"
                            value={signUserName}
                            required
                            onChange={changeFieldUser}
                            id="uname"
                        />

                        <label htmlFor="pwd" className="text-black p-2">Password</label>
                        <input
                            type="password"
                            className="p-2 text-black w-full outline-none focus:border-2 focus:border-red-600 text-sm mb-4"
                            name="sign-up"
                            value={signUpPassword}
                            required
                            onChange={changeFieldPswd}
                            id="pwd"
                        />

                        <button className="text-center text-white bg-gradient-to-tl from-[#cbb2fe] to-[#8187dc] p-2 rounded-md hover:scale-105 transition-transform duration-300 ease-in-out shadow-md" type="submit">
                            Sign-In
                        </button>
                    </form>
                    <p className="text-black text-center mt-4">
                        If New User,{' '}
                        <span 
                            className="text-blue-500 cursor-pointer hover:underline" 
                            onClick={() => router.push('/signup/step-1')}
                        >
                            Sign-up
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

//     return (
//         <motion.div
//             className={`${workSans.className} login-container flex mx-auto justify-center items-center h-screen relative bg-gradient-to-br from-[#134074] to-[#72a4c2] overflow-hidden`}
//             initial={{ opacity: 10 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1 }}
//         >
//             {/* Background Image */}
//             <div
//                 className="absolute inset-0 z-0 opacity-30 bg-cover bg-center bg-no-repeat"
//                 style={{ backgroundImage: 'url("/path/to/background-image.jpg")' }} // Replace with your actual background image
//             ></div>

//             {/* Animated Floating Elements */}
//             <motion.div
//                 className="absolute z-0 top-10 right-20 w-40 h-40 bg-[#eef4ed] rounded-full opacity-60 animate-float"
//                 initial={{ scale: 0.8 }}
//                 animate={{ scale: 1 }}
//                 transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
//             ></motion.div>
//             <motion.div
//                 className="absolute z-0 bottom-10 left-20 w-32 h-32 bg-[#eef4ed] rounded-full opacity-50 animate-float-slower"
//                 initial={{ scale: 0.8 }}
//                 animate={{ scale: 1 }}
//                 transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
//             ></motion.div>

//             <motion.div
//                 className="login-div shadow-2xl z-10 relative min-h-[400px] min-w-[300px] bg-white bg-opacity-90 rounded-lg p-6 backdrop-blur-sm"
//                 initial={{ y: -50 }}
//                 animate={{ y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.3 }}
//             >
//                 <h3 className="text-[#134074] p-4 text-2xl font-bold text-center">Sign Up</h3>

//                 <form
//                     action="#"
//                     className="login flex flex-col justify-center p-4 space-y-6"
//                     onSubmit={validate}
//                 >
//                     <div className="flex items-center flex-col space-y-4">
//                         <label htmlFor="uname" className="text-[#134074] text-md">Username</label>
//                         <input
//                             type="text"
//                             className="p-2 text-black w-80 rounded-md shadow-md outline-none focus:ring-2 focus:ring-[#72a4c2] focus:border-none transition-all duration-300 ease-in-out"
//                             name="sign-up"
//                             value={signUserName}
//                             required
//                             onChange={changeFieldUser}
//                             id="uname"
//                         />

//                         <label htmlFor="pwd" className="text-[#134074] text-md">Password</label>
//                         <input
//                             type="password"
//                             className="p-2 text-black w-80 rounded-md shadow-md outline-none focus:ring-2 focus:ring-[#72a4c2] focus:border-none transition-all duration-300 ease-in-out"
//                             name="sign-up"
//                             value={signUpPassword}
//                             required
//                             onChange={changeFieldPswd}
//                             id="pwd"
//                         />
//                     </div>

//                     <button
//                         className="login-btn text-center mx-auto bg-[#134074] text-white p-3 rounded-lg mt-4 w-fit shadow-lg hover:bg-[#293241] hover:scale-105 transition-all duration-300 ease-in-out"
//                         type="submit"
//                     >
//                         Sign In
//                     </button>
//                 </form>
//             </motion.div>
//         </motion.div>
//     );
// }



/// PREVIOUS CODE
//     return (
//         <div className={`${workSans.className} login-container flex mx-auto bg-[#134074] justify-center items-center h-screen`}>
//             <div className="login-div shadow-lg min-h-96 min-w-96 bg-[#eef4ed]">
//                 <h3 className='text-black p-4 text-2xl font-bold'> Sign Up</h3>
//                 <form action="#" className="login flex flex-col justify-center p-4" onSubmit={validate}>
//                     <div className="flex items-center flex-col">

//                         <label htmlFor="uname" className='text-black p-2'> Username </label>
//                         <input type="text" className=' p-2 text-black w-80 outline-none focus: border-2 focus-within:border-red-600 text-sm' name='sign-up' value={signUserName} required onChange={changeFieldUser} id='uname' />



//                         <label htmlFor="pwd" className='text-black p-2'> Password </label>
//                         <input type="text" className=' p-2 text-gray-400 w-80 outline-none focus: border-2 focus-within:border-red-600 focus-within:text-black text-sm' name='sign-up' value={signUpPassword} required onChange={changeFieldPswd} id='pwd' />

//                     </div>


//                     <button className='login-btn text-center mx-auto text-black p-2  mt-4 w-fit outline-none outline-black hover:bg-[#293241] hover:text-white' type='submit'> Sign-In </button>

//                 </form>
//             </div>
//         </div>
//     );
// }

//// END OF PERVIOUS CODE
// export default page
