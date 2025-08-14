import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const FoodContext = createContext();

export const useFoodContext = () => useContext(FoodContext);

export const FoodProvider = ({ children }) => {
  const [foodItems, setFoodItems] = useLocalStorage('foodItems', []);
  const [notifications, setNotifications] = useLocalStorage('notifications', []);
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Vérifier les notifications au chargement et périodiquement
  useEffect(() => {
    checkForNotifications();
    const interval = setInterval(checkForNotifications, 60000);
    return () => clearInterval(interval);
  }, [foodItems]);

  // Première visite
  useEffect(() => {
    if (!localStorage.getItem('hasVisitedBefore')) {
      setNotifications(prev => [
        ...prev,
        {
          type: 'info',
          message: 'Welcome to Food Expiry Tracker! Add your food items to get started.'
        }
      ]);
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, []);

  // Demander la permission pour les notifications
  useEffect(() => {
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, []);

  const checkForNotifications = () => {
    const now = new Date();
    let newNotifications = [];
    let updatedFoodItems = [...foodItems];
    
    updatedFoodItems.forEach(item => {
      const expiryDate = new Date(item.expiryDate);
      const daysUntilExpiry = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
      
      if (daysUntilExpiry <= 0 && !item.notifiedExpired) {
        newNotifications.push({
          type: 'expired',
          message: `${item.name} has expired!`,
          itemId: item.id
        });
        item.notifiedExpired = true;
      } else if (daysUntilExpiry <= 3 && daysUntilExpiry > 0 && !item.notifiedWarning) {
        newNotifications.push({
          type: 'warning',
          message: `${item.name} is expiring in ${daysUntilExpiry} day${daysUntilExpiry === 1 ? '' : 's'}!`,
          itemId: item.id
        });
        item.notifiedWarning = true;
      }
    });
    
    if (newNotifications.length > 0) {
      setNotifications(prev => [...prev, ...newNotifications]);
      setFoodItems(updatedFoodItems);
      
      // Envoyer des notifications du navigateur si autorisé
      if (Notification.permission === 'granted') {
        newNotifications.forEach(notification => {
          new Notification('Food Expiry Alert', {
            body: notification.message
          });
        });
      }
    }
  };

  const addFoodItem = (name, category, expiryDate) => {
    const newItem = {
      id: Date.now().toString(),
      name,
      category,
      expiryDate,
      addedDate: new Date().toISOString(),
      notifiedWarning: false,
      notifiedExpired: false
    };
    
    setFoodItems(prev => [...prev, newItem]);
  };

  const deleteFoodItem = (id) => {
    setFoodItems(prev => prev.filter(item => item.id !== id));
    setNotifications(prev => prev.filter(notification => notification.itemId !== id));
  };

  const clearAllFoodItems = () => {
    setFoodItems([]);
    setNotifications([]);
    setModalOpen(false);
  };

  const toggleNotificationPanel = () => {
    setNotificationPanelOpen(prev => !prev);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // Calculer les statistiques
  const getStatistics = () => {
    const now = new Date();
    const expired = foodItems.filter(item => {
      const expiryDate = new Date(item.expiryDate);
      return Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24)) <= 0;
    }).length;
    
    const warning = foodItems.filter(item => {
      const expiryDate = new Date(item.expiryDate);
      const days = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
      return days > 0 && days <= 3;
    }).length;
    
    const total = foodItems.length;
    
    return {
      total,
      warning,
      expired,
      progressAll: total ? '100%' : '0%',
      progressWarning: total ? `${(warning / total) * 100}%` : '0%',
      progressExpired: total ? `${(expired / total) * 100}%` : '0%'
    };
  };

  const value = {
    foodItems,
    notifications,
    notificationPanelOpen,
    modalOpen,
    addFoodItem,
    deleteFoodItem,
    clearAllFoodItems,
    toggleNotificationPanel,
    openModal,
    closeModal,
    getStatistics
  };

  return (
    <FoodContext.Provider value={value}>
      {children}
    </FoodContext.Provider>
  );
};