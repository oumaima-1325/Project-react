import React, { useState, useEffect } from "react";
import "../styles/CartePage.css";
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getCart } from "../userService";
import  ListMeals  from "../Meals.json"; 

const CartPage = ({ cart, setCart, handleChange }) => {
    const [price, setPrice] = useState(0);
    const [cartMeals, setCartMeals] = useState(null);
    const navigate = useNavigate();

    const handleRemove = (idMeal) => {
        const updatedCart = cart.filter((item) => item.idMeal !== idMeal);
        setCart(updatedCart);
        handlePrice(updatedCart);
        // Mettre à jour le localStorage après suppression d'un élément du panier
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handlePrice = (updatedCart) => {
        let totalPrice = 0;
        updatedCart.forEach((item) => {
            totalPrice += item.amount * item.prix;
        });
        setPrice(totalPrice);
    };
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      }, [setCart]);
    useEffect(() => {
        handlePrice(cart);
      }, [cart]);
    useEffect(() => {
        const fetchCart = async()=>{
            try {
            const data = await getCart(localStorage.getItem("token") , localStorage.getItem("cartId"));
            console.log(data);
            const filteredMeals = ListMeals.meals.filter((meal) => data.foodItems.includes(meal.idMeal));

      
            setCartMeals(filteredMeals)

        } catch (error) {
            
        }
        }
        fetchCart()
    },[])

    return (
        <article>
            <p className="my_shoping" onClick={() => navigate('/Order')}>My Shopping</p>
            <Row>
                <Col sm={11}>
                    {cart.map((item) => (
                        <div className="cart_box" key={item.idMeal}>
                            <div className="cart_img">
                                <img src={item.strMealThumb} alt="" />
                                <p>{item.strMeal}</p>
                            </div>
                            <div>
                                <button onClick={() => handleChange(item, 1)}>+</button>
                                <button>{item.amount}</button>
                                <button onClick={() => handleChange(item, -1)}>-</button>
                            </div>
                            <div>
                                <span>{item.prix}</span>
                                <button onClick={() => handleRemove(item.idMeal)}>Remove</button>
                            </div>
                        </div>
                    ))}
                    <div className="total">
                        <span>Total Price of your Cart</span>
                        <span>DH - {price}</span>
                        <button className="btn_confirm_achat">Confirmer</button>
                    </div>

                </Col>
            </Row>
        </article>
    );
};

export default CartPage;