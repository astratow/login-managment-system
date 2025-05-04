import { NextApiRequest,NextApiResponse } from "next";
import executeStoredProc from "@/lib/db";
import * as sql from 'mssql';

export default async function handler(req: NextApiRequest, res:  NextApiResponse) {
    if ( req.method === 'GET' )   {
        try {
            const result = await executeStoredProc('GetUsers');
            res.status(200).json(result.recordset);
        } catch (err) {
            res.status(500).json({ error: 'Failed to load users' });
            console.error( 'Error: ', err);
        }
    } else   if (req.method === "DELETE") {
        const { UserID } = req.body;
    
        if (!UserID) {
          return res.status(400).json({ error: 'UserID is required' });
        }
    
        try {
          await executeStoredProc('DeleteUser', [
            { name: 'UserID', type: sql.Int(), value: UserID }
          ]);
    
          return res.status(200).json({ message: `User ${UserID} deleted successfully` });
        } catch (error) {
          console.error('Fail to delete user: ', error);
          return res.status(500).json({ error: `Failed to delete user ${UserID}.` });
        }
    }
}