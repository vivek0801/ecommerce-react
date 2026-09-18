function Cart({ cart, setCart, closeCart }) {
  const increaseQuantity = (id) => {
    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== id)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart">
      <div className="cart-header">
        <h2>Your Cart</h2>

        <button className="close-btn" onClick={closeCart}>
          ×
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h3>Your cart is empty 🛒</h3>
          <p>Add some products to get started.</p>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-item-info">
                <h3>{item.name}</h3>

                <p>₹{item.price}</p>

                <div className="quantity-controls">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>

                <p>
                  Subtotal: ₹{item.price * item.quantity}
                </p>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="cart-total">
            <p>Total: ₹{total}</p>

            <button
              className="checkout-btn"
              onClick={() => alert("Checkout feature coming soon!")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;