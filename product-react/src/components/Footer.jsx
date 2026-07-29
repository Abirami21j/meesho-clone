import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, limit } from "firebase/firestore";
import { db } from "../firebase"; // Ensure path to your firebase config is correct
import { Mail, CheckCircle, Phone, MapPin, Send } from "lucide-react";

export const Footer = () => {
  // State for Newsletter Subscription
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subLoading, setSubLoading] = useState(false);

  // State for Dynamic Categories from Firestore
  const [categories, setCategories] = useState([]);

  // Fetch Categories from Firestore on load
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const q = query(collection(db, "categories"), limit(6));
        const querySnapshot = await getDocs(q);
        const catList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Fallback categories if database is empty initially
        if (catList.length === 0) {
          setCategories([
            { name: "Women Ethnic" },
            { name: "Women Western" },
            { name: "Men Wear" },
            { name: "Kids Wear" },
            { name: "Home & Kitchen" },
            { name: "Beauty & Health" }
          ]);
        } else {
          setCategories(catList);
        }
      } catch (error) {
        console.error("Error fetching categories for footer:", error);
      }
    };

    fetchCategories();
  }, []);

  // Backend Function 1: Save Newsletter Email to Firestore
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setSubLoading(true);
    try {
      // Adds email to 'subscribers' collection in Firestore
      await addDoc(collection(db, "subscribers"), {
        email: email.toLowerCase().trim(),
        subscribedAt: new Date().toISOString(),
        status: "active"
      });

      setSubscribed(true);
      setEmail("");
    } catch (error) {
      console.error("Error subscribing:", error);
      alert("Failed to subscribe. Please try again.");
    } finally {
      setSubLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP SECTION: Grid of 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* COL 1: Brand Info */}
          <div>
            <h2 className="text-2xl font-bold text-pink-500 mb-4">Meesho Clone</h2>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              India's favorite one-stop online shop for fashion, home & beauty items at the lowest wholesale prices.
            </p>
            <div className="flex items-center space-x-3 text-sm text-gray-400">
              <MapPin size={16} className="text-pink-500" />
              <span>Bangalore, Karnataka, India</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-400 mt-2">
              <Phone size={16} className="text-pink-500" />
              <span>+91 1800 200 3000</span>
            </div>
          </div>

          {/* COL 2: Dynamic Categories from Backend */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-pink-500 pb-1 inline-block">
              Top Categories
            </h3>
            <ul className="space-y-2 text-sm">
              {categories.map((cat, index) => (
                <li key={cat.id || index}>
                  <a href={`/category/${cat.name}`} className="hover:text-pink-400 transition-colors">
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-pink-500 pb-1 inline-block">
              Reach Out To Us
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="hover:text-pink-400">About Us</a></li>
              <li><a href="/supplier" className="hover:text-pink-400">Become a Supplier</a></li>
              <li><a href="/reseller" className="hover:text-pink-400">Become a Reseller</a></li>
              <li><a href="/careers" className="hover:text-pink-400">Careers</a></li>
              <li><a href="/privacy" className="hover:text-pink-400">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-pink-400">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* COL 4: Newsletter Subscription (Backend Feature) */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-pink-500 pb-1 inline-block">
              Subscribe for Offers
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              Get exclusive deal updates, extra discounts, and weekly offers straight to your inbox.
            </p>

            {subscribed ? (
              <div className="flex items-center space-x-2 text-green-400 text-sm bg-green-900/30 p-3 rounded-lg border border-green-500/30">
                <CheckCircle size={18} />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:border-pink-500"
                  />
                  <Mail size={18} className="absolute right-3 top-3 text-gray-400" />
                </div>
                <button
                  type="submit"
                  disabled={subLoading}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
                >
                  {subLoading ? (
                    <span>Subscribing...</span>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* BOTTOM SECTION: Copyright & Info */}
        <div className="pt-6 border-t border-gray-800 text-center md:flex md:justify-between md:items-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Meesho Clone Project. Built by Internship Team.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <span className="hover:underline cursor-pointer">Security</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Sitemap</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Compliance</span>
          </div>
        </div>

      </div>
    </footer>
  );
};