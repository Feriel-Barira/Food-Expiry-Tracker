import React, { useState } from 'react';
import { useFoodContext } from '../context/FoodContext';

const AddItemForm = () => {
  const { addFoodItem } = useFoodContext();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Fruits');
  const [expiryDate, setExpiryDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !expiryDate) return;
    
    addFoodItem(name, category, expiryDate);
    setName('');
    setExpiryDate('');
  };

  return (
    <section className="mb-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Food Item</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="foodName" className="block text-sm font-medium text-gray-700 mb-1">Food Name</label>
          <input
            type="text"
            id="foodName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Dairy">Dairy</option>
            <option value="Meat">Meat</option>
            <option value="Bakery">Bakery</option>
            <option value="Pantry">Pantry</option>
            <option value="Frozen">Frozen</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
          <input
            type="date"
            id="expiryDate"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Add Item
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddItemForm;