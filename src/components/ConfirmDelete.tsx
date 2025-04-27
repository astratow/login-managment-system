import React from 'react';
import { User } from '@/types';

type ConfirmDeleteProps = {
    user: User | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirmDelete: () => Promise<void>;
};

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({ isOpen, onClose, onConfirmDelete, user }) => {
    if (!isOpen || !user) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Are you sure you want to delete {user.DisplayName}?</h3>
                <button type="button" onClick={onConfirmDelete}>Delete</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default ConfirmDelete;