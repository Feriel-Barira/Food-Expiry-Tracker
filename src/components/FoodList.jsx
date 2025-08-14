import React, { useState } from 'react';
import FoodItem from './FoodItem';
import { useFoodContext } from '../context/FoodContext';

const FoodList = () => {
  const { foodItems, openModal } = useFoodContext();
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filterItems = () => {
    let filteredItems = foodItems;
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      filteredItems = filteredItems.filter(item => item.category === categoryFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      const now = new Date();
      
      filteredItems = filteredItems.filter(item => {
        const expiryDate = new Date(item.expiryDate);
        const daysUntilExpiry = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
        
        if (statusFilter === 'fresh') {
          return daysUntilExpiry > 3;
        } else if (statusFilter === 'warning') {
          return daysUntilExpiry <= 3 && daysUntilExpiry > 0;
        } else if (statusFilter === 'expired') {
          return daysUntilExpiry <= 0;
        }
        return true;
      });
    }
    
    // Sort by expiry date (soonest first)
    return filteredItems.sort((a, b) => 
      new Date(a.expiryDate) - new Date(b.expiryDate)
    );
  };

  const filteredItems = filterItems();

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">My Food Items</h2>
        <div className="flex gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Categories</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Dairy">Dairy</option>
            <option value="Meat">Meat</option>
            <option value="Bakery">Bakery</option>
            <option value="Pantry">Pantry</option>
            <option value="Frozen">Frozen</option>
            <option value="Other">Other</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Status</option>
            <option value="fresh">Fresh</option>
            <option value="warning">Expiring Soon</option>
            <option value="expired">Expired</option>
          </select>
          <button
            onClick={openModal}
            className="px-3 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition"
          >
            Clear All
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>No items found. Add some food items to get started!</p>
          </div>
        ) : (
          filteredItems.map(item => (
            <FoodItem key={item.id} item={item} />
          ))
        )}
      </div>
    </section>
  );
};

export default FoodList;