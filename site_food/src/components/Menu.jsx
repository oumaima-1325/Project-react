import { React, useState, useEffect } from 'react';
import List_Meals from '../Meals.json';
import { Button, Container, Form } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { useSearch } from './SearchUtils';
import "../styles/Menu.css";
import { Link, useNavigate } from 'react-router-dom';

const Menu = ({ addToCart }) => {
  const [cart, setcart] = useState([]);
  const [selectedRecipeID, setSelectedRecipeID] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setcart(JSON.parse(savedCart));
    }
  }, []);

  const handleClick = (meal) => {
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.idMeal === meal.idMeal);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].amount += 1;
      setcart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      const updatedMeal = { ...meal, amount: 1 };
      const updatedCart = [...cart, updatedMeal];
      setcart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    addToCart(meal);
  };
  const { searchTerm, searchedMeals, showNoResultMessage, handleSearchChange, handleFormSubmit, } = useSearch();

  return (
    <div className='color-menu'>
      <Container >
        <Form inline onSubmit={handleFormSubmit} >
          <Row className='menu_height'>
            <Col xs='auto' >

              <Form.Control type='text' placeholder='Search' className='mr-sm-2' value={searchTerm}
                onChange={handleSearchChange} />
            </Col>
            <Col xs='auto'>
              <Button type='submit' className='btn m-1'>
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        {showNoResultMessage && <p className='result_search'>Sorry, we couldn't find any matching meals for your search</p>}
        <Row className='justify-content-md-center'>
          {(searchedMeals.length > 0 ? searchedMeals : List_Meals.meals).map(
            (meal) => (
              <Col key={meal.idMeal} xs={12} sm={6} md={4} lg={3}>
                <div className='card mb-3'>
                  <img src={meal.strMealThumb} className='card-img-top' alt='...' />
                  <div className='card-body'>
                    <Row>
                      <Col sm={10}>
                        <h2 className='card-title'>{meal.strMeal}</h2>
                      </Col>

                    </Row>

                    <h4>{meal.strArea}</h4>
                    <h6>{'prix: ' + meal.prix + 'DH'}</h6>

                    <a href='#' className='btn m-1' role='button' aria-disabled='true' onClick={(e) => {
                      e.preventDefault();
                      handleClick(meal)
                    }} >
                      Ajouter
                    </a>
                    <Link to={`/recipe/${meal.idMeal}`} className="btn m-1" onClick={() => setSelectedRecipeID(meal.idMeal)}
                    >
                      Voir recette
                    </Link>
                  </div>
                </div>
              </Col>
            ),
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Menu;