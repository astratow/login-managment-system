import type { NextApiRequest, NextApiResponse } from 'next';
import executeStoredProc from '@/lib/db';
import sql from 'mssql';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  const {
    UserID,
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

      const result = await executeStoredProc('AddUser', [
          { name: 'UserID', type: sql.Int(), value: UserID },
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
    console.log('DB response:', result);


    console.log('Database response:', result);
    response.status(201).json({ 
        message: 'User created successfully', 
        user: result.recordset 
    });
  } catch (error: any) {
    console.error('Error creating user:', error);
    response.status(500).json({ error: error.message || 'Failed to create user' });
  }
}