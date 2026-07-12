import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="Home-page">

     
    {/*  Header  */}
    <header className="header">

    <div className="logo">
        <h2>meesho</h2>
    </div>

    <div className="search-box">
        <input type="text" placeholder="Try Saree, Kurti or Search by Product Code" />
    </div>

    <nav className="navbar">
        <a href="index.html">Home</a>
        <a href="categories.html"> Categories
</a>
         <a href="product.html"> Products</a>
        <a href="cart.html">Cart</a>
        <a href="profile.html">Profile</a>

    </nav>

</header>

    {/*  Categories  */}
   <nav className="categories" id="categories">
        <a href="#">Women Ethnic</a>
        <a href="#">Women Western</a>
        <a href="#">Men</a>
        <a href="#">Kids</a>
        <a href="#">Home & Kitchen</a>
        <a href="#">Beauty</a>
        <a href="#">Jewellery</a>
        <a href="#">Electronics</a>
    </nav>

    {/*  Banner  */}
   {/*  Main Meesho Banner  */}
<section className="banner">
    <img src="https://images.meesho.com/images/marketing/1782978181486.webp"
         alt="Meesho Banner" />
         <div className="offer-content">
        <button id="shopBtn">Shop Now</button>
    </div>
</section>

{/*  Features  */}
<div className="features">
    <span>🔄 7 Days Easy Return</span>
    <span>💵 Cash on Delivery</span>
    <span>🏷 Lowest Prices</span>
</div>


<section className="category-section">

    <div className="category-card">
        <img src="https://images.meesho.com/images/marketing/1744634654837.webp" alt="" />
        <p>Ethnic Wear</p>
    </div>

    <div className="category-card">
        <img src="https://images.meesho.com/images/marketing/1744634725496.webp" alt="" />
        <p>Western Dresses</p>
    </div>

    <div className="category-card">
        <img src="https://images.meesho.com/images/marketing/1744634780426.webp" alt="" />
        <p>Menswear</p>
    </div>

    <div className="category-card">
        <img src="https://images.meesho.com/images/marketing/1744634814643.webp" alt="" />
        <p>Footwear</p>
    </div>

    <div className="category-card">
        <img src="https://images.meesho.com/images/marketing/1744634835018.webp" alt="" />
        <p>Home Decor</p>
    </div>

    <div className="category-card">
        <img src="https://images.meesho.com/images/marketing/1744634871107.webp" alt="" />
        <p>Beauty</p>
    </div>

    <div className="category-card">
        <img src="https://images.meesho.com/images/marketing/1744634909968.webp" alt="" />
        <p>Accessories</p>
    </div>

    <div className="category-card">
        <img src="https://images.meesho.com/images/marketing/1744634937295.webp" alt="" />
        <p>Grocery</p>
    </div>

</section>

{/*  Auto Changing Offer Banner  */}
<section className="offer-banner">

    <img src="https://images.meesho.com/images/marketing/1744698265981.webp"
         alt="Offer Banner" />
         <div className="offer-content">
        <button id="shopBtn">Shop Now</button>
    </div>
    

</section>
</section>

    {/*  Features  */}
    
{/*  Shop By Category  */}

    {/*  Shop Button  */}
    

<section id="products">

<h2 className="product-title">
    Products For You
</h2>

 {/*  PRODUCTS SECTION  */}
   {/*  PRODUCTS SECTION  */}
<div className="products-container">



{/*  Product Card  */}
{/*  PRODUCTS SECTION  */}
<div className="product-wrapper">

{/*  CARD 1  */}
<div className="product-card">
    <img src="orange.webp" />
    <h3>Rayon Women Kurti</h3>

    <div className="price">₹465</div>
    <div>
        <span className="old-price">₹699</span>
        <span className="discount">33% OFF</span>
    </div>

    <div className="rating">4.2 ★</div>
    <div className="reviews">636 Reviews</div>

    <button className="btn add">Add to Cart</button>
    <button className="btn buy">Buy Now</button>
</div>

{/*  CARD 2  */}
<div className="product-card">
    <img src="red kurti.webp" />
    <h3>Mahalaxmi Fashion Kurti</h3>

    <div className="price">₹599</div>
    <div>
        <span className="old-price">₹899</span>
        <span className="discount">33% OFF</span>
    </div>

    <div className="rating">4.3 ★</div>
    <div className="reviews">897 Reviews</div>

    <button className="btn add">Add to Cart</button>
    <button className="btn buy">Buy Now</button>
</div>

{/*  CARD 3  */}
<div className="product-card">
    <img src="embroid.jpg" />
    <h3>Lavender Anarkali Kurti</h3>

    <div className="price">₹799</div>
    <div>
        <span className="old-price">₹1199</span>
        <span className="discount">33% OFF</span>
    </div>

    <div className="rating">5.0 ★</div>
    <div className="reviews">921 Reviews</div>

    <button className="btn add">Add to Cart</button>
    <button className="btn buy">Buy Now</button>
</div>

{/*  CARD 4  */}
<div className="product-card">
    <img src="green.jpg" />
    <h3>Cotton A-Line Kurti</h3>

    <div className="price">₹549</div>
    <div>
        <span className="old-price">₹799</span>
        <span className="discount">31% OFF</span>
    </div>

    <div className="rating">4.5 ★</div>
    <div className="reviews">1230 Reviews</div>

    <button className="btn add">Add to Cart</button>
    <button className="btn buy">Buy Now</button>
</div>


<div className="product-card">
    <img src="https://images.meesho.com/images/products/646192388/gej0n_512.avif?width=360" />
    <h3>White with black Kurti</h3>

    <div className="price">₹549</div>
    <div>
        <span className="old-price">₹799</span>
        <span className="discount">31% OFF</span>
    </div>

    <div className="rating">4.5 ★</div>
    <div className="reviews">1230 Reviews</div>

    <button className="btn add">Add to Cart</button>
    <button className="btn buy">Buy Now</button>
</div>
{/*  Card-5  */}

<div className="product-card">
    <img src="https://images.meesho.com/images/products/860970950/ivzlb_512.avif?width=512" />
    <h3>Black Net Kurti</h3>

    <div className="price">₹549</div>
    <div>
        <span className="old-price">₹799</span>
        <span className="discount">31% OFF</span>
    </div>

    <div className="rating">4.5 ★</div>
    <div className="reviews">1230 Reviews</div>

    <button className="btn add">Add to Cart</button>
    <button className="btn buy">Buy Now</button>
</div>

{/*  card-6  */}

<div className="product-card">
    <img src="https://images.meesho.com/images/products/562869970/xrzdg_512.avif?width=512" />
    <h3>Women net Kurti</h3>

    <div className="price">₹549</div>
    <div>
        <span className="old-price">₹799</span>
        <span className="discount">31% OFF</span>
    </div>

    <div className="rating">4.5 ★</div>
    <div className="reviews">1230 Reviews</div>

    <button className="btn add">Add to Cart</button>
    <button className="btn buy">Buy Now</button>
</div>
{/*  card-7  */}
<div className="product-card">
    <img src="https://images.meesho.com/images/products/614177009/dkpvy_512.avif?width=512" />
    <h3>Grey-Line Kurti</h3>

    <div className="price">₹549</div>
    <div>
        <span className="old-price">₹799</span>
        <span className="discount">31% OFF</span>
    </div>

    <div className="rating">4.5 ★</div>
    <div className="reviews">1230 Reviews</div>

    <button className="btn add">Add to Cart</button>
    <button className="btn buy">Buy Now</button>
</div>
{/*  card-8  */}

<div className="product-card">
    <img src="https://images.meesho.com/images/products/415940733/9k8xe_512.avif?width=512" />
    <h3>Purple Kurti</h3>

    <div className="price">₹549</div>
    <div>
        <span className="old-price">₹799</span>
        <span className="discount">31% OFF</span>
    </div>

    <div className="rating">4.5 ★</div>
    <div className="reviews">1230 Reviews</div>

    <button className="btn add">Add to Cart</button>
    <button className="btn buy">Buy Now</button>
</div>

{/*  card-9  */}

<div className="product-card">
    <img src="https://images.meesho.com/images/products/683964653/ygghl_512.avif?width=512" />
    <h3>Kurti with bottom</h3>

    <div className="price">₹549</div>
    <div>
        <span className="old-price">₹799</span>
        <span className="discount">31% OFF</span>
    </div>

    <div className="rating">4.5 ★</div>
    <div className="reviews">1230 Reviews</div>

    <button className="btn add">Add to Cart</button>
    <button className="btn buy">Buy Now</button>
</div>


</div>
<div className="viewMore">

<button id="viewMore">
    View More
</button>

</div>

</section>
{/*  Add this at the end of your webpage  */}
<section className="about-section">
  <div className="container">
    <h2 className="about-title">More About MyStore</h2>
    <hr className="divider" />

    <h3>Discover a World of Affordable Products & Everyday Essentials</h3>
    <p>
      Upgrade your lifestyle with the latest trends and essentials at prices designed for everyday value. 
      MyStore offers a vast selection of products across all categories, ensuring you find everything you need at prices suited for your budget.
    </p>

    <h3>Shop Millions of Products Across All Categories</h3>
    <p>
      From trendy fashion to essential homeware, MyStore is your one-stop shop for everything you need. 
      Explore millions of products across a wide variety of categories for every occasion.
    </p>

    <h3>Latest Fashion Is Right Here</h3>
    <h4>Western Wear</h4>
    <p>
      Looking to revamp your wardrobe? Find trendy dresses, casual jeans, and comfortable tops suitable for any occasion. 
      Fresh styles added regularly so you stay on top of your fashion game.
    </p>

    <h4>Accessories & Footwear</h4>
    <p>
      Elevate your outfit with jewelry, handbags, belts, and footwear. 
      Whether you're searching for statement earrings or comfortable sneakers, you'll find a wide selection to suit your style.
    </p>
  </div>
</section>
<footer className="bottom-nav">

<a href="dashboard.html" className="nav-item active">
🏠 Home
</a>

<a href="categories.html">
📂 Categories
</a>

<a href="product.html">
🛍 Products
</a>

<a href="cart.html">
🛒 Cart
</a>

<a href="profile.html">
👤 Profile
</a>

</footer>

        </div>
    );
};

export default Home;
