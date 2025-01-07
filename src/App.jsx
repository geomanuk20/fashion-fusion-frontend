import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Collection from './pages/Collection.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Product from './pages/Product.jsx';
import Cart from './pages/Cart.jsx';
import PlaceOrder from './pages/PlaceOrder.jsx';
import Order from './pages/Order.jsx';
import Navbar from './components/Navbar.jsx';
import Favourite from './pages/Favourite.jsx';
import Footer from './components/Footer.jsx';
import Profile from './pages/Profile.jsx';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const backendUrl = import.meta.env.VITE_BACKEND_URL
console.log(backendUrl)
const App = () => {
  return (
    <div className="px-2 sm:px-[1vw] md:px-[1vw] lg:px-[5vw]">
      <ToastContainer/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favourite" element={<Favourite/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/order" element={<Order />} />
      </Routes>
      <Footer />
      
    </div>
  );
};

export default App;
