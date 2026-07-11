function Header() {
  return (
    <header className="header">
      <div className="logo">
        <h2>meesho</h2>
      </div>

      <div className="search">
        <input
          type="text"
          placeholder="Try Saree, Kurti or Search by Product Code"
        />
      </div>

      <nav className="nav">
        <a href="#">Home</a>
        <a href="#">Categories</a>
        <a href="#">Products</a>
        <a href="#">Cart</a>
        <a href="#">Profile</a>
      </nav>
    </header>
  );
}

export default Header;