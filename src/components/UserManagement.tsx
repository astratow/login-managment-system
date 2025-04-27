'use client';

import { useEffect, useState } from 'react';
import UserTable from './UserTable';
import AddUser from './AddUser';
import ConfirmDelete from './ConfirmDelete';
import { User } from '@/types';

export default function UserManagement() {
    const [users, setUsers] = useState<User[]>([]);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [showAddEdit, setShowAddEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const loadUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/users');
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error('Failed to fetch users: ', err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
       loadUsers();
    }, []);

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setShowAddEdit(true);
        console.log('Edit user: ', user);
    };

    const handleAdd = () => {
        setSelectedUser(null);
        setShowAddEdit(true);
        console.log( 'Add user ');
    };

    const handleDelete = (user: User) => {   
        setSelectedUser(user);
        setShowDelete(true);
        console.log( 'Deleting user: ', user);   
    };

    const handleDeleteConfirm = async () => {
        if(!selectedUser) return;
        try {
            await fetch(`/api/users/${selectedUser.UserID}`, {
                method: 'DELETE',
            });
            setShowDelete(false);
            loadUsers();
        } catch (err) {
            console.error('Delete failed: ', err);
        }
    };


    return (
        <div className='space-y-4'>
            <div className="flex justify-between items-center mb-4">
                <input 
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                <button
                    onClick={handleAdd} 
                    className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
                    >
                    + Add User
                </button>
            </div>
            {loading ? (
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                    <UserTable 
                        users={users.filter(user => user.DisplayName.toLowerCase().includes(searchTerm.toLocaleLowerCase()))} 
                        onEdit={handleEdit} 
                        onDelete={handleDelete} 
                    />
                )
            }

            {showAddEdit && (
                <AddUser
                    isOpen={showAddEdit}
                    initialData={selectedUser ?? undefined}
                    onClose={() => setShowAddEdit(false)}
                    onSave={loadUsers}
                />
            )}

            {showDelete && (
                <ConfirmDelete
                    user={selectedUser}
                    isOpen={showDelete}
                    onClose={() => setShowDelete(false)}
                    onConfirmDelete={handleDeleteConfirm} 
                />
            )}
        </div>
    );
};