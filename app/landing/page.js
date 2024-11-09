"use client"
import React from 'react'
import { useState } from 'react';
import Sidebar from '@/components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faBookOpen, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Quicksand, Work_Sans } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const quickSand = Quicksand({ weight: "300", subsets: ["latin"] })
const workSans = Work_Sans({ weight: "400", subsets: ["latin"] })
function Landing() {
    const router = useRouter();
    const [signUpValue, setsignUpValue] = useState("Enter your email here");

    function resetValue() {
        setsignUpValue('');
    }
    function changeValue(e) {
        setsignUpValue(e.target.value);
    }

    function getStarted() {

        sessionStorage.setItem('signupEmail', signUpValue);
        router.push('/signup/step-1');
    }
    function signIn() {
        router.push('/login');
    }
     return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 10 }}
      transition={{ duration: 1.5 }}
      className={`${workSans.className} landing-container flex flex-col relative h-screen overflow-y-auto bg-gradient-to-br from-[#FFF7E6] via-[#FFEDD5] to-[#F0A202]`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-cover bg-center opacity-20" 
           style={{ backgroundImage: 'url("/path/to/your-background-image.jpg")' }}>
      </div>

      {/* Navbar */}
      <nav className="main-navbar p-4 h-20 z-10 relative bg-[#FFEDD5] shadow-md">
        <ul className="flex justify-between items-center">
          <li className="text-[#3C2A21] text-3xl font-bold">ProjectRRS</li>
          <div className="btns flex justify-center gap-2">
            <li>
              <button
                className="sign-in-btn bg-[#D8572A] text-white p-3 rounded-md hover:bg-[#F0A202] transition-all duration-300"
                onClick={signIn}
              >
                Sign In
              </button>
            </li>
          </div>
        </ul>
      </nav>

      {/* Get Started Section */}
      <div className="get-started text-center border-b-2 border-[#F0A202] text-[#3C2A21] p-4 w-full min-h-80 h-full flex flex-col gap-6 justify-center items-center z-10 relative">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        >
          <FontAwesomeIcon
            icon={faBookOpen}
            className="text-[#F0A202] text-6xl"
          />
        </motion.div>
        <motion.div
          className="info text-2xl font-semibold max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Welcome to ProjectRRS! A curated platform to find recommended books.
        </motion.div>

        <motion.div
          className="first flex justify-center gap-4 mt-4 items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <span className="p-2 text-xl font-bold">Get Started</span>
          <input
            type="text"
            className="border-2 border-[#F0A202] rounded-md p-2 text-[#6B4226] w-80 outline-none focus:ring-2 focus:ring-[#D8572A] transition-all duration-300"
            value={signUpValue}
            onClick={resetValue}
            onChange={changeValue}
          />
          <button
            className="sign-up-btn bg-[#D8572A] hover:bg-[#F0A202] text-white outline-none rounded-md p-3 flex items-center gap-2 transition-all duration-300 ease-in-out"
            onClick={getStarted}
          >
            Sign-Up <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </motion.div>
      </div>

      {/* Find Books Section */}
      <motion.div
        className="second text-center mx-auto break-words max-w-4xl p-6 text-[#3C2A21] z-10 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        Find the best books recommended for your needs.
      </motion.div>

      {/* Floating Animation Elements */}
      <div className="absolute z-0 top-20 left-10 w-32 h-32 bg-[#F0A202] rounded-full opacity-50 animate-float"></div>
      <div className="absolute z-0 bottom-10 right-10 w-40 h-40 bg-[#D8572A] rounded-full opacity-40 animate-float-slower"></div>
    </motion.div>
  );
}
export default Landing

/// PREVIOUS CODE
//     return (
        
//         // <div className={`${workSans.className} landing-container flex flex-col bg-[#134074] h-screen overflow-y-auto`}>
        
//                 <div className={`${workSans.className} landing-container flex flex-col bg-gradient-to-br from-[#47126b] via-[#973aa8] to-[#ea698b] h-screen overflow-y-auto`}>
//                     <nav className="main-navbar p-2 h-20 my-auto bg-gradient-to-l from-[#ffffff] to-[#ebf2fa]">
//                         <ul className='flex justify-between'>
//                             <li className='p-4 text-black text-3xl font-extrabold'>
//                                 ProjectRRS
//                             </li>
//                             <div className="btns flex justify-center gap-2">

//                                 <li>
//                                     <button className='sign-in-btn border-2 text-black p-4 bg-transparent rounded-md 
//                           hover:bg-gradient-to-br hover:from-[#7f00ff] hover:to-[#ff6a88] hover:text-white transition-all duration-200' onClick={signIn}>
//                                         Sign In
//                                     </button>
//                                 </li>
//                             </div>
//                         </ul>
//                     </nav>
//                     <div className="get-started text-center border-b-2 border-gray-300 text-white p-1 w-full min-h-80 h-full justify-center items-center flex flex-col gap-4">
//                         <FontAwesomeIcon icon={faBookOpen} className='max-w-40  h-auto' style={{ color: "snow" }} />
//                         <div className="info text-xl break-words max-w-5xl">

//                             Project RRS (Resource Recommendation System) is a powerful platform designed to recommend various resources, including books, based on user preferences and interactions. It leverages advanced collaborative filtering techniques to provide highly personalized suggestions, focusing on user-tag interactions to understand preferences better. The project aims to improve resource discovery by analyzing patterns and similarities in user behavior, such as shared interests, ratings, or specific tags associated with resources.
//                         </div>
//                         <div className="first flex justify-center gap-4 mt-4">

//                             {/* <label htmlFor="sign-up" className='p-2 m-1 text-lg'>Get Started with ProjectRRS</label> */}
//                             <span className='p-2 m-1 text-xl font-bold '> Get Started with ProjectRRS </span>
//                             <input type="text" className='border-2 rounded-md p-2 text-gray-500 w-80 outline-none' name='sign-up' value={signUpValue} onClick={resetValue} onChange={changeValue} />
//                             {/* <button className="sign-up-btn bg-[#293241] outline-none outline-white rounded-md p-1" onClick={getStarted}>
//                         Sign-Up <FontAwesomeIcon icon={faChevronRight} />
//                     </button> */}
//                             <button
//                                 className="sign-up-btn bg-gradient-to-r from-[#160f29] to-[#134074] text-white rounded-md p-2 flex items-center gap-2 transform hover:scale-105 hover:from-[#134074] hover:to-[#160f29] transition-transform duration-300 ease-in-out hover:shadow-lg"
//                                 onClick={getStarted}
//                             >
//                                 Sign-Up <FontAwesomeIcon icon={faChevronRight} />
//                             </button>




//                         </div>
//                     </div>

//                     <div className="second text-center mx-auto break-words max-w-4xl p-4">
//                         At the core of the system is a sophisticated recommendation algorithm that identifies the top tags for each user and matches them with relevant resources. This approach ensures that the recommendations are not just based on general popularity but are tailored to the unique needs and interests of each user.
//                     </div>
//                     {/* <Sidebar/> */}


//                 </div>
//                 )
// }

/// END OF PREVIOUS CODE