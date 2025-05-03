import React from 'react';

interface AddUserButtonProps {
  onAdd: () => void;
}

const AddUserButton: React.FC<AddUserButtonProps> = ({ onAdd }) => {
  return (
    <button
      onClick={onAdd}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      + Add User
    </button>
  );
};

export default AddUserButton;