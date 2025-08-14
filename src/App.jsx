import React from 'react';
import { FoodProvider } from './context/FoodContext';
import Header from './components/Header';
import Introduction from './components/Introduction';
import AddItemForm from './components/AddItemForm';
import FoodList from './components/FoodList';
import Statistics from './components/Statistics';
import ConfirmationModal from './components/ConfirmationModal';

function App() {
  return (
    <FoodProvider>
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <Header />
          <Introduction />
          <AddItemForm />
          <FoodList />
          <Statistics />
        </div>
        <ConfirmationModal />
      </div>
    </FoodProvider>
  );
}

export default App;