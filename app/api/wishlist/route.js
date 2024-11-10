// app/api/wishlist/route.js
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
    const collection = db.collection('wishlist');
    const wishlistColl = db.collection('user_book_info');

    try {
        const { book, userid } = await req.json(); // Get the book details from the request body
        const query = { bookInfo: book, userid: userid }; // Ensure userid is included in the query

        console.log('Received book:', book.BookIndex); // Debugging line

        // Ensure book is an object and has required fields
        if (!book || typeof book !== 'object') {
            throw new Error('Book data is required and must be an object');
        }

        // Perform the insertion operation
        // const result = await collection.insertOne(query);


        const user = await wishlistColl.findOne({ userid: parseInt(userid) });
        let updatedWishlist;

        if (user) {
            updatedWishlist = user.wishlist || [];

            if (!updatedWishlist.includes(book.BookIndex)) {
                updatedWishlist.push(parseInt(book.BookIndex));
            }
            else {
                return new Response(JSON.stringify({ success: true, message: 'Book already in wishlist' }), { status: 200 });

            }
        }
        else {
            updatedWishlist = [parseInt(book.BookIndex)];
        }
        console.log("Wishlist", updatedWishlist);
        const result = await wishlistColl.updateOne(
            { userid: parseInt(userid) },
            { $set: { wishlist: updatedWishlist } },
        );

        // Check if the insertion was successful
        if (result.acknowledged) {
            return new Response(JSON.stringify({ success: true, result }), { status: 201 });
        } else {
            throw new Error('Failed to insert book');
        }
    } catch (error) {
        console.error('Error inserting book:', error);
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}




export async function GET(req) {
    const client = await clientPromise;
    const db = client.db('credentials');
    const collection = db.collection('wishlist');
    const wishlistColl = db.collection('user_book_info');

    try {
        const { userid } = await req.json(); // Extract user ID from request body
        if (!userid) {
            throw new Error('User ID is required');
        }

        // Fetch the wishlist for the specific user
        const wishlist = await collection.find({ userid: userid }).toArray();
        return new Response(JSON.stringify({ success: true, wishlist }), { status: 200 });
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}
