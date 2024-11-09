import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

// This function can be marked `async` if using `await` inside
export async function POST(request) {
    const uri = "mongodb://localhost:27017/";

    const client = new MongoClient(uri);
    // if (request.nextUrl.pathname.startsWith('/login')){
    try {
        const { title } = await request.json();
        console.log(title);
        await client.connect();
        const DB = client.db("credentials");
        const commentColl = DB.collection("comments");

        const commentQuery = { title: title };
        const comments = await commentColl.find(commentQuery).toArray();

        // console.log(credentials);
        if (comments.length > 0) {
            const userColl = DB.collection("users");
            // console.log(comments);
            const userPromises = comments.map(async (comment) => {
                const user = await userColl.findOne({ userid: parseInt(comment.userid) });
                const id = parseInt(comment.userid);
                const username = user ? user.username : "John Doe";
                const eachComment = comment ? comment.comment[0] : "Good Book";
                return {  id, username, eachComment };

            });

            const commentsWithUsers = await Promise.all(userPromises);
            console.log(commentsWithUsers);
            // const userid = comments.userid;            
            // console.log("Userid", userid);

            // const user = await userColl.findOne()

            return NextResponse.json({ success: true, comments: commentsWithUsers });

        }
        else {

            return NextResponse.json({ success: false, message: 'Invalid Query' });
        }
    }
    catch (error) {
        console.log(error);
    }
}
//   return NextResponse.redirect(new URL('/home', request.url))

// }

// See "Matching Paths" below to learn more
// export const config = {
//     matcher: '/about/:path*',
// }