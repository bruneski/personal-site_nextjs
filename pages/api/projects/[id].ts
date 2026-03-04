import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter, expressWrapper } from "next-connect";
import middleware from "../../../middleware/middleware";
import clientPromise from "../../../middleware/database";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(middleware);

//Connects to DB
const client = await clientPromise
const db = client.db("MBPDB");

router.get(async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.query);
    const {id} = req.query;
    if(typeof id !== 'string') {
        return res.status(400).json({message: "Invalid project ID"})
    }
    db.collection("projects").findOne({uri: id}).then((project) => {
        if(project) {
            return res.status(200).json(project);
        } else {
            return res.status(404).json({message: `Project ${id} not found`})
        }
    }).catch((err) => {
        console.error(err);
        return res.status(500).json({message: "Internal Server Error"})
    })
});

router.put(async (req: NextApiRequest, res: NextApiResponse) => {
    const {id} = req.query;
    console.log(`${req.method} to ${req.url}`);
    if(typeof id !== 'string') {
        return res.status(400).json({message: "Invalid request id"})
    }
    const project = await db.collection("projects").findOne({uri: id});
    const updatedProject = {...project}
    if(project) {
        if(typeof req.body === 'object') {
            for (const [key, value] of Object.entries(req.body)) {
                console.log(`${key}: ${value}`);
                if(!!project[key] && project[key].length > 0) {
                    updatedProject[key] = value;
                }
            }
        }
        console.log("Old obj", project);
        console.log("Final obj", updatedProject);
        db.collection("projects").updateOne({uri: id}, {$set: updatedProject}).then((result) => {
            if(result.modifiedCount > 0) {
                return res.status(200).json({message: `Record updated for project ${id}`})
            } else {
                return res.status(404).json({message: `Project ${id} not found`})
            }
        }).catch((err) => {
            console.error(err);
            return res.status(500).json({message: "Internal Server Error"})
        })
    }
    //return res.status(200).json({message: `Record updated for project ${id}`})
});

export default router.handler({
    onError: (err, req, res) => {
        console.error(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});