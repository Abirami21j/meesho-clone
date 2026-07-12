import React from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';

const Categories = () => {
    return (
        <div className="Categories-page">


    {/*  Header  */}

    <header>
        

        <div className="logo">
            <h1>meesho</h1>
        </div>

        <div className="search-box">
            <input type="text" placeholder="Try Saree, Kurti or Search by Product Code" />
        </div>

        <div className="menu">
    <a href="index.html">Home</a>
    <a href="product.html">Products</a>
    <a href="cart.html">Cart</a>
    <a href="profile.html">Profile</a>
</div>

    </header>


    {/*  Banner  */}

    <section className="banner">

        <img src="images/banner.jpg" alt="Banner" />

    </section>


    {/*  Category Icons  */}

    <section className="category-icons">

        <div className="icon">
            <img src="images/women.jpg" alt="Women" />
            <p>Women</p>
        </div>

        <div className="icon">
            <img src="images/men.jpg" alt="Men's Fashion" />
            <p>Men</p>
        </div>

        <div className="icon">
            <img src="images/kids.jpg" alt="Kids" />
            <p>Kids</p>
        </div>

        <div className="icon">
            <img src="images/beauty.jpg" alt="Beauty" />
            <p>Beauty</p>
        </div>

        <div className="icon">
            <img src="images/home.jpg" alt="Home & Kitchen" />
            <p>Home</p>
        </div>

        <div className="icon">
            <img src="images/electronics.jpg" alt="Electronics" />
            <p>Electronics</p>
        </div>

    </section>



    {/*  Shop by Categories  */}

    <section className="categories">

        <h2>Shop by Categories</h2>

        <div className="cards">

            <div className="card">

                <img src="images/women.jpg" alt="Women's Fashion" />

                <h3>Women's Fashion</h3>

                <p>Sarees, Kurtis, Tops, Dresses & More</p>

                <button>Explore</button>

            </div>


            <div className="card">

                <img src="images/men.jpg" alt="Men's Fashion" />

                <h3>Men's Fashion</h3>

                <p>T-Shirts, Shirts, Jeans & Footwear</p>

                <button>Explore</button>

            </div>


            <div className="card">

                <img src="images/kids.jpg" alt="Kids" />

                <h3>Kids Collection</h3>

                <p>Clothing, Toys & Accessories</p>

                <button>Explore</button>

            </div>


            <div className="card">

                <img src="images/beauty.jpg" alt="Beauty" />

                <h3>Beauty Products</h3>

                <p>Skincare, Makeup & Hair Care</p>

                <button>Explore</button>

            </div>


            <div className="card">

                <img src="images/electronics.jpg" alt="Electronics" />
            
                <h3>Electronics</h3>

                <p>Mobiles, Headphones & Smart Gadgets</p>

                <button>Explore</button>

            </div>


            <div className="card">

                <img src="images/home.jpg" alt="Home & Kitchen" />

                <h3>Home & Kitchen</h3>

                <p>Furniture, Decor & Kitchen Essentials</p>

                <button>Explore</button>

            </div>

        </div>

    </section>



    {/*  Offers  */}

    <section className="offer">

        <h2>Today's Best Deals</h2>

        <div className="offer-box">

            <div className="offer-card">
                <h3>50% OFF</h3>
                <p>Women's Collection</p>
            </div>

            <div className="offer-card">
                <h3>40% OFF</h3>
                <p>Men's Fashion</p>
            </div>

            <div className="offer-card">
                <h3>60% OFF</h3>
                <p>Home Essentials</p>
            </div>

            <div className="offer-card">
                <h3>30% OFF</h3>
                <p>Electronics</p>
            </div>

        </div>

    </section>



    {/*  Footer  */}

    <footer>

        <h3>Meesho Clone</h3>

        <p>Shop Smart | Shop Easy</p>

        <p>© 2026 All Rights Reserved</p>

    </footer>

    {/*  Bottom Navigation  */}
<div className="bottom-nav">

    <a href="index.html" className="nav-item">
        <span>🏠</span>
        <p>Home</p>
    </a>

    <a href="category.html" className="nav-item active">
        <span>📂</span>
        <p>Categories</p>
    </a>

    <a href="product.html" className="nav-item">
        <span>🛍️</span>
        <p>Products</p>
    </a>

    <a href="cart.html" className="nav-item">
        <span>🛒</span>
        <p>Cart</p>
    </a>

    <a href="profile.html" className="nav-item">
        <span>👤</span>
        <p>Profile</p>
    </a>

</div>


        </div>
    );
};

export default Categories;
