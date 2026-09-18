import ProductCard from "./ProductCard";

function ProductList({
  products,
  addToCart,
  addToWishlist
}) {
  if (products.length === 0) {
    return (
      <div className="no-products">
        <h2>No products found</h2>
        <p>Try another search or category.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">

      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addToCart={addToCart}
          addToWishlist={addToWishlist}
        />
      ))}

    </div>
  );
}

export default ProductList;