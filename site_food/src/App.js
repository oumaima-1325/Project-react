import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import React, { useState,useEffect } from 'react';
import Home from './pages/Home';
import Navs from './components/Navs';
import Footer from './components/Footer';
import Login from './pages/Login';
import Logot from './pages/Logot';
import Menu from './components/Menu';
import About from './pages/About';
import CartPage from './components/CartPage';
import Contact from './components/Contact';
import emailjs from 'emailjs-com';
import Recipe from './pages/Recipe';

function App() {
  useEffect(() => {
    // Initialisation d'Email.js avec votre user ID
    emailjs.init('-csrB6YQNW4tchadi');  // Remplacez par votre user ID
  }, []);

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const [show, setShow] = useState(true);
  const [cart, setcart] = useState([]);
  const handleclick = (meal) => {
    if (cart.indexOf(meal) !== -1) return;
    setcart([...cart, meal]);
  }
  const addToCart = (meal) => {
    if (cart.findIndex((item) => item.idMeal === meal.idMeal) === -1) {
      setcart([...cart, meal]);
    }
  };

  const handleChange = (item, d) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.idMeal === item.idMeal) {
        const updatedAmount = cartItem.amount + d;
        return { ...cartItem, amount: updatedAmount > 0 ? updatedAmount : 1 };
      }
      return cartItem;
    });
    setcart(updatedCart);
  };

  const pathsToShowNavAndFooter = ['/', '/Order', '/about']; // Chemins où vous souhaitez afficher Navs et Footer

  const shouldShowNavAndFooter = pathsToShowNavAndFooter.includes(location.pathname);

  return (
    <>

      {shouldShowNavAndFooter && (
        <div>
          <Navs setShow={setShow} addToCart={addToCart} cartItems={cart} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Order" element={<Menu addToCart={addToCart} />} />
            
            <Route path="/about" element={<About />} />
           
          </Routes>
          <Footer />

        </div>
      )}

      <Routes>
        <Route path="/cart" element={<CartPage cart={cart} setCart={setcart} handleChange={handleChange} />} />

        <Route path="/login" element={<Login />} />
        <Route path="/logot" element={<Logot />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/recipe/:idMeal" element={<Recipe />} />
      </Routes>
    </>
  );
}

export default App;