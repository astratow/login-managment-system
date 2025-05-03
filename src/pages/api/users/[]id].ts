import users from '.';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userID = Number(req.query.id);

  switch (req.method) {
    case 'DELETE':
      try {
        const deletedUser = await prisma.user.delete({
          where: { id: userID },
        });
        res.status(200).json(deletedUser);
      } catch {
        res.status(500).json({ error: 'User not found or already deleted.' });
      }
      break;

    case 'PUT':
      const { displayName, email } = req.body;
      try {
        const updatedUser = await prisma.user.update({
          where: { id: userID },
          data: { displayName, email },
        });
        res.status(200).json(updatedUser);  
      } catch {
        res.status(500).json({ error: 'Failed to update user.' });
      }
      break;

    default:
      res.setHeader('Allow', ['DELETE', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}