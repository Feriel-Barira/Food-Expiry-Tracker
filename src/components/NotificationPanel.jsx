import React from 'react';
import { useFoodContext } from '../context/FoodContext';

const NotificationPanel = ({ isOpen }) => {
  const { notifications } = useFoodContext();

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10 py-1">
      <div className="px-4 py-3 border-b">
        <p className="text-sm font-medium text-gray-700">Notifications</p>
      </div>
      <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="px-4 py-3 text-center text-gray-500">
            No notifications
          </div>
        ) : (
          notifications.map((notification, index) => (
            <div key={index} className="px-4 py-3 flex items-start">
              <div className={`flex-shrink-0 rounded-full p-1 mr-3 ${
                notification.type === 'expired' ? 'bg-red-100 text-red-600' : 
                notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">Just now</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;