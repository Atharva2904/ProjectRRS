import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

// This function can be marked `async` if using `await` inside
export async function POST(request) {
    const uri = "mongodb://localhost:27017/";

    const client = new MongoClient(uri);
    try {
        const { name, email, preferences } = await request.json();
        await client.connect();
        const database = client.db('credentials');
        const collection = database.collection('users');

        const query = { username: name };
        const credentials = await collection.findOne(query);

        if (credentials) {
            // Update the email field of the user
            await collection.updateOne(
                { username: name },
                {
                    $set: { email: email },
                    $addToSet: { interests: preferences }  // Use $push if duplicates are allowed
                }
            );
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: 'An error occurred' });
    } finally {
        await client.close(); // Ensure the client is closed after the operation
    }
}
