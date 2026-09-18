function ProductCard({
  product,
  addToCart,
  addToWishlist
}) {
  return (
    <div className="product-card">

      <img
        src={product.image}
        alt={product.name}
      />

      <div className="product-info">

        <h3>{product.name}</h3>

        <p className="category">
          {product.category}
        </p>

        <p className="price">
          ₹{product.price}
        </p>

        <div className="product-buttons">

          <button
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>

          <button
            className="wishlist-btn"
            onClick={() => addToWishlist(product)}
          >
            ❤️
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;