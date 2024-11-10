"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useEffect } from 'react';
import BookList from '@/components/BookList';
import { Quicksand, Work_Sans } from 'next/font/google';
import Stars from '@/components/Stars';
import Navbar from '@/components/Navbar';
import Loading from '../Loading';

const workSans = Work_Sans({ weight: "500", subsets: ["latin"] })
function filterPage() {
  const router = useRouter();
  // const { results } = router.query;
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [titleLoading, setTitleLoading] = useState(false);

  const value = JSON.parse(sessionStorage.getItem('filterResults'));
  useEffect(() => {
    setFilteredResults(value);
    console.log("Value", value);
    value.forEach((item, index) => {
      // console.log(index, item);
    });
  }, []);


  const handleSearch = async (searchValue) => {
    try {

      setLoading(true);

      router.push(`/search/${searchValue}`);
    }
    catch (error) {
      console.log(error);
      setLoading(false);

    }

  };


  const handleTitle = async (title, index, categories) => {
    setTitleLoading(true);
    try {
      console.log(title, index);

      const sendObj = {
        'Action': 'click',
        'Title': title,
        'Timestamp': Date.now(),
        'User': parseInt(sessionStorage.getItem('userid'), 10),
        'Tags': categories,
      }

      router.push(`/bookinfo/${title}`)
      const response = await fetch('/api/kafka-producer', {
        method: 'POST',
        'Content-Type': 'application/json',
        body: JSON.stringify({
          payload: JSON.parse(JSON.stringify(sendObj)),
          topic: 'broker',
        }),

      });

      const reply = await response.json();
      console.log('Kafka producer log sent');
      if (reply.success) {
        const data = await reply.text();
        console.log(data);
      }
    }
    catch (error) {
      console.error(error);
    }
    setTitleLoading(false);
  }

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div
        style={{
          backgroundImage: "url('/home-background.jpg')",
          backgroundSize: "cover", // Ensure the background image covers the entire container
          backgroundPosition: "center", // Center the image
          minHeight: "100vh", // Ensure the background takes the full viewport height
          width: "100vw", // Full width of the viewport
          position: "fixed", // Fix the position so it stays in place
          top: 0, // Position at the top of the viewport
          left: 0, // Position at the left of the viewport
          zIndex: -1, // Send the background to the back
        }}
      ></div>
      <Navbar onSearch={handleSearch} />
      <div className="book-stack flex flex-col justify-items-center mx-auto max-w-[80%] items-center ">

        {filteredResults.length > 0 ? (
          <h1 className={`${workSans.className} p-4 text-black text-xl font-extrabold`}>
            Showing filter results
          </h1>
        ) : (
          <h1 className={`${workSans.className} p-4 text-black text-xl font-extrabold`}>
            No filter results found
          </h1>
        )}

        {filteredResults.length > 0 && filteredResults.map((book) => (
          <div key={book.BookIndex} className={`${workSans.className} book-card flex items-center justify-items-start border-2 border-white p-10 min-w-[80%] mb-[10px] shadow-lg relative transition duration-300 ease hover:translate-y-[-5px]`}>
            <img src={`/${book.Thumbnail_Path}`} alt="Book Thumbnail" className="book-image w-[100px] h-[150px] object-cover mr-[24px]" />

            <div className="book-info flex flex-col justify-between w-[100%]">
              <h1
                className="book-title text-black text-[18px] font-bold text-ellipsis max-w-3xl hover:cursor-pointer"
                onClick={() => handleTitle(book.Title, book.Index, book.Categories)}
              >
                Title: {book.Title}
              </h1>
              <p className="book-author text-[1em] text-gray-600">Author: {book.Author}</p>
              <span className="text-black text-sm group-hover:text-white mb-2">
                <Stars rating={book.Rating} />
              </span>
              <p className="book-tag text-[1em] text-black">
                Tags: {book.mycategories.split(',').slice(0, 2).join(', ')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
//   return (
//     <>

//       {value.length > 0 ? <h1 className={`${workSans.className} p-4 text-black text-xl font-extrabold`}>Showing filter results </h1> : <h1 className={`${workSans.className} p-4 text-black text-xl font-extrabold`> No filter results found </h1>}
//       {filteredResults.map((book) => (
//         <div key={book.Index} className={`${workSans.className} book-card flex items-center justify-items-start border-2 border-white p-10 min-w-[80%] mb-[10px] shadow-lg relative transition duration-300 ease hover:translate-y-[-5px]`}>

//           <img src={`/${book.Thumbnail_Path}`} alt={Image} className="book-image w-[100px] h-[150px] object-cover mr-[24px] " />
//           <div className="book-info flex flex-col justify-between w-[100%] ">
//             <h1 className="book-title text-black text-[18px] font-bold text-ellipsis max-w-3xl hover:cursor-pointer" onClick={() => handleTitle(book.Title, book.Index, book.Categories)}>Title: {book.Title}</h1>
//             <p className="book-author text-[1em] text-gray-600">Author: {book.Author}</p>

//             <span className='text-black text-sm group-hover:text-white mb-2'><Stars rating={book.Rating} /></span>
//             {/* <p className="book-tag text-[1em] text-gray-600">Tags: {book.Categories}</p> */}
//             <p className="book-tag text-[1em] text-black">
//               Tags: {book.mycategories.split(',').slice(0, 2).join(', ')}
//             </p>
//           </div>
//         </div>
//       ))}
//     </>
//   )
// }

export default filterPage