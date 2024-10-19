import React, { useState } from 'react';

const YourProfile = ({ userData }) => {
  // Initialize state for profile data
  const [profile, setProfile] = useState({
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    DOB: userData?.DOB || '',
    superannuationBalance: userData?.superannuationBalance || '',
    retirementGoal: userData?.retirementGoal || '',
    email: userData?.email || '',
    password: '',
    profileImage: userData?.profileImage || '',
  });

  const [error, setError] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProfile((prevProfile) => ({
      ...prevProfile,
      profileImage: URL.createObjectURL(file), // Preview the image
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: profile.firstName,
          lastName: profile.lastName,
          DOB: profile.DOB,
          superannuationBalance: profile.superannuationBalance,
          retirementGoal: profile.retirementGoal,
          email: profile.email,         // Assuming email is required for identifying the user
          password: profile.password,    // Assuming password is used for verification
          profileImg: profile.profileImage, // Ensure this matches your backend requirement
        }),
      });

      const data = await response.json();

      if (response.ok) { // Check if the response status is in the 200 range
        console.log('Profile updated successfully:', data.message);
        // Redirect or show success message
        // You can use navigate if you're using react-router-dom
        // navigate('/profile'); // Redirect to the profile page
      } else {
        setError(data.message || 'Profile update failed.'); // Show the error message
        console.log('Profile update failed:', data.message);
      }
    } catch (error) {
      setError('An error occurred while updating the profile.');
      console.error('Error:', error);
    }
  };


  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-semibold mb-6">Your Profile</h1>

      <form onSubmit={handleSubmit}>
        {/* Profile Image */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {profile.profileImage && (
            <img
              src={profile.profileImage}
              alt="Profile Preview"
              className="mt-4 w-32 h-32 rounded-full object-cover"
            />
          )}
        </div>

        {/* First Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-800 rounded-md shadow-sm"
          />
        </div>

        {/* Last Name */}
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

        {/* Superannuation Balance */}
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

        {/* Retirement Goal */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Retirement Goal ($)</label>
          <input
            type="number"
            name="retirementGoal"
            value={profile.retirementGoal}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Save Changes Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default YourProfile;
