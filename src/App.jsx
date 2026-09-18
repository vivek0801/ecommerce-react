import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";

import products from "./data/products";

import "./App.css";


function App() {

  // Cart state
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart
      ? JSON.parse(savedCart)
      : [];
  });


  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist =
      localStorage.getItem("wishlist");

    return savedWishlist
      ? JSON.parse(savedWishlist)
      : [];
  });


  // Search state
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  // Category state
  const [category, setCategory] =
    useState("All");


  // Side panel states
  const [showCart, setShowCart] =
    useState(false);

  const [showWishlist, setShowWishlist] =
    useState(false);


  // Save cart to LocalStorage
  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);


  // Save wishlist to LocalStorage
  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);


  // Add product to cart
  const addToCart = (product) => {

    setCart((previousCart) => {

      const existingProduct =
        previousCart.find(
          (item) =>
            item.id === product.id
        );


      if (existingProduct) {

        return previousCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + 1
              }
            : item
        );

      }


      return [
        ...previousCart,
        {
          ...product,
          quantity: 1
        }
      ];

    });

    setMessage(`${product.name} added to cart!`);

    setTimeout(() => {
    setMessage("");
    }, 2000);

  };


  // Add product to wishlist
  const addToWishlist = (product) => {

    setWishlist((previousWishlist) => {

      const alreadyExists =
        previousWishlist.some(
          (item) =>
            item.id === product.id
        );


      if (alreadyExists) {
        return previousWishlist;
      }


      return [
        ...previousWishlist,
        product
      ];

    });

  };


  // Remove product from wishlist
  const removeFromWishlist = (id) => {

    setWishlist((previousWishlist) =>
      previousWishlist.filter(
        (item) =>
          item.id !== id
      )
    );

  };


  // Create category list
  const categories = [
    "All",
    ...new Set(
      products.map(
        (product) =>
          product.category
      )
    )
  ];


  // Search + category filtering
  const filteredProducts =
    products.filter((product) => {

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );


      const matchesCategory =
        category === "All" ||
        product.category === category;


      return (
        matchesSearch &&
        matchesCategory
      );

    });


  // Total number of products in cart
  const cartCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );


  return (
    <div className="app">

      {/* Navbar */}

      <Navbar
        search={search}
        setSearch={setSearch}
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        setShowCart={setShowCart}
        setShowWishlist={setShowWishlist}
      />

      {message && (
      <div className="cart-message">
      ✓ {message}
      </div>
      )}


      {/* Hero Section */}

      <section className="hero">

        <div>

          <h1>
            Welcome to ShopEase
          </h1>

          <p>
            Find everything you need
            in one place.
          </p>

        </div>

      </section>


      {/* Main Content */}

      <main className="container">

        <div className="category-section">

          <h2>
            Shop by Category
          </h2>


          <div className="category-buttons">

            {categories.map(
              (cat) => (

                <button
                  key={cat}
                  className={
                    category === cat
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setCategory(cat)
                  }
                >
                  {cat}
                </button>

              )
            )}

          </div>

        </div>


        <div className="products-heading">
          <h2>Products</h2>
          <span>{filteredProducts.length} products found</span>
        </div>


        <ProductList
          products={filteredProducts}
          addToCart={addToCart}
          addToWishlist={addToWishlist}
        />

      </main>


      {/* Cart */}

      {showCart && (

        <div className="overlay">

          <Cart
            cart={cart}
            setCart={setCart}
            closeCart={() =>
              setShowCart(false)
            }
          />

        </div>

      )}


      {/* Wishlist */}

      {showWishlist && (

        <div className="overlay">

          <Wishlist
            wishlist={wishlist}
            removeFromWishlist={
              removeFromWishlist
            }
            addToCart={addToCart}
            closeWishlist={() =>
              setShowWishlist(false)
            }
          />

        </div>

      )}


      {/* Footer */}

      <footer>

        <p>
          © 2026 ShopEase. All Rights Reserved.
        </p>

      </footer>

    </div>
  );
}


export default App;