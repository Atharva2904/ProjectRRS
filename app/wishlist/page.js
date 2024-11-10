"use client"
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { Quicksand, Work_Sans } from 'next/font/google';

const workSans = Work_Sans({ weight: "500", subsets: ["latin"] });

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch the wishlist from the database based on user ID
    const fetchWishlist = async () => {
        const userId = sessionStorage.getItem('userid'); // Get user ID from sessionStorage
        
        if (!userId) {
            console.error('User ID not found in sessionStorage');
            return;
        }
    
        try {
            const response = await fetch('/api/read', {
                method: 'POST', // Using POST to fetch based on user ID
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userid: parseInt(userId) }), // Send user ID in the request body
            });
            
            const data = await response.json();
            if (data.success) {
                setWishlist(data.wishlist);
            } else {
                console.error('Failed to fetch wishlist:', data.error);
            }
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = async (BookIndex, title) => {
    const userId = sessionStorage.getItem('userid'); // Get user ID from sessionStorage
    const updatedWishlist = wishlist.filter(book => book.Title !== title); // Access bookInfo.Title
    setWishlist(updatedWishlist);

    try {
        await fetch(`/api/read`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ bookIndex : parseInt(BookIndex), userid: userId }), // Include user ID in the request body
        });
    } catch (error) {
        console.error('Error removing book from wishlist:', error);
    }
};


  const handleBookClick = (title) => {
    router.push(`/bookinfo/${title}`);
  };

  return (
    <>
      <Navbar />
      <div className="wishlist-container flex flex-col items-center mx-auto max-w-[80%] p-4">
        <h1 className={`${workSans.className} text-black text-2xl font-extrabold mb-4`}>Your Wishlist</h1>
        {wishlist.length === 0 ? (
          <p className={`${workSans.className} text-black text-lg`}>Your wishlist is empty.</p>
        ) : (
          wishlist.map((book) => (
            <div key={book._id} className="wishlist-item flex items-center justify-between border-2 border-gray-300 p-4 mb-2 w-full shadow-md">
              <div className="flex items-center" onClick={() => handleBookClick(book.bookInfo.Title)}>
                <img src="/cpp.jpeg" alt={book.Title} className="w-[60px] h-[90px] object-cover mr-4" />
                <div>
                  <h2 className="text-black font-bold">{book.Title}</h2>
                  <p className="text-gray-600">Author: {book.Author}</p> 
                  <p className="text-gray-600">Rating: {book.Rating}</p>
                  <p className="text-gray-600">Categories: {book.mycategories}</p>
                </div>
              </div>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => removeFromWishlist(book.BookIndex, book.Title)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}
