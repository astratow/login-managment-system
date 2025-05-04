import type { NextApiRequest, NextApiResponse } from "next";
import executeStoredProc from "@/lib/db";
import { getUser} from "@/lib/procedures";

export default async function name( request:NextApiRequest, response: NextApiResponse ) {
    if(request.method !== 'GET') return response.status(405).end();
    
    const userID = parseInt(request.query.id as string, 10);
    if (isNaN(userID)) return response.status(400).json({ error: 'Invalid UserId'});
    try {
        const { name, params } = getUser;
    
        const inputParams = params.map((param) => ({
          ...param,
          value: userID,
        }));
    
        const result = await executeStoredProc(name, inputParams);
        response.status(200).json(result.recordset);
      } catch (err) {
        response.status(500).json({ error: 'Failed to fetch user' });
      }
}