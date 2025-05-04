'use client'

import React from 'react';
import { User } from '@/types';
import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid';



interface UserTableProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
}

export default function UserTable({ users, onEdit, onDelete} : UserTableProps) {
    const getRowBgColor = (status: string | null | undefined) => {
        if (!status) return '';
        switch (status.toLowerCase()) {
          case 'inactive':
            return 'bg-gray-200 text-gray-700';
          case 'testing':
          case 'test':
            return 'bg-yellow-100 text-yellow-800';
          case 'active':
            return 'bg-green-100 text-green-800';
          default:
            return 'bg-white text-gray-800';
        }
      };
    if (users.length === 0) {
        return <div>No users found.</div>
    }
    
    return (
        <div className="overflow-x-auto">

            <table className="min-w-full bg-white rounded-lg shadow-sm overflow-hidden">
                <thead>
                    <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
                        <th className="text-left p-2 sm:px-6 sm:py-3">Name</th>
                        <th className="text-left p-2 sm:px-6 sm:py-3 hidden md:table-cell">Email</th>
                        <th className="text-left p-2 sm:px-6 sm:py-3 hidden md:table-cell">Status</th>
                        <th className="text-left p-2 sm:px-6 sm:py-3">Action</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {users.map((user) => (
                        <tr
                        key={user.UserID}
                        className={`border-b border-gray-200 ${getRowBgColor(user.Status)}`}
                        >

                        <td className="p-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm sm:text-base">
                            <div className="font-medium ">{user.DisplayName}</div>
                            <div className="text-gray-500 text-sm md:hidden">{user.Email}</div>
                        </td>

                        <td className="sm:px-6 sm:py-4 whitespace-nowrap hidden md:table-cell">
                            {user.Email}
                        </td>

                        <td className="p-2 sm:px-6 sm:py-4 whitespace-nowrap hidden md:table-cell">
                            {user.Status}
                        </td>

                        <td className="flex items-end p-2 sm:px-6 sm:py-4 whitespace-nowrap text-center space-x-2">
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