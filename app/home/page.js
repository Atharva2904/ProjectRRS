"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import BookList from "@/components/BookList";
import Card from "@/components/Card";
import Landing from "@/components/Landing";
import { useRouter } from "next/navigation";
import Loading from "../Loading";
// import { useState } from "react";
export default function Home() {
  const [recommended_books, setRecommendedbooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [preferences, setPreferences] = useState([]);
  // const [filterTags, setfilterTags] = useState([])
  const router = useRouter();

  const handleSearch = async (searchValue) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay
      console.log(`/search/${searchValue}`)
      router.push(`/search/${searchValue}`);

    }
    catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    const authenticated = sessionStorage.getItem('auth');

    if (!authenticated || authenticated === 'false') {
      // setAuthLoading(true);
      router.push('/landing');
    }
    else {
      const user = sessionStorage.getItem('activeUser');
      console.log(user);

      router.replace('/home');
    }
  }, [router])

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch('http://localhost:5000/userinterests', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 'userid': parseInt(sessionStorage.getItem('userid'), 10) })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('User recommender data : ', data['user_rec']);



        // Calling Mongo API endpoint to fetch books for each tag

        const mongoresponse = await fetch('/api/user-specific', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ tags: data['user_rec'] }),
        });


        const mongodata = await mongoresponse.json();

        const recommendations_b = mongodata.result;
        setRecommendedbooks(recommendations_b);

        console.log("Received response from mongo: ", recommendations_b);


      }
      catch (error) {
        console.error('Error fetching data: ', error);
      }
    }


    fetchData();


    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);


    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    // setLoading(false);
    return <Loading />;
  }

  // const PageComponent = ({ recommended_books }) => {
  // useEffect(() => {
  //   const sendRecommendations = async () => {
  //     try {
  //       const response = await fetch("/api/search", {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ searchResults: recommended_books }),
  //       });

  //       if (!response.ok) {
  //         throw new Error(`Error: ${response.statusText}`);
  //       }

  //       const result = await response.json();
  //       console.log('Response from server:', result);

  //     } catch (error) {
  //       console.log('ERROR:', error);
  //     }
  //   };

  //   if (recommended_books && recommended_books.length > 0) {
  //     sendRecommendations();
  //   }
  // }, [recommended_books]);
  // useEffect(() => {


  //   console.log('Hey')
  //   // try{
  //   //   // const response = await fetch("/api/seach",{
  //   //   //   method : 'POST',
  //   //   //   body: JSON.stringify({'searchResults' : recommended_books}),
  //   //   // });

  //   //   // const result = await response.json();
  //   //   console.log('Response from server:');
  //   // }
  //   // catch(error){
  //   //   console.log('ERROR: ', error);
  //   // }
  // }, [recommended_books])

  /// OLD CODE
  //   return (

  //     // <div className="container bg-gradient-to-br from-[#47126b] via-[#973aa8] to-[#ea698b] w-screen">
  //     <>


  //       <Navbar onSearch={handleSearch}/>
  //       {Object.keys(recommended_books).map(tag =>(
  //         <BookList key={tag} heading={tag} books={recommended_books[tag]}></BookList>
  //       ))}
  //       {/* <BookList heading="Recommended" books={recommended_books} />
  //       <BookList heading="Recommended" books={recommended_books} />
  //       <BookList heading="Recommended" books={recommended_books} />
  //       <BookList heading="Recommended" books={recommended_books} /> */}
  //    </>
  //   );
  // }

  /// END OF OLD CODE

  return (

    // <div className="container bg-gradient-to-br from-[#47126b] via-[#973aa8] to-[#ea698b] w-screen">
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
      <div className="mx-auto justify-center items-center pl-52">
        {Object.keys(recommended_books).map(tag => (

          <BookList key={tag} heading={tag.toUpperCase()} books={recommended_books[tag]}></BookList>
        ))}
      </div>
      {/* <BookList heading="Recommended" books={recommended_books} />
      <BookList heading="Recommended" books={recommended_books} />
      <BookList heading="Recommended" books={recommended_books} />
      <BookList heading="Recommended" books={recommended_books} /> */}
    </>
  );
}



