import { NextResponse } from 'next/server';
import users from '.';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log(`Deleting user with ID: ${id}`);

  const index = users.findIndex(u => u.UserID === Number(id));
  if (index === -1) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  users.splice(index, 1);
  return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
}