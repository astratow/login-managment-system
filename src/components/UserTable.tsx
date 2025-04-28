'use client'

import React from 'react';
import { User } from '@/types';
import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid';
import { prisma } from '../lib/prisma';


interface UserTableProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
}

export default function UserTable({ users, onEdit, onDelete} : UserTableProps) {
    
    async function getUsers() {
        const users = await prisma.user.findMany();
        console.log(users);
    }
    
    if (users.length === 0) {
        return <div>No users found.</div>
    }
    
    return (
        <div className="overflow-x-auto">

            <table className="min-w-full bg-white rounded-lg shadow-sm overflow-hidden">
                <thead>
                    <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
                        <th className="text-left px-6 py-3">Name</th>
                        <th className="text-left px-6 py-3">Email</th>
                        <th className="text-left px-6 py-3">Status</th>
                        <th className="text-left px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {users.map((user, idx) => (
                        <tr key={user.UserID} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="px-6 py-4 whitespace-nowrap">{user.DisplayName}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.Email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.Status}</td>
                            <td className="flex items-end px-6 py-4 whitespace-nowrap text-center space-x-2">
                                <button 
                                    className="text-indigo-600 hover:text-indigo-800"
                                    onClick={() => onEdit(user)}
                                    title="Edit User"
                                    >
                                        <PencilIcon className="h-5 w-5 contain-inline" />
                                </button>
                                <button
                                    className="text-red-600 hover:text-red-800"
                                    onClick={() => onDelete(user)}
                                    title="Delete User"
                                >
                                    <TrashIcon className="h-5 w-5 inline" />
                                </button>
                            </td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};