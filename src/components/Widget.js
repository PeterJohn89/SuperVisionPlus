import React from 'react';

const Widget = ({ title, description, content, isActive }) => {
  return (
    <div className={`bg-white p-4 rounded shadow ${isActive ? 'border-2 border-blue-500' : ''}`}>
      <h3 className="text-xl font-semibold mb-2 text-black">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="text-black">{content}</div>
    </div>
  );
};

export default Widget;
