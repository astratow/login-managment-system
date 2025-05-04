import UserManagement from '../components/UserManagement';

export default function HomePage() {
  return (
   <main className="p-4 max-w-7xl mx-auto">
    <h1 className="text-2xl font-bold mb-4">User Management</h1>
    <UserManagement />
   </main>
  );
}
