
import { NextApiRequest, NextApiResponse } from 'next';


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const userID = Number(req.query.id);


  if (req.method === 'DELETE') {
    try {
      
      console.log('deleting')
    } catch {
      res.status(500).json({ error: 'User not found or already deleted.' });
      
    }
  } else if (req.method === 'PUT') {
    const { name, email } = req.body;
    try { 
      console.log('adding user')
      res.status(200).json
    } catch {
      res.status(500).json({ error: 'Failed to update user.'})
    } 
  } else {
    res.setHeader('Allow', ['DELETE', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);

}
}