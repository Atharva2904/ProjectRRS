import React from 'react'
import Card from './Card'
import { Gentium_Book_Plus } from 'next/font/google';
const gentiumBookPlus = Gentium_Book_Plus({ weight: '400', subsets: ['latin'] });
const books =
  [
    {
      "Title": "Html / Xml For Beginners",
      "Index": 2983,
      "Author": "Morrison, M",
      "Count": 1,
      "Categories": "html",
      "Rating": 4.86
    },
    {
      "Title": "Html Complete",
      "Index": 2476,
      "Author": "Sybex",
      "Count": 5,
      "Categories": "html",
      "Rating": 4.51
    },
    {
      "Title": "Html in Plain English",
      "Index": 4754,
      "Author": "Sandra E. Eddy",
      "Count": 1,
      "Categories": "html",
      "Rating": 4.235910672853827
    },
    {
      "Title": "An Introduction to HTML and JavaScript",
      "Index": 7529,
      "Author": "unknown",
      "Count": 1,
      "Categories": "javascript', 'html",
      "Rating": 4.235910672853827
    },
    {
      "Title": "HTML in an Instant",
      "Index": 6451,
      "Author": "Ruth Maran",
      "Count": 1,
      "Categories": "html",
      "Rating": 4.235910672853827
    },
    {
      "Title": "Guide to HTML JavaScript and PHP",
      "Index": 8299,
      "Author": "unknown",
      "Count": 1,
      "Categories": "javascript', 'html', 'webdevelopment",
      "Rating": 4.235910672853827
    },
    {
      "Title": "e-Business and e-Commerce How to Program",
      "Index": 5144,
      "Author": "Harvey M. Deitel', 'Paul J. Deitel', 'Tem R. Nieto",
      "Count": 1,
      "Categories": "html', 'css', 'computernetworks', 'softwareengineering', 'cybersecurity",
      "Rating": 4.235910672853827
    },
    {
      "Title": "DDC Learning HTML 4.0",
      "Index": 6211,
      "Author": "Curt Robbins', 'Susan Alcorn', 'Amy Towery",
      "Count": 1,
      "Categories": "html', 'css', 'c",
      "Rating": 4.235910672853827
    },
    {
      "Title": "HTML and CSS Web Standards Solutions",
      "Index": 8263,
      "Author": "unknown",
      "Count": 1,
      "Categories": "html', 'css",
      "Rating": 4.235910672853827
    },
    {
      "Title": "The Essential Guide to CSS and HTML Web Design",
      "Index": 8593,
      "Author": "unknown",
      "Count": 1,
      "Categories": "html', 'css",
      "Rating": 4.235910672853827
    },
    {
      "Title": "Pro CSS and HTML Design Patterns",
      "Index": 8466,
      "Author": "unknown",
      "Count": 1,
      "Categories": "html', 'css",
      "Rating": 4.235910672853827
    },
    {
      "Title": "Beginning HTML with CSS and XHTML",
      "Index": 8326,
      "Author": "unknown",
      "Count": 1,
      "Categories": "html', 'css",
      "Rating": 4.235910672853827
    },
    {
      "Title": "Learn HTML on the Mac in a Weekend (In a Weekend) (Book & CD-ROM)",
      "Index": 4192,
      "Author": "Steven E. Callihan",
      "Count": 1,
      "Categories": "html",
      "Rating": 4.235910672853827
    },
    {
      "Title": "HTML & XHTML : The Definitive Guide",
      "Index": 5077,
      "Author": "Elisabeth Robson', 'Eric Freeman",
      "Count": 1,
      "Categories": "html', 'css",
      "Rating": 4.235910672853827
    },
    {
      "Title": "New Perspectives on Creating Web Pages with HTML -- Introductory",
      "Index": 4526,
      "Author": "Patrick Carey",
      "Count": 1,
      "Categories": "html",
      "Rating": 4.235910672853827
    },
    {
      "Title": "HTML Pocket Reference",
      "Index": 3831,
      "Author": "Jennifer Niederst Robbins', 'Jennifer Niederst",
      "Count": 1,
      "Categories": "html",
      "Rating": 4.235910672853827
    },
    {
      "Title": "Html Black Book",
      "Index": 2613,
      "Author": "Holzners.",
      "Count": 1,
      "Categories": "html",
      "Rating": 3.57
    },
    {
      "Title": "Using Html 4",
      "Index": 508,
      "Author": "Phillips",
      "Count": 2,
      "Categories": "html",
      "Rating": 2.77
    },
    {
      "Title": "Mastering Html 4.0",
      "Index": 371,
      "Author": "Ray D S",
      "Count": 2,
      "Categories": "html",
      "Rating": 2.76
    }
  ]

function BookList({ heading, books }) {


  //   return (
  //     <div className="container p-20 h-fit w-auto">
  //       <h2 className='text-black text-2xl m-4'>{heading}</h2>
  //       <div className={`heading ${heading} flex justify-evenly space-x-2 overflow-auto hover:cursor-pointer`} >
  //         {
  //           books.map((book, index) => (
  //             const bcount = book.isKRC ? book.count : 0;
  //             return(
  //             <Card
  //               key={index}
  //               Title={book.Title}
  //               Author={book.Author}
  //               {book.isKRC ? Count = {book.count} : Count = 0}
  //               Categories={book.mycategories}
  //               Rating={book.Rating}
  //             />
  //           );
  //         }

  //       </div>

  //     </div>

  //   );
  // }
  return (
    <div className="container p-20 h-fit w-auto">
      <h2 className='text-black text-2xl m-4 font-semibold'>{heading}</h2>
      <div className={`heading ${heading} flex justify-evenly space-x-2 overflow-x-scroll hover:cursor-pointer `}>
        {books.map((book) => {
          // Calculate Count before rendering the Card
          const count = book.isKRC ? book.count : 0;
          // console.log(book);
          return (
            <Card
              key={book.Title} // Use a unique identifier for the key
              Title={book.Title}
              Author={book.Author}
              Count={count} // Pass Count as a prop
              Categories={book.mycategories}
              Rating={book.Rating}
              Thumbnail={book.Thumbnail_Path}
            />
          );
        })}
      </div>
    </div>
  );
}
  export default BookList;
