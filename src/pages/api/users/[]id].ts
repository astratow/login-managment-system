import { NextResponse } from 'next/server';
import users from '.';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = PrismaClient;

// export async function DELETE(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = params;
//   console.log(`Deleting user with ID: ${id}`);

//   const index = users.findIndex(u => u.UserID === Number(id));
//   if (index === -1) {
//     return NextResponse.json({ message: 'User not found' }, { status: 404 });
//   }

//   users.splice(index, 1);
//   return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
// }

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const userID = Number(req.query.id);


  if (req.method === 'DELETE') {
    try {
      const deletedUser = await prisma.user.delete({
        where: { id: userID },
      });
      res.status(200).json(deletedUser);
    } catch {
      res.status(500).json({ error: 'User not found or already deleted.' });
      
    }
  } else if (req.method === 'PUT') {
    const { name, email } = req.body;
    try { 
      const updateUser = await prisma.user.update({
        where: { id: userID },
        data: { name, email },
      });
      res.status(200).json
    } catch {
      res.status(500).json({ error: 'Failed to update user.'})
    } 
  } else {
    res.setHeader('Allow', ['DELETE', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);

}
}