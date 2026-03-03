import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter, expressWrapper } from "next-connect";
import middleware from "../../middleware/middleware";
import clientPromise from "../../middleware/database";


// // Define response types for better type safety
// interface ErrorResponse {
//   error: string;
// }

// interface SuccessResponse {
//   message: string;
//   data?: any;
// }


// ERROR MODEL - Inspiration
// "status": "error", // This can be ‘error’ or ‘success’
// "statusCode": 404,
// "error": {
//   "code": "RESOURCE_NOT_FOUND",
//   "message": "The requested resource was not found.",
//   "details": "The user with the ID '12345' does not exist in our records.",
//   "timestamp": "2023-12-08T12:30:45Z",
//   "path": "/api/v1/users/12345",
//   "suggestion": "Please check if the user ID is correct or refer to our documentation at https://api.example.com/docs/errors#RESOURCE_NOT_FOUND for more information."
// },
// "requestId": "a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8",
// "documentation_url": "https://api.example.com/docs/errors"

type ResponseData = {
  message: String,
  status?: String,
  statusCode: Number,
  error?: {
    code: String,
    message: String,
    details?: String,
    timestamp?: String,
    path?: String,
    suggestion?: String
    }
  requestId?: String
}

// // Create the handler with proper typing
// const handler = nc<ExtendedNextApiRequest, NextApiResponse<ErrorResponse | SuccessResponse | GetUsersResponse>>();

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(middleware);

  const client = await clientPromise;
  const db = client.db("MBPDB");

// GET endpoint - doesn't require auth
router.get(async (req: NextApiRequest,
  res: NextApiResponse) => {
  const allPosts = await db.collection("projects").find({}).toArray();
  console.log(`GET /projects -> `, allPosts);
  res.status(200).json(allPosts);
  //res.status(200).json({ message: 'Hello from Hello!' })
});

router.post(async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    //let bodyObject = JSON.parse(req.body);
    console.log(`POST /projects -> `, req.body);
    let myPost = await db.collection("projects").insertOne(req.body);
    console.log(myPost);
    if(myPost.acknowledged) {
        res.status(200).json({"message": "Success", "statusCode": 200});
    } else {
      res.status(502).json({"message": "Bad Request", "statusCode": 502})
    }

})

router.put(async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    //let bodyObject = JSON.parse(req.body);
    console.log(`POST /projects -> `, req.body);
    let myPost = await db.collection("projects").insertOne(req.body);
    console.log(myPost);
    if(myPost.acknowledged) {
        res.status(200).json({"message": "Success", "statusCode": 200});
    } else {
      res.status(502).json({"message": "Bad Request", "statusCode": 502})
    }

})

export default router.handler({
  onError: (err, req, res) => {
    console.error(err);
  },
});

// export default router.handler((req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
//   if(req.method === "OPTIONS") {
//     console.log("OPTIONS Request");
//     // Set CORS headers for preflight requests
//     res.setHeader('Access-Control-Allow-Origin', 'localhost'); // Or specific origin(s)
//     res.setHeader('Vary', 'Origin');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.setHeader('Access-Control-Max-Age', 7200);
//     res.status(200).end(); // Respond with 200 OK for preflight
//   } 
//   onError: (err: any, req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
//     console.error(err);
//   }
// });
// Error handling
// router.onError((err, req, res) => {
//   console.error(err);
//   res.status(500).json({ error: 'Something went wrong' });
// });

// // 404 handler
// router.onNoMatch((req, res) => {
//   res.status(404).json({ error: 'API route not found' });
// });

// router
//   .use(middleware)
//   // A middleware example
//   .use(async (req, event, next) => {
//     const start = Date.now();
//     await next(); // call next in chain
//     const end = Date.now();
//     console.log(`Request took ${end - start}ms`);
//     //return NextResponse.next();
//   });

// export default router.handler({
//   onError: (err, req, event) => {
//     console.error("Error", err);
//     return new NextResponse("Something broke!");
//   },
// });

// middleware.use(req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   res.status(200).json({ message: 'Hello from Next.js!' })
// }

// )
 
// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   res.status(200).json({ message: 'Hello from Next.js!' })
// }