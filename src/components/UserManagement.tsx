'use client';

import { useEffect, useState } from 'react';
import UserTable from './UserTable';
import AddUser from './AddUser';
import UserSearchInput from './UserSearchInput';
import DeleteUser from './DeleteUser';
import { User } from '@/types';
import React from 'react';

export default function UserManagement() {
    const [users, setUsers] = useState<User[]>([]);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [showAddEdit, setShowAddEdit] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const loadUsers = async () => {
        try {
            const res = await fetch('/api/users');
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error('Failed to fetch users: ', err);
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

    const handleDeleteUser = (user: User) => {   
        console.log('Preparing to delete user:', user);
        setSelectedUser(user);
        setShowDelete(true);
        if (selectedUser) {

            console.log( 'Deleting user: ', user);
        }
    };

    const handleUserSave = (user: User) => {
        console.log('Saved user: ', user);
        loadUsers();
    }
    const handleDeleteConfirm = async () => {
        if(!selectedUser) return;
        try {
            await fetch(`/api/users`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ UserID: selectedUser.UserID }),
            });
            setShowDelete(false);
        } catch (error) {
            console.error('Delete failed: ', error);
        }
    };


    return (
        <div className='space-y-4'>
            <div className="flex justify-between">
            <UserSearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <button
                    onClick={handleAdd} 
                    className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
                    >
                    + Add User
                </button>
            </div>
            <UserTable
                users={users.filter((user) =>
                    user.DisplayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.Email?.toLowerCase().includes(searchTerm.toLowerCase())
                )}
                onEdit={handleEdit}
                onDelete={handleDeleteUser}
            />
            {showAddEdit && (
                <AddUser
                    isOpen={showAddEdit}
                    initialData={selectedUser ?? undefined}
                    onClose={() => setShowAddEdit(false)}
                    onSave={handleUserSave}
                />
            )}

            {showDelete && (
                <DeleteUser
                    isOpen={showDelete}
                    user={selectedUser}
                    onClose={() => setShowDelete(false)}
                    onDelete={handleDeleteConfirm}
                />
            )}
        </div>
    );
};


