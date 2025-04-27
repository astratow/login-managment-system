import React, { useState, useEffect } from "react";
import { User } from '@/types';

// type User = {
//     UserId?: number;
//     DisplayName: string;
//     Email: string;
//     IsOSPAdmin: boolean;
//     Status: string;
//     FunctionalUser: number;
//     AdminUser: number;
//     BlockAccess: number;
//     O365Email: string;
//     MFA_Mobile: string;
//     ColourMode: string;
//     HierarchyMaintenance: boolean;
// };

type AddUserProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (user: User) => void;
    initialData?: User;
};

export default function AddUser({ isOpen, onClose, onSave, initialData } :AddUserProps) {
    const [formState, setFormState] = useState<User>({
        UserID: 0,
        DisplayName: '',
        Email: '',
        IsOSPAdmin: false,
        Status: 'Active',
        FunctionalUser: 0,
        AdminUser: 0,
        BlockAccess: 0,
        O365Email: '',
        MFA_Mobile: '',
        ColourMode: 'D',
        HierarchyMaintenance: false,
    });

    useEffect(() => {
        if (initialData) {
            setFormState(initialData);
        }
    }, [ initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setFormState((prev) => ({
            ...prev,
            [name]: fieldValue,
        }));
    };

    const handleSubmit = () => {
        onSave(formState);
        onClose();
    };

    if (isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">{initialData ? 'Edit User' : 'Add User'}</h2>
                <input
                    type="text"
                    name="DisplayName"
                    placeholder="Display Name"
                    value={formState.DisplayName}
                    onChange={handleChange}
                    className="border p-2 w-full mb-2"
                />
                <input
                    type="email"
                    name="Email"
                    placeholder="Email"
                    value={formState.O365Email}
                    onChange={handleChange}
                    className="border p-2 w-full mb-2"
                />
                <select
                    name="Statys"
                    value={formState.Status}
                    onChange={handleChange}
                    className="border p-2 w-full mb-2"
                >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Testing">Testing</option>
                </select>
            </div>
            <div className="flex items-center mb-2">
                <input
                    type="checkbox"
                    name="IsOSPAdmin"
                    checked={formState.IsOSPAdmin}
                    onChange={handleChange}
                    className="mr-2"
                />
                <label>OSP Admin</label>
            </div>
            <button onClick={handleSubmit} className="bg-blue-600 text-white p-2 rounded mr-2">Save</button>
            <button onClick={onClose} className="bg-gray-400 text-white p-2 rounded">Cancel</button>
        </div>
    )
}