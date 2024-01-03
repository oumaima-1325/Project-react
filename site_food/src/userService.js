import { json } from "react-router-dom";

const login = async (email, password) => {
  try {
    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (response && response.ok) {
        
      const data = await response.json();
      console.log(data.token);
      const users = await getUsers(data.token);
      console.log(users);
      users.map((user) => {
        if (user.email === email) {
          localStorage.setItem("email", user.email);
          localStorage.setItem("userId", user.id);
          localStorage.setItem("cartId", user.cart.id);
        }
      });
      console.log(data);
      return data;
    } else {
      return await response.json();
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const registerUser = async (email, password) => {
  try {
    const response = await fetch("http://localhost:8000/api/users", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Registration failed");
    }
  } catch (error) {
    throw error;
  }
};

const getUsers = async (token) => {
  try {
    const users = await fetch("http://localhost:8000/api/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    return users;
  } catch (error) {
    throw error;
  }
};

const getCart = async (token ,cartId) => {
  try {
    const users = await fetch(`http://localhost:8000/api/carts/${cartId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    return users;
  } catch (error) {
    throw error;
  }
};

const addFoodToCart = async (cartId , foodId ,token) => {
  try {
    const users = await fetch(`http://localhost:8000/api/carts/${cartId}/add_food`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body : JSON.stringify({
        foodId: foodId,
      })
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error adding food:", error);
      });
    return users;
  } catch (error) {
    throw error;
  }
};

export {getCart, registerUser, login, addFoodToCart };
