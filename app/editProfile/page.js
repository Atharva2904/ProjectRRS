"use client"
import React, { useState } from 'react';
import { Inter } from '@next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'], // Normal and bold
});

const EditProfilePage = () => {
  const [formData, setFormData] = useState({
    name: sessionStorage.getItem('activeUser'),
    email: '',
    preferences: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Updated Profile:', formData);

    const response = await fetch('/api/changeProfile',{
      method : 'POST',
      'Content-Type' : 'application/json',
      body : JSON.stringify(formData),
    });


    const reply = await response.json();

    if(reply.success){
      console.log("SUCCESSS")
    }
    else{
      console.error("ERROR in updating profile");
    }


  };

  return (
    <div className={`${inter.className} min-h-screen bg-gradient-to-r from-purple-100 via-blue-100 to-green-100 p-6 flex items-center justify-center`}>
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
              Username
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={sessionStorage.getItem('activeUser')}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none text-gray-900"  // Updated text color to ensure visibility
              placeholder="Enter your name"
              disabled
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none text-gray-900"  // Updated text color
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Preferences */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="preferences">
              Preferences
            </label>
            <input
              type="text"
              id="preferences"
              name="preferences"
              value={formData.preferences}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none text-gray-900"  // Updated text color
              placeholder="Enter your preferences (comma separated)"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-blue-600 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
