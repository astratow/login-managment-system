'use client';

import { useEffect, useMemo, useState } from 'react';
import UserSearchInput from './UserSearchInput';
import AddUserButton from './AddUserButton';
import LoadingSpinner from './LoadingSpinner';
import UserTable from './UserTable';
import AddUser from './AddUser';
import ConfirmDelete from './ConfirmDelete';
import { User } from '@/types';


export default function UserManagement() {
    const [users, setUsers] = useState<User[]>([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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
        setIsAddModalOpen(true);
        console.log('Edit user: ', user);
    };

    const handleAdd = () => {
        setSelectedUser(null);
        setIsAddModalOpen(true);
        console.log('Add user');
    };

    const handleDelete = (user: User) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
        console.log('Deleting user: ', user);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedUser) return;
        try {
            await fetch(`/api/users/${selectedUser.UserID}`, {
                method: 'DELETE',
            });
            setIsDeleteModalOpen(false);
            loadUsers();
        } catch (err) {
            console.error('Delete failed: ', err);
        }
    };

    const filteredUsers = useMemo(
        () => users.filter(user =>
            user.DisplayName.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        [users, searchTerm]
    );

    return (
        <div className='space-y-4'>
            <div className="flex justify-between items-center">
                <UserSearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <AddUserButton onAdd={handleAdd} />
            </div>

            {loading ? (
                <LoadingSpinner />
            ) : (
                <UserTable 
                    users={filteredUsers}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            {isAddModalOpen && (
                <AddUser
                    isOpen={isAddModalOpen}
                    initialData={selectedUser ?? undefined}
                    onClose={() => setIsAddModalOpen(false)}
                    onSave={loadUsers}
                />
            )}

            {isDeleteModalOpen && (
                <ConfirmDelete
                    user={selectedUser}
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirmDelete={handleDeleteConfirm}
                    userName={selectedUser?.DisplayName || ''}
                />
            )}
        </div>
    );
};