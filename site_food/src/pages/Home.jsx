import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Hero.css";
import headImage from "../assets/head2.jpg";
import rect from "../assets/recte.jpeg";
import pitzza from "../assets/pitzza2.jpg";
import chiekn from "../assets/CHIKEN.jpg";
import card1 from "../assets/27710.jpg";
import card2 from "../assets/cheese.jpg";
import card3 from "../assets/side.jpg";
import beak5 from "../assets/beak4.jpg";
import beak from "../assets/beak.jpg";
import beak3 from "../assets/beak3.jpg";
import beak4 from "../assets/head2.jpg";
import beak2 from "../assets/beak2.jpg";
import { Link } from "react-router-dom";
import List_Meals from "../Meals.json";
import { Button } from "react-bootstrap";
import beak6 from "./../assets/pit.jpg";
import beak7 from "./../assets/beak7.jpg";

const Home = () => {
  //redirection vers page order
  const meals = List_Meals.meals;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedRecipeID, setSelectedRecipeID] = useState(null);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (prev, next) => setCurrentSlide(next),
  };
  const images = [beak, beak7, beak5, beak2];
  return (
    <div className="all-home">
      <header className="hero-header-home">
        <Slider className="hero-slider-home" {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Slide ${index}`} />
            </div>
          ))}
        </Slider>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h2>Good food choices</h2>
              <p>
                Indulge in a hassle-free dining experience with our seamless
                food ordering page.
              </p>
              <Button as={Link} to="/Order" className="btn-order">
                Order now
              </Button>
            </div>
          </div>
        </div>
      </header>
      <section className="team">
        <h1>Our meals{" "}<Link to="/Order" className="click-red-home">  click</Link>{" "}to watch all </h1>
        <div className="team-cards">
          {meals.slice(0, 3).map((meal) => (
            <Link className="color_card_home" to={`/recipe/${meal.idMeal}`} onClick={() => setSelectedRecipeID(meal.idMeal)}>
              <div key={meal.idMeal} className="card_about">
                <div className="card-img_about">
                  <img src={meal.strMealThumb} alt={meal.strMeal} />
                </div>
                <div className="card-info">
                  <h3>{meal.strMeal}</h3>
                  <p>{meal.strArea}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
