import React, { useState, useEffect } from "react";

type User = {
    UserId?: number;
    DisplayName: string;
    Email: string;
    IsOSPAdmin: boolean;
    Status: string;
    FunctionalUser: number;
    AdminUser: number;
    BlockAccess: number;
    O365Email: string;
    MFA_Mobile: string;
    ColouMode: string;
    HierarchyMaintenance: boolean;
};

type AddUserProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (user: User) => void;
    initialData?: User;
};

export default function AddUser({ isOpen, onClose, onSave, initialData } :AddUserProps) {
    const [formState, setFormState] = useStateUser>({
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

    const handleChange = (e: React.ChangeEvent<HTTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type checked } = e.target;
        setFormState((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };
}