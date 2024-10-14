import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(request) {
    const uri = "mongodb://localhost:27017/";
    const client = new MongoClient(uri);

    try {
        // Parse request JSON
        const { userid } = await request.json();

        // Connect to MongoDB
        await client.connect();

        // Access the required collections
        const userDB = client.db('credentials');
        const userCollection = userDB.collection('user_book_info');

        const bookDB = client.db('bookdb');
        const bookCollection = bookDB.collection('books');

        const userinfo_collection = userDB.collection('users');

        const user_details = await userinfo_collection.findOne({userid : userid});


        // Query for the user's book information based on userid
        const userResponse = await userCollection.findOne({ userid: userid });

        if (userResponse && user_details) {
            // const { wishlist, rated: ratedBooks, borrowed } = userResponse;
            const wishlist = Array.isArray(userResponse.wishlist) ? userResponse.wishlist : [];
            const ratedBooks = Array.isArray(userResponse.ratedBooks) ? userResponse.ratedBooks : [];
            const borrowed = Array.isArray(userResponse.borrowed) ? userResponse.borrowed : [];

            console.log(wishlist);
            // Queries for fetching books from the books collection
            const wishlistQuery = { BookIndex: { $in: wishlist } };
            const borrowedQuery = { BookIndex: { $in: borrowed } };
            const ratedQuery = { BookIndex: { $in: ratedBooks } };

            // Execute all book queries in parallel
            const [wishlistResponse, borrowedResponse, ratedResponse] = await Promise.all([
                bookCollection.find(wishlistQuery).toArray(),
                bookCollection.find(borrowedQuery).toArray(),
                bookCollection.find(ratedQuery).toArray()
            ]);

            // Check if all queries returned results
            if (wishlistResponse && borrowedResponse && ratedResponse) {
                const finalResponse = {
                    userid: userid,
                    wishlist: wishlistResponse,
                    borrowed: borrowedResponse,
                    ratedBooks: ratedResponse
                };
                return new Response(JSON.stringify({ success: true, response: finalResponse, userInfo : user_details }), { status: 200 });
            } else {
                return new Response(JSON.stringify({ success: false, message: 'No books found for given queries.' }), { status: 404 });
            }
        } else {
            return new Response(JSON.stringify({ success: false, message: 'User not found.' }), { status: 404 });
        }
    } catch (error) {
        console.error("Error fetching user book data: ", error);
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    } finally {
        // Close the MongoDB connection
        await client.close();
    }
}
