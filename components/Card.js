'use client'
import React from 'react';
import { Gentium_Book_Plus, Literata } from 'next/font/google';
import { Open_Sans } from 'next/font/google';
import { DM_Sans } from 'next/font/google';
import Stars from './Stars';

// Load the Gentium Book Plus font
const gentiumBookPlus = Gentium_Book_Plus({ weight: '400', subsets: ['latin'] });
const literata = Literata({ weight: '400', subsets: ['latin'] });
const opensans = DM_Sans({ weight: '400', subsets: ['latin-ext'] });

// const 

function Card({ Title, Author, Count, Categories, Rating }) {
  // Split and format the categories
  const categoryArray = Categories.split(',').map(category => category.trim().toUpperCase());

  const displayCategories = categoryArray.length > 2 ? categoryArray.slice(0,2) : categoryArray;

  const trimmedTitle = Title.length > 20 ? `${Title.substring(0, 20)}...` : Title;
  const trimmedAuthor = Author.length > 20 ? `${Author.substring(0, 20)}...` : Author;

  const titleClick = (e) =>{
    console.log(e.target.textContent);
  }

return (
    <div className={`${opensans.className} group flex flex-col bg-transparent border-1 border-r-2 bg-[#eef2f6] border-[#e6dde1] text-xl p-4 w-80 h-80 hover:bg-[#543e8f] hover:shadow-2xl transition: all .2s cubic-bezier(.215,.61,.355,1) hover:text-white`}>
    <div className="flex items-center justify-center h-40 min-w-52 w-full">
  <img 
    src="cpp.jpeg" 
    alt="Book Cover" 
    className="object-contain w-full h-full rounded"
  />
</div>
      
      <div className="flex flex-col justify-between flex-grow p-2 ">
        <h4  className="text-black font-semibold text-lg text-nowrap overflow-hidden text-ellipsis hover:cursor-pointer  group-hover:text-white" onClick={titleClick}>{Title}</h4>
        <span className='text-black text-sm text-ellipsis group-hover:text-white'>Author: {Author}</span>
        <span className='text-black text-sm group-hover:text-white'>Available: {Count}</span>
        <span className='text-black text-sm group-hover:text-white mb-2'><Stars rating={Rating}/></span>
        <ul className={`${literata.className} flex  gap-2 group-hover:text-white`}>
          {displayCategories.map((category, index) => (
            <li key={index} className="text-black text-[10px] p-1 border-2 rounded-xl flex items-center justify-center min-w-[90px] h-8 hover:cursor-pointer group-hover:text-white" onClick={titleClick}>
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Card;
