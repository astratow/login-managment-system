import type { NextApiRequest, NextApiResponse } from 'next';
import { executeStoredProc } from '@/lib/db';
import * as sql from 'mssql';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const {
      displayName,
      email,
      isOSPAdmin,
      status,
      functionalUser,
      adminUser,
      blockAccess,
      o365Email,
      mfaMobile,
      colourMode,
      hierarchyMaintenance,
    } = request.body;
    console.log('Incoming request body:', request.body);
    const colourModeValue = colourMode || 'D';

    const result = await executeStoredProc('AddUser', [
        { name: 'UserID', type: sql.Int(), value: 0 },
        { name: 'DisplayName', type: sql.NVarChar(100), value: displayName },
        { name: 'Email', type: sql.NVarChar(100), value: email },
        { name: 'IsOSPAdmin', type: sql.Bit(), value: isOSPAdmin },
        { name: 'Status', type: sql.NVarChar(20), value: status },
        { name: 'FunctionalUser', type: sql.Int(), value: functionalUser },
        { name: 'AdminUser', type: sql.Int(), value: adminUser },
        { name: 'BlockAccess', type: sql.Int(), value: blockAccess },
        { name: 'O365Email', type: sql.NVarChar(100), value: o365Email },
        { name: 'MFA_Mobile', type: sql.NVarChar(50), value: mfaMobile },
        { name: 'ColourMode', type: sql.NVarChar(1), value: colourModeValue },
        { name: 'HierarchyMaintenance', type: sql.Bit(), value: hierarchyMaintenance },
    ]);

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