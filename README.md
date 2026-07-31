<div align="center">
  <img src="https://images.meesho.com/images/marketing/1661417516766.png" alt="Meesho Logo" width="200" />
  <h1>Meesho E-Commerce Clone</h1>
  <p>A fully functional, high-performance clone of the popular Indian e-commerce platform Meesho. Built with modern web technologies focusing on UI/UX, animations, and a seamless shopping experience.</p>
</div>

---

## 🚀 Live Demo
*(Insert your live deployment link here, e.g., Vercel or Firebase Hosting URL)*

## 🛠️ Tech Stack
- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS & Custom CSS Modules
- **Animations:** Framer Motion
- **Backend & Database:** Firebase (Authentication & Firestore)
- **Routing:** React Router v6

## ✨ Key Features
- **Animated Splash Screen:** Beautiful introductory splash screen with staggered letter animations.
- **User Authentication:** Secure Login and Sign-up functionality using Firebase Auth.
- **Dynamic Product Catalog:** Categorized product listings (Men, Women, Kids, Electronics, Beauty, etc.) fetching real-time data.
- **Shopping Cart System:** Add, remove, and manage products in the cart with instant price calculations.
- **Checkout Workflow:** Full checkout and address entry forms.
- **Responsive Design:** Fully responsive layout optimized for mobile, tablet, and desktop views.
- **Performance Optimized:** JavaScript chunks manually separated in Vite for lightning-fast loading speeds on slow networks.

## 📦 Installation & Setup

If you want to run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Abirami21j/meesho-clone.git
   cd meesho-clone
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables (Optional):**
   - The project uses Firebase. The standard config is already included in `src/firebase/config.js`, but if you wish to use your own Firebase database, update the keys there.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Build for Production:**
   ```bash
   npm run build
   ```

## 📂 Project Structure
```
meesho-clone/
├── src/
│   ├── assets/        # Images, Logos, and global CSS
│   ├── components/    # Reusable UI components (Navbar, Footer, ProductCards)
│   ├── context/       # React Context Providers (Auth, Cart, Checkout, Data)
│   ├── data/          # Mock product data / Initial seeding data
│   ├── firebase/      # Firebase initialization and config
│   ├── layouts/       # Main layout wrappers
│   ├── pages/         # Full page views (Home, Cart, Profile, ProductDetail)
│   └── routes/        # App routing logic
├── index.html         # Main HTML entry point with SEO optimization
├── vite.config.js     # Vite configuration and chunking
└── tailwind.config.js # Tailwind CSS configuration
```

## 🤝 Contributing
This was developed as a collaborative internship/college team project. 
If you'd like to contribute, feel free to fork the repository and submit a pull request!

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).

---
*Disclaimer: This project is a clone created for educational and portfolio purposes only. All branding and logos belong to the original Meesho company.*