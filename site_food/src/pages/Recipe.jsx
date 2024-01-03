import React from 'react';
import { useParams } from 'react-router-dom';
import List_Meals from '../Meals.json';
import "../styles/recipe.css";
import Navs from '../components/Navs';

const Recipe = () => {
  const { idMeal } = useParams();
  const selectedRecipe = List_Meals.meals.find(meal => meal.idMeal === idMeal);

  if (!selectedRecipe) {
    return <div>Recette introuvable</div>;
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = selectedRecipe[`strIngredient${i}`];
    const measure = selectedRecipe[`strMeasure${i}`];
    if (ingredient && measure) {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <>
      <Navs />

      <div className="background-image-section">
        <div className="background-content">
          <h1>Haw To Make your {selectedRecipe.strMeal}</h1>
          <p >Read ingredients,Watch a video and BonAppetit...</p>
        </div>
      </div>
      <div className="recipe-section">
        <div className="recipe-content">

          <div className="recipe-details">
            <img src={selectedRecipe.strMealThumb} alt="..." className="recipe-image" />
            <div className="recipe-text">
              <p>{selectedRecipe.strInstructions}</p>
              <h3 className='parag_recip'>Ingrédients :</h3>
              <ul>
                {ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
                <li>
                  <a href={selectedRecipe.strYoutube} target="_blank" rel="noopener noreferrer" className='parag_recip'>
                    Regarder la vidéo
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="additional-details">
            <p>Région : {selectedRecipe.strArea}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recipe;
