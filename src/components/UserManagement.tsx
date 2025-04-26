'use client';

import { useEffect, useState } from 'react';
import UserTable from './UserTable';
import AddUser from './AddUser';
import ConfirmDelete from './ConfirmModal';
import { User } from '@/types/User';

export default function UserManagement() {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

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
        setShowAddEditModal(true);
        console.log('Edit user: ', user);
    };

    const handleAdd = () => {
        setSelectedUser(null);
        setShowAddEditModal(true);
        console.log( 'Add user ');
    };

    const handleDelete = (user: User) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
        console.log( 'Delete user: ', user);
    };

    return (
        <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
    );
};