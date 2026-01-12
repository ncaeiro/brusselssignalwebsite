
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../src/FavoritesContext.tsx';

const UserProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { favorites } = useFavorites();

  // Mock user data - in a real app, this would come from authentication context
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    memberSince: 'January 2024',
    subscription: 'Premium Member',
    newsletter: true,
    emailNotifications: true,
    weeklyDigest: false
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(userData);

  const handleSave = () => {
    setUserData(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(userData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <main className="bg-gray-50 flex-grow">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#1a2a44] mb-2">
              My Profile
            </h1>
            <p className="text-gray-600">Manage your account settings and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-24">
                {/* Profile Picture */}
                <div className="text-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#EE6260] to-[#d44947] text-white flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                    {userData.name.charAt(0)}
                  </div>
                  <h2 className="font-bold text-lg text-[#1a2a44]">{userData.name}</h2>
                  <p className="text-sm text-gray-500">{userData.subscription}</p>
                </div>

                <div className="border-t border-gray-100 pt-6 space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    <span className="text-gray-600">{userData.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <span className="text-gray-600">Member since {userData.memberSince}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                    <span className="text-gray-600">{favorites.length} saved articles</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/favorites')}
                  className="w-full mt-6 px-4 py-3 bg-[#EE6260] text-white text-xs font-black uppercase tracking-wider rounded-sm hover:bg-[#d44947] transition"
                >
                  View Favorites
                </button>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Account Information */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#1a2a44]">Account Information</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 text-[#EE6260] border border-[#EE6260] text-xs font-black uppercase rounded-sm hover:bg-[#EE6260] hover:text-white transition"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 text-gray-600 border border-gray-300 text-xs font-black uppercase rounded-sm hover:bg-gray-50 transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-[#EE6260] text-white text-xs font-black uppercase rounded-sm hover:bg-[#d44947] transition"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-[#EE6260]"
                      />
                    ) : (
                      <p className="text-gray-900">{userData.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-[#EE6260]"
                      />
                    ) : (
                      <p className="text-gray-900">{userData.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Subscription Plan</label>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-900">{userData.subscription}</p>
                      <button className="text-xs text-[#EE6260] font-bold uppercase hover:underline">
                        Manage Subscription
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-[#1a2a44] mb-6">Notification Preferences</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <h3 className="font-bold text-gray-900">Newsletter Subscription</h3>
                      <p className="text-sm text-gray-500">Receive our daily Brussels Calling newsletter</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isEditing ? editedData.newsletter : userData.newsletter}
                        onChange={(e) => isEditing && handleInputChange('newsletter', e.target.checked)}
                        disabled={!isEditing}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EE6260]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <h3 className="font-bold text-gray-900">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Get notified about breaking news and updates</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isEditing ? editedData.emailNotifications : userData.emailNotifications}
                        onChange={(e) => isEditing && handleInputChange('emailNotifications', e.target.checked)}
                        disabled={!isEditing}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EE6260]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <h3 className="font-bold text-gray-900">Weekly Digest</h3>
                      <p className="text-sm text-gray-500">Receive a weekly summary of top stories</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isEditing ? editedData.weeklyDigest : userData.weeklyDigest}
                        onChange={(e) => isEditing && handleInputChange('weeklyDigest', e.target.checked)}
                        disabled={!isEditing}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EE6260]"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Account Actions */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-[#1a2a44] mb-6">Account Actions</h2>

                <div className="space-y-4">
                  <button className="w-full px-4 py-3 text-left border border-gray-300 rounded-sm hover:bg-gray-50 transition flex items-center justify-between group">
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-[#EE6260] transition">Change Password</h3>
                      <p className="text-sm text-gray-500">Update your password to keep your account secure</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-[#EE6260] transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>

                  <button className="w-full px-4 py-3 text-left border border-gray-300 rounded-sm hover:bg-gray-50 transition flex items-center justify-between group">
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-[#EE6260] transition">Download Your Data</h3>
                      <p className="text-sm text-gray-500">Request a copy of your account data</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-[#EE6260] transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>

                  <button className="w-full px-4 py-3 text-left border border-red-300 rounded-sm hover:bg-red-50 transition flex items-center justify-between group">
                    <div>
                      <h3 className="font-bold text-red-600 group-hover:text-red-700 transition">Delete Account</h3>
                      <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                    </div>
                    <svg className="w-5 h-5 text-red-400 group-hover:text-red-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserProfilePage;
