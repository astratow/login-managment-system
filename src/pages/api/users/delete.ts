import type { NextApiRequest, NextApiResponse } from "next";
import executeStoredProc from "@/lib/db";
import * as sql from 'mssql';

export default async function handler( request: NextApiRequest, response: NextApiResponse) {
    if (request.method === "DELETE") {
        const {UserID} = request.body;

        if(!UserID) {
            return response.status(400).json({ error: 'UserID is required' });
        }

        try {
            await executeStoredProc('DeleteUser', [
                { name: 'UserID', type: sql.Int(), value: UserID}
            ])
            response.status(200).json({ message: `User ${UserID} deleted successfully`});
        } catch (error) {
            console.error('Fail to delete user: ', error);
            response.status(500).json({ error: `Failed to delete user ${UserID}.`});
        }

    } else {
        response.status(405).json({ error: 'Method not allowed' });
    }
}

//     const userId = parseInt(request.query.id as string, 10);
//     if (isNaN(userId)) return response.status(400).json({ error: "Invalid userId" });
  
//     try {
//       const result = await deleteUser(userId);
  
//       if (result > 0) {
//         return response.status(200).json({ success: true });
//       } else {
//         return response.status(404).json({ error: "User not found" });
//       }
//     } catch (error) {
//       console.error(error);  
//       return response.status(500).json({ error: "Failed to delete user" });
//     }
// }