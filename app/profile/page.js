"use client"
import React from 'react';
import { FaBook, FaHeart, FaStar, FaUserEdit } from 'react-icons/fa'; // Icons for visual appeal
import { useEffect } from 'react';
import { useState } from 'react';

const ProfilePage = () => {

    const [wishlist, setWishlist] = useState([]);
    const [Borrowed, setBorrowed] = useState([]);
    const [rated, setrated] = useState([]);
    const [userInfo, setuserInfo] = useState({});
    const [userData, setuserData] = useState({
        userDetails: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            gender: 'Male',
            preferences: ['Machine Learning', 'Web Development', 'Cybersecurity'],
        },
        borrowedBooks: [
            { title: 'Introduction to Algorithms', category: 'Computer Science' },
            { title: 'The Pragmatic Programmer', category: 'Computer Science' },
            { title: 'Clean Code', category: 'Computer Science' },
        ],
        ratedBooks: [
            { title: 'Artificial Intelligence: A Modern Approach', category: 'Computer Science' },
        ],
        wishlist: [
            { title: 'Design Patterns: Elements of Reusable Object-Oriented Software', category: 'Computer Science' },
            { title: 'The Mythical Man-Month', category: 'Computer Science' },
        ],
    });


    async function getUserBookData(userid) {
        try {
            const response = await fetch('/api/book_interaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({ userid: parseInt(userid, 10) }),
            });

            const data = await response.json();

            if (data.success) {

                // console.log(data.userInfo);
                // console.log(data.response);
                // const { wishlist, borrowed, ratedBooks, userDetails } = data.response;

                console.log('Data response : ', data.response, data.userInfo)
                setWishlist(data.wishlist);
                setrated(data.ratedBooks);
                setBorrowed(data.borrowed);



                setuserData({
                    'userDetails': data.userInfo,
                    'wishlist': data.response.wishlist,
                    'borrowedBooks': data.response.borrowed,
                    'ratedBooks': data.response.ratedBooks
                })
                // userData['userDetails'] = userInfo;
                // userData['wishlist'] = wishlist;
                // userData['borrowedBooks'] = Borrowed;
                // userData['ratedBooks'] = rated;

                console.log(userData);
                // const searchResults = data['userData'];
                // console.log(searchResults);
            }
            else {
                console.log(data.message);
            }

        }
        catch (error) {
            console.error("ERROR while fetching api/filter", error);
        }
    }

    useEffect(() => {
        const userid = sessionStorage.getItem('userid');
        getUserBookData(userid);



    }, [])

    // const computerBooks = userData.borrowedBooks.filter(book => book.category === 'Computer Science');

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-200 via-blue-100 to-purple-100 p-6">

            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg border-4 border-gray-200">

                <div className="flex justify-between items-center mb-8 border-b pb-4">
                    <h1 className="text-4xl font-bold text-gray-800">Profile</h1>
                    <a href="/editProfile">
                        <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition">
                            <FaUserEdit className="mr-2" /> Edit Profile
                        </button>
                    </a>
                </div>

                {/* User Details Section */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">User Details</h2>
                    <p className="text-gray-700 mb-2"><strong>Name:</strong> {userData.userDetails.firstName}</p>
                    <p className="text-gray-700 mb-2"><strong>Email:</strong> {userData.userDetails.email}</p>
                    <p className="text-gray-700 mb-2"><strong>Gender:</strong> {userData.userDetails.gender}</p>
                    {/* <p className="text-gray-700"><strong>Preferences:</strong> {userData.userDetails.interests.split(', ')}</p> */}
                    <p className="text-gray-700"><strong>Preferences:</strong> {userData.userDetails.interests ? userData.userDetails.interests.join(', ') : 'No preferences available'}</p>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Borrowed Books Section */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <FaBook className="mr-2 text-green-500" /> Borrowed Books
                        </h2>
                        <ul className="list-disc list-inside text-gray-700">
                            {
                                userData.borrowedBooks.map((book, index) => (
                                    <li key={index} className="mb-2">{book.Title}</li>
                                ))
                            }
                        </ul>
                    </div>

                    {/* Rated Books Section */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <FaStar className="mr-2 text-yellow-500" /> Rated Books
                        </h2>
                        <ul className="list-disc list-inside text-gray-700">
                            {userData.ratedBooks.map((book, index) => (
                                <li key={index} className="mb-2">{book.Title}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Wishlist Section */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <FaHeart className="mr-2 text-red-500" /> Wishlist
                        </h2>
                        <ul className="list-disc list-inside text-gray-700">
                            {userData.wishlist.map((book, index) => (
                                <li key={index} className="mb-2">{book.Title}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
