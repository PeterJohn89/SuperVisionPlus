import React, { useState } from 'react';

const YourProfile = ({ userData }) => {
  // Set state with user data
  const [profile, setProfile] = useState({
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    DOB: userData?.DOB || '',
    superAmount: userData?.superAmount || '',
    email: userData?.email || '',
    currentPassword: '',
    newPassword: '',
    profileImage: userData?.profileImage || '',
    newProfileImage: null,
  });

  const [notification, setMessage] = useState({ message: '', type: '' });

  // Show message
  const showMessage = (message, type) => {
    setMessage({ message, type });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Attach image function
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProfile((prevProfile) => ({
      ...prevProfile,
      newProfileImage: file,
      profileImage: URL.createObjectURL(file),
    }));
  };

  // Convert image to Base64
  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(',')[1]; // Get the Base64 string part
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle User details
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the payload for the Lambda function
    const updateUser = {
      email: profile.email,
      firstName: profile.firstName,
      lastName: profile.lastName,
      dob: profile.DOB,
      superAmount: profile.superAmount,
    };

    // Handle profile image upload
    if (profile.newProfileImage) {
      const newProfileImageBase64 = await toBase64(profile.newProfileImage);
      updateUser.newProfileImage = newProfileImageBase64;
    }

    // Check if password update is needed
    if (profile.currentPassword && profile.newPassword) {
      updateUser.currentPassword = profile.currentPassword;
      updateUser.newPassword = profile.newPassword;
    }

    try {
      const response = await fetch('https://2nnknbwwe2.execute-api.ap-southeast-2.amazonaws.com/updateUser', {
        method: 'POST',
        body: JSON.stringify(updateUser),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      console.log(data);

      if (data.success) {
        showMessage('Profile updated successfully!', 'success');
      } else {
        showMessage(data.message || 'Profile update failed.', 'error');
      }
    } catch (error) {
      showMessage('An error occurred while updating the profile.', 'error');
      console.error('Error:', error);
    }
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
      {notification.message && (
        <div
          className={`mb-4 p-4 text-white font-semibold rounded ${
            notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
          }`}
        >
          {notification.message}
        </div>
      )}

      <h1 className="text-xl font-semibold mb-6">Your Profile</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {profile.profileImage && (
            <img src={profile.profileImage} alt="Profile Preview" className="mt-4 w-32 h-32 rounded-full object-cover" />
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Superannuation Balance ($)</label>
          <input
            type="number"
            name="superAmount"
            value={profile.superAmount}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={profile.currentPassword}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={profile.newPassword}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 transition">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default YourProfile;
