import React from 'react';
import { useFoodContext } from '../context/FoodContext';

const ConfirmationModal = () => {
  const { modalOpen, closeModal, clearAllFoodItems } = useFoodContext();

  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirm Clear All</h3>
        <p className="text-gray-600 mb-6">Are you sure you want to remove all food items? This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <button 
            onClick={closeModal}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button 
            onClick={clearAllFoodItems}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;