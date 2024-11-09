"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import local from 'next/font/local';
import { Quicksand, Work_Sans } from 'next/font/google';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import { motion } from 'framer-motion';


const workSans = Work_Sans({ weight: "400", subsets: ["latin"] })

function Step1() {
  let passwordValidator = require('password-validator');
  const schema = new passwordValidator()
  const [signEmailValue, setsignUpEmail] = useState('');
  const [signUserName, setsignUpUser] = useState('');
  const [signUpPassword, setsignUpPswd] = useState('');

  const inputRef = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);

  schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

  const router = useRouter();
  const validate = (e) => {
    // const { username, email, passwor } = formState
    e.preventDefault()

    const userCredentials = {
      'username': signUserName,
      'email': signEmailValue,
      'password': signUpPassword,
    }


    if (signEmailValue && signUserName && schema.validate(signUpPassword)) {
      // console.log(userCredentials);
      sessionStorage.setItem('userCredentials', JSON.stringify(userCredentials))
      router.push('/signup/step-2');
    }
    else {
      alert('Please fill up valid values.');
    }
  }

  useEffect(() => {
    const email = sessionStorage.getItem('signupEmail');
    console.log(email);

    if (email) {
      setsignUpEmail(email);
    }
  }, [])



  function changeFieldUser(e) {
    setsignUpUser(e.target.value);
    // if(inputRef.current)
    if (signUserName.length < 4) {
      inputRef.current.style.border = "2px solid red";
    }
    else {

      inputRef.current.style.border = "2px solid green";
    }

  }
  function changeFieldEmail(e) {
    setsignUpEmail(e.target.value);
  }

  function changeFieldPswd(e) {
    const value = e.target.value;
    setsignUpPswd(value);
    console.log(e.target.value);
    if (schema.validate(signUpPassword)) {
      inputRef3.current.style.border = "2px solid green"
    }
    else {
      inputRef3.current.style.border = "2px solid red"
    }
  }

  return (
    <motion.div
      className={`${workSans.className} login-container flex mx-auto justify-center items-center h-screen relative bg-gradient-to-br from-[#134074] to-[#72a4c2] overflow-hidden`}
      initial={{ opacity: 10 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
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
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className='text-[#134074] p-4 text-2xl font-bold text-center'> Sign Up</h3>
        <form action="#" className="login flex flex-col justify-center p-4 space-y-6" onSubmit={validate}>
          <div className="flex items-center flex-col space-y-4">
            <label htmlFor="uname" className='text-[#134074] text-md'> Username </label>
            <input
              type="text"
              className='p-2 text-black w-80 rounded-md shadow-md outline-none focus:ring-2 focus:ring-[#72a4c2] transition-all duration-300 ease-in-out'
              name='sign-up'
              value={signUserName}
              required
              onChange={changeFieldUser}
              ref={inputRef}
              id='uname'
            />

            <label htmlFor="email" className='text-[#134074] text-md'> Email </label>
            <input
              type="text"
              className='p-2 text-black w-80 rounded-md shadow-md outline-none focus:ring-2 focus:ring-[#72a4c2] transition-all duration-300 ease-in-out'
              name='sign-up'
              value={signEmailValue}
              required
              onChange={changeFieldEmail}
              ref={inputRef2}
              id='email'
            />

            <label htmlFor="pwd" className='text-[#134074] text-md'> Password </label>
            <input
              type="text"
              className='p-2 text-black w-80 rounded-md shadow-md outline-none focus:ring-2 focus:ring-[#72a4c2] transition-all duration-300 ease-in-out'
              name='sign-up'
              value={signUpPassword}
              required
              onChange={changeFieldPswd}
              ref={inputRef3}
              id='pwd'
            />
          </div>

          <button
            className='login-btn text-center mx-auto bg-[#134074] text-white p-3 rounded-lg mt-4 w-fit shadow-lg hover:bg-[#293241] hover:scale-105 transition-all duration-300 ease-in-out'
            type='submit'
          >
            Sign Up
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default Step1;



/// PREVIOUS CODE
//   return (
//     <div className={`${workSans.className} login-container flex mx-auto bg-gradient-to-br from-[#47126b] via-[#973aa8] to-[#ea698b] justify-center items-center h-screen`}>
//       {/* <div className="login-div shadow-lg min-h-96 min-w-96 bg-[#eef4ed]"> */}
//       <div className="login-div shadow-lg min-h-96 min-w-96 bg-gradient-to-br to-[#ff9ebb] from-[#f5e6e8]">



//         <h3 className='text-black p-4 text-2xl font-bold'> Sign Up</h3>
//         <form action="#" className="login flex flex-col justify-center p-4" onSubmit={validate}>
//           <div className="flex items-center flex-col">

//             <label htmlFor="uname" className='text-black p-2'> Usernamae </label>
//             <input type="text" className=' p-2 text-black w-80 outline-none focus: border-2 focus-within:border-red-600 text-sm' name='sign-up' value={signUserName} required onChange={changeFieldUser} ref={inputRef} id='uname' />

//             <label htmlFor="email" className='text-black p-2'> Email </label>
//             <input type="text" className=' p-2 text-gray-400 w-80 outline-none focus: border-2 focus-within:border-red-600 focus-within:text-black text-sm' name='sign-up' value={signEmailValue} required onChange={changeFieldEmail} ref={inputRef2} id='email' />


//             <label htmlFor="pwd" className='text-black p-2'> Password </label>
//             <input type="text" className=' p-2 text-gray-400 w-80 outline-none focus: border-2 focus-within:border-red-600 focus-within:text-black text-sm' name='sign-up' value={signUpPassword} required onChange={changeFieldPswd} ref={inputRef3} id='pwd' />

//           </div>


//           <button className='login-btn text-center mx-auto text-black p-2  mt-4 w-fit outline-none outline-white rounded-md  hover:scale-105 hover:bg-gradient-to-tl hover:from-[#cbb2fe] hover:to-[#8187dc] hover:text-white transition-transform duration-300 ease-in-out hover:shadow-lg' type='submit'> Sign-In </button>
//           {/* <button
//             className='login-btn text-center mx-auto text-black p-2 mt-4 w-fit outline-none outline-black bg-gradient-to-r from-[#f5e6e8] to-[#d0f0c0] rounded-md shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:text-white hover:bg-[#d0f0c0] hover:bg-opacity-75'
//             type='submit'
//           >
//             Sign-In
//           </button> */}


//         </form>
//       </div>
//     </div>
//   )
// }

// export default Step1


//// END OF PREVIOUS CODE