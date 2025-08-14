import React from 'react';
import { useFoodContext } from '../context/FoodContext';

const Statistics = () => {
  const { getStatistics } = useFoodContext();
  const stats = getStatistics();

  return (
    <section className="p-6 bg-white rounded-xl shadow-md mb-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Food Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium text-gray-800">Total Items</h3>
            <span className="text-2xl font-bold text-gray-800">{stats.total}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div className="h-2 rounded-full bg-blue-500" style={{ width: stats.progressAll }}></div>
          </div>
        </div>
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium text-gray-800">Expiring Soon</h3>
            <span className="text-2xl font-bold text-yellow-500">{stats.warning}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div className="h-2 rounded-full bg-yellow-500" style={{ width: stats.progressWarning }}></div>
          </div>
        </div>
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium text-gray-800">Expired</h3>
            <span className="text-2xl font-bold text-red-500">{stats.expired}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div className="h-2 rounded-full bg-red-500" style={{ width: stats.progressExpired }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;