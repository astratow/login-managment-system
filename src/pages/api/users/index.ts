import { NextApiRequest,NextApiResponse } from "next";
import { executeStoredProc } from "@/lib/db";

export default async function handler(req: NextApiRequest, res:  NextApiResponse) {
    if ( req.method === 'GET' )   {
        try {
            const result = await executeStoredProc('GetUsers');
            res.status(200).json(result.recordset);
        } catch (err) {
            res.status(500).json({ error: 'Failed to load users' });
        }
    } 
}