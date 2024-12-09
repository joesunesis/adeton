import React, { useState } from 'react'
import { User } from '../types/user';

interface UserDetailsProps {
  user: User | null;
  updateUserDetails: (userDetails: Partial<User>) => Promise<void>;
}

const UserDetails = ({ user, updateUserDetails }: UserDetailsProps) => {
  const [updatedUser, setUpdatedUser] = useState<User | null>(null);
  const [isEditingDetails, setEditingDetails] = useState(false);

  const handleUserDetails = () => {
    setEditingDetails(!isEditingDetails);
    if (!updatedUser) return;
    updateUserDetails(updatedUser);
    setUpdatedUser(null);
  }

  return (
    <div className="bg-[#282450] p-4 shadow rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-4">Personal Details</h3>

      {isEditingDetails ? (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1">Username:</label>
            <input
              type="text"
              value={updatedUser?.name || ''}
              onChange={(e) =>
                setUpdatedUser((prev) => ({ ...prev, name: e.target.value } as User))
              }
              className="w-full p-2 rounded bg-[#1A173B] border border-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Phone:</label>
            <input
              type="text"
              value={updatedUser?.phone || ''}
              onChange={(e) =>
                setUpdatedUser((prev) => ({ ...prev, phone: e.target.value } as User))
              }
              className="w-full p-2 rounded bg-[#1A173B] border border-gray-500"
            />
          </div>
        </div>
      ) :
        <div>
          <p className="mb-2">Username: {user?.name || 'N/A'}</p>
          <p className="mb-2">Phone: {user?.phone || 'N/A'}</p>
        </div>
      }
      <div>
        <button
          onClick={() => handleUserDetails()}
          className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold transition duration-200"
        >
          {isEditingDetails ? 'Save' : 'Edit'} Details
        </button>
      </div>
    </div>
  )
}

export default UserDetails
