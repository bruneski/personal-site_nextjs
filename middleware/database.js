import { MongoClient } from 'mongodb';
import { createRouter } from 'next-connect';
import { NextRequest, NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

let client
let clientPromise

if (!process.env.MONGODB_URI) {
  throw new Error('Add Mongo URI to .env.local')
}
// In development mode, use a global variable so that the value
// is preserved across module reloads caused by HMR (Hot Module Replacement).
if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}


export default clientPromise

// async function database(req, res, next) {
//   req.dbClient = client;
//   console.log(client);
//   req.db = client.db('MBPDB');
//   return next();
// }

// export function middleware(request) {
//     // Middleware logic here
//     // request.dbClient = client;
//     // request.db = client.db('MBPDB');
//     console.log("middleware -> ", request);
//     return NextResponse.next();
// }

// export const config = {
//   matcher: ['/api/*'],
// };

// export default function middleware(request) {
//   // Example: Redirect unauthorized users to the login page
//   request.dbClient = client;
//   console.log(client);
//   request.db = client.db('MBPDB');
//   // if (request.nextUrl.pathname.startsWith('/dashboard')) {
//   //   const isAuthenticated = request.cookies.has('session-token'); // Check if a session token exists
//   //   if (!isAuthenticated) {
//   //     return NextResponse.redirect(new URL('/login', request.url)); 
//   //   }
//   // }

//   // Allow the request to proceed
//   return NextAPIResponse.next();
// }

// Optionally, define which paths the middleware should apply to
// export const config = {
//   matcher: ['/dashboard/:path*'], 
// };

// const middleware = createRouter();
// middleware.use(database);

// export default middleware;