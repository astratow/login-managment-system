import React, { useState, useEffect } from "react";
import { User } from '@/types';

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

    const handleSubmit = async () => {
        const method = initialData ? 'PUT' : 'POST';
        const url = initialData ? `/api/users/${initialData.UserID}` : '/api/users/create';
    
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formState),
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Save failed: ${errorText}`);
            }
    
            const savedUser = await response.json();
            onSave(savedUser);
            onClose();
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">{initialData ? 'Edit User' : 'Add User'}</h2>
                <input
                    type="text"
                    name="DisplayName"
                    placeholder="Name"
                    value={formState.DisplayName}
                    onChange={handleChange}
                    className="border p-2 w-full mb-2"
                />
                <input
                    type="email"
                    name="Email"
                    placeholder="Email"
                    value={formState.Email}
                    onChange={handleChange}
                    className="border p-2 w-full mb-2"
                />
                <input
                    type="text"
                    name="MFA_Mobile"
                    placeholder="MFA Mobile"
                    value={formState.MFA_Mobile}
                    onChange={handleChange}
                    className="border p-2 w-full mb-2"
                />
                <select
                    name="Status"
                    value={formState.Status}
                    onChange={handleChange}
                    className="border p-2 w-full mb-2"
                >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Testing">Testing</option>
                </select>
                <div className="grid justify-between items-center mb-2">
                    <div className="grid">
                        <div>
                            
                        <input
                            type="checkbox"
                            name="BlockAccess"
                            checked={!!formState.BlockAccess}
                            onChange={(e) =>
                                setFormState((prev) => ({
                                    ...prev,
                                    BlockAccess: e.target.checked ? 1 : 0,
                                }))
                            }
                            className="mr-2"
                            />
                        <label>Block Access</label>
                            </div>
                            <div>

                        <input
                            type="checkbox"
                            name="FunctionalUser"
                            checked={!!formState.FunctionalUser}
                            onChange={(e) =>
                                setFormState((prev) => ({
                                    ...prev,
                                    FunctionalUser: e.target.checked ? 1 : 0,
                                }))
                            }
                            className="mr-2"
                            />
                        <label>Functional User</label>
                            </div>
                            <div>

                        <input
                            type="checkbox"
                            name="HierarchyMaintenance"
                            checked={formState.HierarchyMaintenance}
                            onChange={handleChange}
                            className="mr-2"
                            />
                        <label>Hierarchy Maintenance</label>
                            </div>
                            <div>

                        <input
                            type="checkbox"
                            name="IsOSPAdmin"
                            checked={formState.IsOSPAdmin}
                            onChange={handleChange}
                            className="mr-2"
                            />
                        <label>OSP Admin</label>
                            </div>
                    </div>
                    <div className="flex justify-between">
                        <button onClick={handleSubmit} className="bg-blue-600 min-w-20 text-white p-2 rounded mr-2">Save</button>
                        <button onClick={onClose} className="bg-gray-400 min-w-20 text-white p-2 rounded">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}