
import { NextApiRequest, NextApiResponse } from 'next';
import executeStoredProc from '@/lib/db';
import * as sql from 'mssql';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const userID = parseInt(request.query.id as string, 10);


  if (request.method === 'PUT') {

    const {
      DisplayName,
      Email,
      IsOSPAdmin,
      Status,
      FunctionalUser,
      AdminUser,
      BlockAccess,
      O365Email,
      MFA_Mobile,
      ColourMode,
      HierarchyMaintenance,
    } = request.body;

    try {
      
      console.log(`Updating user ${DisplayName}`);
      await executeStoredProc('UpdateUser', [
        { name: 'UserID', type: sql.Int(), value: userID },
        { name: 'DisplayName', type: sql.NVarChar(100), value: DisplayName },
        { name: 'Email', type: sql.NVarChar(100), value: Email },
        { name: 'IsOSPAdmin', type: sql.Bit(), value: IsOSPAdmin },
        { name: 'Status', type: sql.NVarChar(20), value: Status },
        { name: 'FunctionalUser', type: sql.Int(), value: FunctionalUser },
        { name: 'AdminUser', type: sql.Int(), value: AdminUser },
        { name: 'BlockAccess', type: sql.Int(), value: BlockAccess },
        { name: 'O365Email', type: sql.NVarChar(100), value: O365Email },
        { name: 'MFA_Mobile', type: sql.NVarChar(50), value: MFA_Mobile },
        { name: 'ColourMode', type: sql.NVarChar(1), value: ColourMode },
        { name: 'HierarchyMaintenance', type: sql.Bit(), value: HierarchyMaintenance },
      ]);

      return response.status(200).json({ message: `User ${DisplayName} updated successfully`})
    } catch {
      response.status(500).json({ error: 'Method not allowed.' });
      
    }
  } 
}