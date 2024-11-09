import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Stars from './Stars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHolding } from '@fortawesome/free-solid-svg-icons';


export default function BookDetail({ books }) {

  const { id } = useParams();
  // const book = books.BookIndex; // Get the book using ID from the URL

  const book = true;
  const [bookInfo, setbookInfo] = useState({});
  const [newReview, setNewReview] = useState('');
  const [reviews, setReviews] = useState([
    { id: 1, eachComment: 'Great book!', username: 'John Doe' },
  ]);

  // async function insertComment(userid, title, comment) {
  //     const uri = "mongodb://localhost:27017/";
  //     const client = new MongoClient(uri);

  //     try{
  //       const database = client.db('credentials');
  //       const commentCollection = database.collection('comments');

  //       const query = {
  //         userid : userid,
  //         Title : title,
  //         comment : [comment]
  //       }

  //       const insertResponse = await commentCollection.insertOne(query);
  //       if(insertResponse){
  //         return true;
  //       }
  //       else{
  //         return false;
  //       }
  //     } 
  //     catch(error){
  //       console.error("Error in updating comments: ", error);
  //     }

  // }
  useEffect(() => {

    async function getComments() {

      try {
        console.log("Books", books);
        const value = JSON.parse(books);
        setbookInfo(value);


        const response = await fetch('/api/comment', {
          method: 'POST',
          'Content-Type': 'application/json',
          body: JSON.stringify({ 'title' : value.Title }),

        });

        const reply = await response.json();
        if (reply.success) {
          const comments = reply.comments;
          setReviews(comments);

        }
        else {
          console.error(reply.message);
        }



        console.log(value);
      }
      catch (error) {
        console.log(error);
      }
      // setbookInfo(JSON.parse(books));
    }

    getComments();
  }, [books])

  const handleBorrow = async () => {
    try {
      const sendobj = {
        'Action': 'borrowed',
        'Title': bookInfo.Title,
        'Timestamp': Date.now(),
        'User': parseInt(sessionStorage.getItem('userid'), 10),
        'Tags': bookInfo.mycategories,
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
    catch (error) {
      console.error(error);
    }
  }
  const handleAddReview = async () => {
    try {

      if (newReview.trim() !== '') {
        setReviews([...reviews, { id: reviews.length + 1, content: newReview, author: sessionStorage.getItem('activeUser') }]);
        setNewReview(''); // Clear the input field after adding the review

        const userid = sessionStorage.getItem('userid');
        // const commentInserted = await insertComment(userid, bookInfo.Title, newReview);

        const response = await fetch('/api/comments/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userid,
            title: bookInfo.Title,
            comment: newReview
          })
        });

        const data = await response.json();

        if (data.success) {
          console.log("Comment added successfully");
        }
        else {
          console.error("Failed to add comment");
        }
      }



      const sendobj = {
        'Action': 'commented',
        'Title': bookInfo.Title,
        'Timestamp': Date.now(),
        'User': parseInt(sessionStorage.getItem('userid'), 10),
        'Tags': bookInfo.mycategories,
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

    catch (error) {
      console.error(error);
    }


  };

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <>
      <div
        style={{
          backgroundImage: "url('/home-background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          height: "100vh",
          width: "100vw",
          position: 'fixed',
          zIndex: -1,
        }}
      ></div>

      <div className="book-detail-container flex justify-center items-start p-[20px] h-screen">
        <div className="book-detail-card flex min-w-[50%] min-h-[70%] bg-gradient-to-l from-[#f8edeb] to-[#ebf2fa] rounded-md shadow-lg overflow-hidden gap-[20px] max-w-[60%]">

          <div className="book-photo-container w-[40%] flex flex-col items-center text-center p-0 mt-2  relative">
            {bookInfo.Thumbnail_Path ? (
              <img src={`/${bookInfo.Thumbnail_Path}`} alt={bookInfo.Title} className="book-detail-image w-[50%] h-auto object-cover rounded-s-md mt-3" />
            ) : (
              <img src='/cpp.jpeg' alt={bookInfo.Title} className="book-detail-image w-[50%] h-auto object-cover rounded-s-md mt-3" />
            )}

            {/* borrow */}
            <button className="group borrow-button inline-flex items-center justify-center p-1 cursor-pointer rounded-md bg-gradient-to-br from-[#7cadc7] to-[#335b67] text-white hover:from-[#9b56df] hover:to-[#e9469d] transition-all duration-200 mt-[20px] border-b-2">
              <FontAwesomeIcon icon={faHandHolding} className='w-auto h-[25px] mr-[4px] p-1 ' />
              <span className='mt-3 text-lg p-1 group-hover:text-white'> Borrow </span>
            </button>
          </div>

          <div className="book-info-container p-[20px] w-[60%] flex flex-col">
            <h1 className="book-detail-title text-lg text-black font-bold">{bookInfo.Title}</h1>
            <p className="book-detail-author text-[18px] mb-[10px]">by: {bookInfo.Author}</p>

            <div className="book-detail-rating">
              <Stars rating={bookInfo.Rating} />
            </div>
            {bookInfo.Description ? (
              <p className="book-detail-description text-[16px] break-words mb-[20px] mt-2"><strong> Description: </strong> {bookInfo.Description}</p>
            ) : (
              <p className="book-detail-description text-[16px] break-words mb-[20px]">No description available</p>
            )}

            <ul className="book-details-list list-none p-0">
              <li className='text-[16px] mb-[10px]'><strong>Publisher:</strong> {bookInfo.Publisher}</li>
              {bookInfo.publishedDate ? (
                <li className='text-[16px] mb-[10px]'><strong>Published Date:</strong> {bookInfo.publishedDate}</li>
              ) : (
                <li className='text-[16px] mb-[10px]'><strong>Published Date:</strong> Unknown</li>
              )}
              {bookInfo.isKRC && bookInfo.count > 0 ? (
                <li className='text-[16px] mb-[10px]'><strong>Available in KRC</strong></li>
              ) : (
                <li className='text-[16px] mb-[10px]'><strong>Not available in KRC</strong></li>
              )}
              <li><strong>Categories:</strong> {bookInfo.mycategories}</li>
            </ul>

            <h1 className='reviews mt-[30px] text-black text-[18px] font-bold'>Add Review</h1>
            <textarea
              className="review-textbox w-[100%] h-[100px] text-black mt-[10px] p-[10px] text-[14px] border-2 border-gray-500 rounded outline-none"
              placeholder="Write your review here..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            />
            <button onClick={handleAddReview} className="submit-review-button mt-[10px] bg-inherit p-2 border-2 border-gray-350 rounded cursor-pointer bg-gradient-to-br from-[#7cadc7] to-[#335b67] text-white hover:bg-gradient-to-br hover:from-[#7f00ff] hover:to-[#ff6a88] hover:text-white hover:border-none transition-all duration-200">Submit Review</button>

            <h1 className='reviews mt-[30px] text-black text-[18px] font-bold'>Reviews</h1>
            <ul className="review-list list-none p-0 mt-[20px] text-[#171717]">
              {reviews.map((review) => (
                <li key={review.id} className="review-item mb-[10px] pb-[10px] border-b-2  border-gray-200">
                  <strong>{review.username}:</strong> {review.eachComment}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

//   return (
//     <div className="book-detail-container flex justify-center items-start p-[20px] h-screen">
//       <div className="book-detail-card flex min-w-[50%] min-h-[70%]  bg-gradient-to-l from-[#f8edeb] to-[#ebf2fa] rounded-md shadow-lg overflow-hidden gap-[20px] max-w-[60%]">
//         {/* Left: Book Image and Borrow Button */}
//         <div className="book-photo-container w-[40%] flex flex-col items-center text-center p-0 mt-2  relative">
//           {book.Thumbnail ? <img src={bookInfo.Thumbnail} alt={bookInfo.Title} className="book-detail-image w-[50%] h-auto object-cover rounded-s-md mt-3" /> : <img src='/cpp.jpeg' alt={bookInfo.Title} className="book-detail-image w-[50%] h-auto object-cover rounded-s-md mt-3" />

//           }

//           {/* Borrow Button */}
//           <button className="group borrow-button inline-flex items-center justify-center p-1 cursor-pointer rounded-md hover: bg-gradient-to-br hover:from-[#9b56df] hover:to-[#e9469d] hover:text-white transition-all duration-200 mt-[20px] border-b-2" onClick={handleBorrow}>
//             <FontAwesomeIcon icon={faHandHolding} className='w-auto h-[25px] mr-[4px] p-1 ' />
//             {/* <img
//               src="/borrow.png" // Replace with actual icon path
//               alt="Borrow Icon"
//               className="borrow-icon"
//             /> */}
//             <span className='mt-3 text-lg p-1 group-hover:text-white'> Borrow </span>
//           </button>
//         </div>

//         {/* Right: Book Info */}
//         <div className="book-info-container p-[20px] w-[60%] flex flex-col">
//           <h1 className="book-detail-title text-lg text-black font-bold">{bookInfo.Title}</h1>
//           <p className="book-detail-author text-[18px] mb-[10px]">by: {bookInfo.Author}</p>

//           <div className="book-detail-rating">
//             <Stars rating={bookInfo.Rating} />
//             {/* <strong>Rating:</strong> {book.Rating} */}
//           </div>
//           {bookInfo.Description ?
//             <p className="book-detail-description text-[16px] break-words mb-[20px] mt-2 "><strong> Description: </strong> {bookInfo.Description}</p>
//             : <p className="book-detail-description text-[16px] break-words mb-[20px]">No description available</p>

//           }

//           <ul className="book-details-list list-none p-0">
//             <li className='tetx-[16px] mb-[10px]'><strong >Publisher:</strong> {bookInfo.Publisher}</li>
//             {bookInfo.publishedDate ?
//               <li className='tetx-[16px] mb-[10px]'><strong >Published Date:</strong> {bookInfo.publishedDate}</li>
//               : <li className='tetx-[16px] mb-[10px]'><strong >Published Date:</strong> Unknown </li>

//             }
//             {/* <li><strong>Pages:</strong> {book.pageCount}</li> */}
//             {
//               bookInfo.isKRC && bookInfo.count > 0 ?
//                 <li className='tetx-[16px] mb-[10px]'><strong >Available in KRC</strong></li> :
//                 <li className='tetx-[16px] mb-[10px]'><strong >Not available in KRC</strong></li>

//             }
//             <li><strong>Categories:</strong> {bookInfo.mycategories}</li>
//           </ul>

//           <h1 className='reviews mt-[30px] text-black text-[18px] font-bold'>Add Review</h1>
//           <textarea
//             className="review-textbox w-[100%] h-[100px] text-black mt-[10px] p-[10px] text-[14px] border-2 border-gray-500 rounded outline-none"
//             placeholder="Write your review here..."
//             value={newReview}
//             onChange={(e) => setNewReview(e.target.value)}
//           />
//           <button onClick={handleAddReview} className="submit-review-button text-black mt-[10px] bg-inherit p-2 border-2 border-gray-350 rounded cursor-pointer hover:bg-gradient-to-br hover:from-[#7f00ff] hover:to-[#ff6a88] hover:text-white hover:border-none transition-all duration-200">Submit Review</button>
//           {/* <button
//             // className="submit text-white mt-[10px] bg-[#2368b2f3] p-2 border-none rounded bg-gradient-to-r from-[#160f29] to-[#134074] flex items-center gap-2 transform hover:scale-105 hover:from-[#134074] hover:to-[#160f29] transition-transform duration-300 ease-in-out hover:shadow-lg text-center"
//             onClick={handleAddReview}
//           >Submit Review</button> */}

//           <h1 className='reviews mt-[30px] text-black text-[18px] font-bold'>Reviews</h1>
//           <ul className="review-list list-none p-0 mt-[20px] text-[#171717]">
//             {reviews.map((review) => (
//               <li key={review.id} className="review-item mb-[10px] pb-[10px] border-b-2  border-gray-200">
//                 <strong>{review.author}:</strong> {review.content}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }
