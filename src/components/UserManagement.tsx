'use client';

import { useEffect, useState } from 'react';
import UserTable from './UserTable';
import AddUser from './AddUser';
import ConfirmDelete from './ConfirmModal';
import { User } from '@/types/User';

export default function UserManagement() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetch('/api/users')
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(err => console.error('Failed  to load users: ', err));
    }, []);

    const handleEdit = (user: User) => {
        console.log('Edit user: ', user);
        //TODO: open modal and handle editing
    };

    const handleDelete = (user: User) => {
        console.log( 'Delete user: ', user);
        //TODO: confirm and call API
    };

    return (
        <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
    );
};