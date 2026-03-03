import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter, expressWrapper } from "next-connect";

// router
//   // A middleware example
//   .use(async (req, res, next) => {
//     const start = Date.now();
//     await next(); // call next in chain
//     const end = Date.now();
//     console.log(`Request took ${end - start}ms`);
//   })

const loggerMiddleware = async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
    //TODO: Investigate a robust error message builder here
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};

export default loggerMiddleware;
