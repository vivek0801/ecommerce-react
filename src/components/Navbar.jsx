function Navbar({
  search,
  setSearch,
  cartCount,
  wishlistCount,
  setShowCart,
  setShowWishlist
}) {
  return (
    <nav className="navbar">

      <div className="logo">
        ShopEase
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="nav-buttons">

        <button onClick={() => setShowWishlist(true)}>
          ❤️ Wishlist ({wishlistCount})
        </button>

        <button onClick={() => setShowCart(true)}>
          🛒 Cart ({cartCount})
        </button>

      </div>

    </nav>
  );
}

export default Navbar;