import React, { useState } from 'react'
import { User } from '../types/user';
import Image from 'next/image';

interface UserProfileProps {
  user: User | null;
  updateUserProfile: (userProfile: Partial<User>) => Promise<void>;
}

const UserProfile = ({ user, updateUserProfile }: UserProfileProps) => {
  const [updatedUser, setUpdatedUser] = useState<User | null>(user);
  const [isEditingProfile, setEditingProfile] = useState(false);

  const handleUserProfile = () => {
    setEditingProfile(!isEditingProfile);
    if (updatedUser) {
      console.log(updatedUser, isEditingProfile);
    updateUserProfile(updatedUser);
    setUpdatedUser(null);
    }
  }
  
  return (
    <div className="p-4 shadow rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-4">Personal Profile</h3>

      {isEditingProfile ? (
        <div className="p-6 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <Image src="/images/profile-picture.jpg" alt="Profile" className="w-24 h-24 rounded-full border-4 border-blue-500" />
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={updatedUser?.name || user?.name}
                onChange={(e) =>
                  setUpdatedUser((prev) => ({ ...prev, name: e.target.value } as User))
                }
                className="w-full p-3 rounded-md outline-none text-black"
              />
              <input
                type="text"
                placeholder="Phone"
                value={user?.phone || user?.phone}
                onChange={(e) =>
                  setUpdatedUser((prev) => ({ ...prev, phone: e.target.value } as User))
                }
                className="w-full p-3 rounded-md outline-none text-black"
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
          onClick={() => handleUserProfile()}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold mt-6"
        >
          {isEditingProfile ? 'Save Changes' : 'Edit Profile'} 
        </button>
      </div>
    </div>
  )
}

export default UserProfile
