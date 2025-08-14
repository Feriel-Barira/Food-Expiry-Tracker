import React from 'react';
import { useFoodContext } from '../context/FoodContext';

const FoodItem = ({ item }) => {
  const { deleteFoodItem } = useFoodContext();
  const expiryDate = new Date(item.expiryDate);
  const now = new Date();
  const daysUntilExpiry = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
  
  let statusClass, statusText;
  
  if (daysUntilExpiry <= 0) {
    statusClass = 'status-expired';
    statusText = 'Expired';
  } else if (daysUntilExpiry <= 3) {
    statusClass = 'status-warning';
    statusText = 'Expiring Soon';
  } else {
    statusClass = 'status-fresh';
    statusText = 'Fresh';
  }
  
  return (
    <div className={`${statusClass} p-4 rounded-md flex flex-col md:flex-row md:items-center justify-between gap-4`}>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="font-medium text-gray-800">{item.name}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${
            daysUntilExpiry <= 0 ? 'bg-red-100 text-red-800' : 
            daysUntilExpiry <= 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
          }`}>
            {statusText}
          </span>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {item.category}
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Expires: {expiryDate.toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {daysUntilExpiry <= 0 ? 'Expired' : `${daysUntilExpiry} day${daysUntilExpiry === 1 ? '' : 's'} left`}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <button 
          onClick={() => deleteFoodItem(item.id)}
          className="delete-btn px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default FoodItem;