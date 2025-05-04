'use client';

import { useEffect, useState } from 'react';
import UserTable from './UserTable';
import AddUser from './AddUser';
import UserSearchInput from './UserSearchInput';
// import ConfirmDelete from './ConfirmDelete';
import { User } from '@/types';
import React from 'react';

export default function UserManagement() {
    const [users, setUsers] = useState<User[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
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

    const handleDelete = (user: User) => {   
        setSelectedUser(user);
        setShowDelete(true);
        if (selectedUser) {

            console.log( 'Deleting user: ', user);
        }
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
            <div className="flex justify-between">
            <UserSearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <button
                    onClick={handleAdd} 
                    className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
                    >
                    + Add User
                </button>
            </div>
            <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />

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
                    onClose={() => setShowDelete(false)}
                    onConfirm={handleDeleteConfirm} 
                />
            )}
        </div>
    );
};


