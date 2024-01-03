import { useState } from 'react';
import List_Meals from '../Meals.json'; 

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedMeals, setSearchedMeals] = useState([]);
  const [showNoResultMessage, setShowNoResultMessage] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setShowNoResultMessage(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const filteredMeals = filterMealsByName(List_Meals.meals, searchTerm);
    console.log('Nombre de repas filtrés :', filteredMeals.length);
    setSearchedMeals(filteredMeals);

    // Show no result message if no meals found
    setShowNoResultMessage(filteredMeals.length === 0);
  };

  const filterMealsByName = (meals, query) => {
    return meals.filter((meal) => {
      const matchName = meal.strMeal.toLowerCase().includes(query.toLowerCase());
      const matchArea = meal.strArea.toLowerCase().includes(query.toLowerCase());
      return matchName || matchArea;
    });
  };

  return {
    searchTerm,
    searchedMeals,
    showNoResultMessage,
    handleSearchChange,
    handleFormSubmit,
  };
};
