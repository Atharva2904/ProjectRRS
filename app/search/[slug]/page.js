// "use client"
// import BookList from '@/components/BookList';
// import Stars from '@/components/Stars';
// import Navbar from '@/components/Navbar';
// import { useEffect, useState } from 'react';
// import { Quicksand, Work_Sans } from 'next/font/google';
// import { useRouter } from 'next/navigation';
// import Loading from '@/app/Loading';
// import { resolve } from 'styled-jsx/css';
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

'use client'
import BookList from '@/components/BookList';
import Stars from '@/components/Stars';
import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';
import { Quicksand, Work_Sans } from 'next/font/google';
import { useRouter } from 'next/navigation';
import Loading from '@/app/Loading';
import { faL } from '@fortawesome/free-solid-svg-icons';

const workSans = Work_Sans({ weight: "500", subsets: ["latin"] })
export default function search({ params }) {
  const [recommended_books, setRecommendedbooks] = useState([])
  const [loading, setLoading] = useState(true);
  const [titleLoading, setTitleLoading] = useState(false);

  const [tags, updateTags] = useState([]);


  const { slug } = params;
  const router = useRouter();


  // useEffect(() => {
  //   setLoading(true);
  //   try {
  //     if (slug === 'search' || !slug.trim()) {
  //       router.replace('/home');
  //     } else {
  //       fetch('http://localhost:5000/search', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ query: decodeURIComponent(slug) }),
  //       })
  //         .then(response => response.ok ? response.json() : Promise.reject('Failed to fetch'))
  //         .then(data => {
  //           setRecommendedbooks(data.recommended);
  //           console.log(recommended_books);
  //           setLoading(false);
  //         })
  //         .catch(error => {
  //           console.error(error);
  //           setLoading(false);
  //         });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // }, [slug]);

  useEffect(() => {
    setLoading(true);
    try {
      if (slug === 'search' || !slug.trim()) {
        // slug = '';
        router.replace('/home');
      }

      else {
        fetch('http://localhost:5000/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: decodeURIComponent(slug) }),
        }).then(response => {
          if (response.ok) {
            return response.json();
          }
          else {
            console.log("ERROR");
          }
        }).then(data => {
          setRecommendedbooks(data.recommended);
          setLoading(false);
          console.log(data);
        }).catch(error => {
          console.error(error);
          setLoading(false);
        });
      }
    }
    catch (error) {
      console.log(error);
      setLoading(false);
    }
    // finally {
    //   // setLoading(false);
    // }

  }, [slug]);

  const tagsChange = (tags) => {
    console.log('I am in search');

    updateTags(tags);

    tags.map((tag, index) => {
      console.log(tag, index);
    })
  }


  // const handleSearch = async (searchValue) => {
  //   setLoading(true);
  //   router.push(`/search/${searchValue}`);
  //   setLoading(false);
  // };


  const handleSearch = async (searchValue) => {
    try {
      ///
      setLoading(true);

      router.push(`/search/${searchValue}`);
    }
    catch (error) {
      console.log(error);
      setLoading(false);

    }
    // finally {
    //   setLoading(false);
    // }
  };


  // const logDetails = {

  //   action: "click",
  //   categories: ["C++", "JAVA"],
  //   timestamp: "today",
  //   // ,
  //   // routingKey : "1234",
  // };



  // try {
  //   const response = await fetch('http://localhost:15672/api/exchanges/%2f/exchange1/publish', {
  //     method: 'POST',
  //     mode: 'no-cors',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Basic ' + btoa("guest:guest"),
  //     },
  //     body: JSON.stringify({ properties: {}, payload: JSON.stringify(logDetails), routingKey: '1234', payload_encoding: "string" }),
  //   });

  //   console.log("Producer Connected");
  //   console.log(logDetails);

  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }

  //   const data = await response.text();
  //   console.log(data);
  // } catch (error) {
  //   console.error('Error sending log to RabbitMQ:', error);
  // }



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




  //   return (
  //     <>
  //       <div
  //         style={{
  //           backgroundImage: "url('/home-background.jpg')",
  //           backgroundSize: "cover",
  //           backgroundPosition: "center",
  //           backgroundAttachment: "fixed",
  //           height: "100vh",
  //           width: "100vw",
  //           position: 'fixed',
  //           zIndex: -1,
  //         }}
  //       ></div>

  //       <Navbar onSearch={handleSearch} />

  //       {titleLoading && (
  //         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
  //           <div className="flex flex-col items-center p-4 rounded shadow-lg">
  //             <Loading />
  //           </div>
  //         </div>
  //       )}

  //       {recommended_books.length > 0 ? (
  //         <div className="book-stack flex flex-col justify-items-center mx-auto max-w-[80%] items-center">
  //           <h1 className={`${workSans.className} p-4 text-black text-xl font-extrabold`}>
  //             Showing search results for {decodeURIComponent(slug)}
  //           </h1>
  //           {recommended_books.map((book, index) => (
  //             <div
  //               key={book.Index}
  //               className={`${workSans.className} book-card flex items-center justify-items-start border-2 border-white p-10 min-w-[80%] mb-[10px] shadow-lg relative transition duration-300 ease hover:translate-y-[-5px] opacity-0 animate-fadeIn`}
  //               style={{ animationDelay: `${index * 0.1}s` }}
  //             >
  //               <img src="/cpp.jpeg" alt="Book Cover" className="book-image w-[100px] h-[150px] object-cover mr-[24px]" />
  //               <div className="book-info flex flex-col justify-between w-[100%]">
  //                 <h1 className="book-title text-black text-[18px] font-bold text-ellipsis max-w-3xl hover:cursor-pointer" onClick={() => handleTitle(book.Title, book.Index, book.Categories)}>
  //                   Title: {book.Title}
  //                 </h1>
  //                 <p className="book-author text-[1em] text-gray-600">Author: {book.Author}</p>
  //                 <span className="text-black text-sm group-hover:text-white mb-2">
  //                   <Stars rating={book.Rating} />
  //                 </span>
  //                 <p className="book-tag text-[1em] text-black">
  //                   Tags: {book.Categories.split(',').slice(0, 2).join(', ')}
  //                 </p>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       ) : (
  //         !loading && (
  //           <div className="no-results-container flex items-center justify-center">
  //             <h1 className={`${workSans.className} text-black text-xl font-extrabold text-center`}>
  //               No search results found for {decodeURIComponent(slug)}
  //             </h1>
  //           </div>
  //         )
  //       )}
  //     </>
  //   );
  // }


  // / OLD CODE

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="book-stack flex flex-col justify-items-center mx-auto max-w-[80%] items-center ">
        {recommended_books.length > 0 ? <h1 className={`${workSans.className} p-4 text-black text-xl font-extrabold`}>Showing search results for {decodeURIComponent(slug)}</h1> : <h1 className={`${workSans.className} p-4 text-black text-xl font-extrabold`}>No search results found for  {decodeURIComponent(slug)}</h1>}

        {recommended_books.map((book) => (
          <div key={book.Index} className={`${workSans.className} book-card flex items-center justify-items-start border-2 border-white p-10 min-w-[80%] mb-[10px] shadow-lg relative transition duration-300 ease hover:translate-y-[-5px]`}>

            <img src={`/${book.Thumbnail_Path}`} alt={Image} className="book-image w-[100px] h-[150px] object-cover mr-[24px] " />
            <div className="book-info flex flex-col justify-between w-[100%] ">
              <h1 className="book-title text-black text-[18px] font-bold text-ellipsis max-w-3xl hover:cursor-pointer" onClick={() => handleTitle(book.Title, book.Index, book.Categories)}>Title: {book.Title}</h1>
              <p className="book-author text-[1em] text-gray-600">Author: {book.Author}</p>

              <span className='text-black text-sm group-hover:text-white mb-2'><Stars rating={book.Rating} /></span>
              {/* <p className="book-tag text-[1em] text-gray-600">Tags: {book.Categories}</p> */}
              <p className="book-tag text-[1em] text-black">
                Tags: {book.Categories.split(',').slice(0, 2).join(', ')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// / END OF OLD CODE




// <BookList heading={slug} books={recommended_books}/>
// recommended_books.map((book, index) => (
//   <Card
//     key={index}
//     Title={book.Title}
//     Author={book.Author}
//     Count={book.Count}
//     Categories={book.Categories}
//     Rating={book.Rating}
//   />
// ))






// export default search


