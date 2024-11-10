"use client"
import BookList from '@/components/BookList';
import Stars from '@/components/Stars';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useEffect, useState } from 'react';
import { Quicksand, Work_Sans } from 'next/font/google';
import { useRouter } from 'next/navigation';
import Loading from '@/app/Loading';
import { resolve } from 'styled-jsx/css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookDetail from '@/components/BookDetail';
const workSans = Work_Sans({ weight: "500", subsets: ["latin"] })

export default function bookinfo({ params }) {
    const [book_info, setbookInfo] = useState({});
    const [infoAvailable, setInfoAvailable] = useState(true);
    const [loading, setLoading] = useState(true);
    const { slug } = params;
    const router = useRouter();

    const navigateToWishlist = () => {
        router.push('/wishlist'); // Navigate to the Wishlist page
    };
    useEffect(() => {
        async function getInfo() {
            const response = await fetch('/api/info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ infoQuery: decodeURIComponent(slug) }),
            });


            console.log("The query sent was : ", decodeURIComponent(slug));
            const result = await response.json();
            // console.log(result);
            if (result.success) {
                setbookInfo(result.info);
            }
            else {
                console.error('Error fetching from API');
            }

        }
        try {
            console.log(`Reached bookinfo Page : ${decodeURIComponent(slug)}`)
            getInfo();

        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }, [slug])


    useEffect(() => {
        // console.log("Book Info : ", JSON.parse(JSON.stringify(book_info)));
        // console.log(infoAvailable);
        setInfoAvailable(true);
    }, [book_info])
    const handleClick = async () => {
        try {
            const obj = JSON.parse(book_info);
            if (infoAvailable) {

                console.log('I am in Booklist and ', obj.Title, 'was clicked');
                const sendobj = {
                    'Action': 'click',
                    'Title': obj.Title,
                    'Timestamp': Date.now(),
                    'User': parseInt(sessionStorage.getItem('userid'), 10),
                    'Tags': obj.mycategories,
                }
                const response = await fetch('/api/kafka-producer', {
                    method: 'POST',
                    'Content-Type': 'application/json',
                    body: JSON.stringify({
                        payload: sendobj,
                        topic: 'broker',
                    }),

                });

                const reply = await response.json();
                console.log('Kafka Producer connected');
                if (reply.succes) {
                    const data = await reply.text();
                    console.log(data);

                }
            }
            else {
                console.log('None');
            }
        }
        catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            {/* <Navbar/> */}

            {/* <Sidebar/> */}
            <div className="info-container text-black hover:cursor-pointer" onClick={() => handleClick()}>
                {(infoAvailable && <BookDetail books={book_info} />

                )}
            </div>
        </>

    );

}
