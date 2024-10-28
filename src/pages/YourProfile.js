import React, { useState } from 'react';

const YourProfile = ({ userData }) => {
  const [profile, setProfile] = useState({
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    DOB: userData?.DOB || '',
    superannuationBalance: userData?.superannuationBalance || '',
    email: userData?.email || '',
    password: '',
    currentPassword: '',
    newPassword: '',
    profileImage: userData?.profileImage || '',
    newProfileImage: null,
  });

  const [notification, setNotification] = useState({ message: '', type: '' });

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000); // Hide notification after 3 seconds
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProfile((prevProfile) => ({
      ...prevProfile,
      newProfileImage: file,
      profileImage: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let profileImageUrl = profile.profileImage;

if (profile.newProfileImage) {
  // Convert the new profile image to a Base64 encoded string
  const newProfileImageBase64 = await toBase64(profile.newProfileImage);

  // Create the request payload
  const payload = JSON.stringify({
    email: profile.email,
    file: newProfileImageBase64,
    fileType: profile.newProfileImage.type // Assuming profile.newProfileImage has a `type` property
  });

  console.log(payload);

  try {
    const imageResponse = await fetch('https://n4tfhydigh.execute-api.us-east-1.amazonaws.com/SuperImageUpdate', {
      method: 'POST',
      body: payload,
      headers: {
        'Content-type' : 'application/json'
      }
    });

    const imageData = await imageResponse.json();

    if (imageResponse.ok) {
      profileImageUrl = imageData.imageUrl;
    } else {
      showNotification(imageData.message || 'Failed to upload profile image.', 'error');
      return;
    }
  } catch (error) {
    showNotification('An error occurred while uploading the profile image.', 'error');
    console.error('Error:', error);
    return;
  }
}

// Helper function to convert image to Base64
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result.split(',')[1]; // Get the Base64 string part
      resolve(base64String);
    };
    reader.onerror = error => reject(error);
  });
}


    const updateUserPayload = {
      email: profile.email,
      firstName: profile.firstName,
      lastName: profile.lastName,
      dob: profile.DOB,
      superAmount: profile.superannuationBalance,
      profileImage: profileImageUrl,
    };

    if (profile.currentPassword && profile.newPassword) {
      updateUserPayload.password = profile.newPassword;
      updateUserPayload.currentPassword = profile.currentPassword;
    }

    try {
      const response = await fetch('https://7k3o61h321.execute-api.us-east-1.amazonaws.com/UpdateUser', {
        method: 'POST',
        body: JSON.stringify(updateUserPayload),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (response.ok) {
        showNotification('Profile updated successfully!', 'success');
      } else {
        showNotification(data.message || 'Profile update failed.', 'error');
      }
    } catch (error) {
      showNotification('An error occurred while updating the profile.', 'error');
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
            name="superannuationBalance"
            value={profile.superannuationBalance}
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
