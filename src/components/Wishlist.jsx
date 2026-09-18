function Wishlist({
  wishlist,
  removeFromWishlist,
  addToCart,
  closeWishlist
}) {
  return (
    <div className="wishlist">
      <div className="wishlist-header">
        <h2>Your Wishlist ❤️</h2>

        <button className="close-btn" onClick={closeWishlist}>
          ×
        </button>
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-cart">
          <h3>Your wishlist is empty ❤️</h3>
          <p>Add products you would like to buy later.</p>
        </div>
      ) : (
        wishlist.map((item) => (
          <div className="wishlist-item" key={item.id}>
            <img src={item.image} alt={item.name} />

            <div className="wishlist-item-info">
              <h3>{item.name}</h3>

              <p>₹{item.price}</p>

              <button
                className="checkout-btn"
                onClick={() => addToCart(item)}
              >
                Add to Cart
              </button>

              <button
                className="remove-btn"
                onClick={() => removeFromWishlist(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Wishlist;