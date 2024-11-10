// app/api/read/route.js
import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017/'; // Replace with your actual MongoDB URI
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}
export async function POST(req) {
    const client = await clientPromise;
    const db = client.db('credentials');
    const userBookInfoColl = db.collection('user_book_info');
    const bookdb = client.db('bookdb');
    const booksColl = bookdb.collection('books');

    try {
        const { userid } = await req.json(); // Extract user ID from request body
        if (!userid) {
            throw new Error('User ID is required');
        }

        // Fetch the wishlist array for the specific user from user_book_info collection
        const user = await userBookInfoColl.findOne({ userid: parseInt(userid) });
        if (!user || !user.wishlist) {
            return new Response(JSON.stringify({ success: false, message: 'Wishlist not found' }), { status: 404 });
        }

        // Use the wishlist array to find corresponding book details in bookdb.books collection
        const wishlistBooks = await booksColl.find({ BookIndex: { $in: user.wishlist } }).toArray();
        console.log(wishlistBooks);
        return new Response(JSON.stringify({ success: true, wishlist: wishlistBooks }), { status: 200 });
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}
// export async function POST(req) {
//     const client = await clientPromise;
//     const db = client.db('credentials');
//     const collection = db.collection('wishlist');

//     try {
//         const { userid } = await req.json(); // Extract user ID from request body
//         if (!userid) {
//             throw new Error('User ID is required');
//         }

//         // Fetch the wishlist for the specific user
//         const wishlist = await collection.find({ userid: userid }).toArray();
//         return new Response(JSON.stringify({ success: true, wishlist }), { status: 200 });
//     } catch (error) {
//         console.error('Error fetching wishlist:', error);
//         return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
//     }
// }

// Add the DELETE method to handle record deletion

export async function DELETE(req) {
    const client = await clientPromise;
    const db = client.db('credentials');
    const userBookInfoColl = db.collection('user_book_info');

    try {
        const { bookIndex, userid } = await req.json(); // Get the book index and user ID from the request body
        if (!bookIndex || !userid) {
            throw new Error('Book index and User ID are required');
        }

        console.log("BookIndex", bookIndex);

        // Perform the deletion operation using $pull to remove the bookIndex from the wishlist array
        const result = await userBookInfoColl.updateOne(
            { userid: parseInt(userid) },
            { $pull: { wishlist: parseInt(bookIndex) } }
        );

        // Check if the deletion was successful
        if (result.modifiedCount > 0) {
            return new Response(JSON.stringify({ success: true }), { status: 200 });
        } else {
            throw new Error('Book not found in wishlist or failed to delete');
        }
    } catch (error) {
        console.error('Error deleting book:', error);
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}



// export async function DELETE(req) {
//     const client = await clientPromise;
//     const db = client.db('credentials');
//     const collection = db.collection('wishlist');

//     try {
//         const { title, userid } = await req.json(); // Get the title and user ID from the request body
//         if (!title || !userid) {
//             throw new Error('Title and User ID are required');
//         }

//         // Perform the deletion operation
//         const result = await collection.deleteOne({ 'bookInfo.Title': title, userid: userid });

//         // Check if the deletion was successful
//         if (result.deletedCount === 1) {
//             return new Response(JSON.stringify({ success: true }), { status: 200 });
//         } else {
//             throw new Error('Failed to delete the book');
//         }
//     } catch (error) {
//         console.error('Error deleting book:', error);
//         return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
//     }
// }
