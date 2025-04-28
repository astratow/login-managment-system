import React from 'react';
import { User } from '@/types';
import { prisma } from '../lib/prisma';


type ConfirmDeleteProps = {
    user: User | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirmDelete: () => Promise<void>;
    userName: string;
};

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({ isOpen, onClose, onConfirmDelete, user }) => {
    if (!isOpen || !user) return null;
    
    async function getUsers() {
      const users = await prisma.user.findMany();
      console.log(users);
    }
    
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete {user?.DisplayName || 'this user'}?</h3>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onConfirmDelete}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Delete
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDelete;