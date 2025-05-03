import React from 'react';

interface UserSearchInputProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const UserSearchInput: React.FC<UserSearchInputProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <input 
      type="text"
      placeholder="Search users..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="border px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
};

export default UserSearchInput;