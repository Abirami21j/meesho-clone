import "./App.css";
import Header from "./components/Header";
import Products from "./components/Products";

function App() {
  return (
    <>
      <Header />
      <Products />
    </>
  );
}

export default App;
import React from "react";
// 1. Import your Footer component
import { Footer } from "./components/Footer"; 

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar component (built by your teammate) */}
      {/* <Navbar /> */}

      {/* Main Content / Pages / Routes */}
      <main className="flex-grow">
        <h1 className="text-center text-2xl font-bold my-10">Welcome to Meesho Clone</h1>
        {/* Your team's page content/routes go here */}
      </main>

      {/* 2. Add your Footer here at the bottom */}
      <Footer />
    </div>
  );
}

export default App;