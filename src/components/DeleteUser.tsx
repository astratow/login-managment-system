import React from "react";
import { User } from "@/types";

type DeleteUserProps = {
    isOpen: boolean;
    user: User | null;
    onClose: () => void;
    onDelete: (user: User) => void;
  };

export default function DeleteUser ({ isOpen, user, onClose, onDelete}: DeleteUserProps) {
    if (!isOpen || !user) return null;

    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-96">
          <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
          <p className="mb-4">Are you sure you want to delete user <strong>{user.DisplayName}</strong>?</p>
          <div className="flex justify-end space-x-2">
            <button
                onClick={() => onDelete(user)}
                className="bg-red-600 text-white px-4 py-2 rounded"
                >
                Delete
            </button>
            <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
}