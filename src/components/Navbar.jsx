import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { search, setSearch, showSearch, setShowSearch, getCartCount, token, setToken } = useContext(ShopContext);
  const cartCount = getCartCount();
  const location = useLocation();
  const [view, setView] = useState(false);

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setView(true);
    } else {
      setView(false);
    }
  }, [location]);

  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      setToken(savedToken); // Update the context state
      // Optionally, you can verify the token with the server here
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setToken('');
    // Redirect to login or home page after logout
  };

  return (
    <div className="flex items-center justify-between py-2 font-medium bg-white backdrop-blur-sm sticky top-0 z-50">
      <Link to='/'><img src={assets.logo} className="w-16 mx-auto" alt="Logo" /></Link>
      {showSearch && view ? (
        <div className="flex-1 inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-2 mx-6 lg:mx-60 rounded-full">
          <input value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 outline-none bg-inherit text-sm" type="text" placeholder="Search" />
          <img className="w-4 mx-3 cursor-pointer" src={assets.search_icon} alt="Search" />
          <img className="w-4 cursor-pointer" onClick={() => setShowSearch(false)} src={assets.cross_icon} alt="Close Search" />
        </div>
      ) : (
        <ul className="hidden sm:flex gap-5 text-sm text-gray-700 mx-5">
          <NavLink to='/' className="flex flex-col items-center gap-1">
            <p>Home</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to='/collection' className="flex flex-col items-center gap-1">
            <p>Collection</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to='/about' className="flex flex-col items-center gap-1">
            <p>About</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to='/contact' className="flex flex-col items-center gap-1">
            <p>Contact</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </ul>
      )}
      <div className="flex items-center gap-6">
        {!showSearch && view && (
          <img onClick={() => setShowSearch(true)} src={assets.search_icon} className="w-5 cursor-pointer" alt="Search" />
        )}
        <div className="group relative">
          {!token ? (
            <Link to="/login">
              <img src={assets.profile_icon} className="w-5 cursor-pointer" alt="Profile" />
            </Link>
          ) : (
            <>
              <img src={assets.user} className="w-8 h-8 rounded-full cursor-pointer" alt="User Profile" />
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                  <NavLink to={'/profile'}><p className="cursor-pointer hover:text-black">My Profile</p></NavLink>
                  <NavLink to={'/order'}><p className="cursor-pointer hover:text-black">Order</p></NavLink>
                  <p onClick={handleLogout} className="cursor-pointer hover:text-black">Logout</p>
                </div>
              </div>
            </>
          )}
        </div>
        <NavLink to='/favourite' className="relative hidden md:block">
          <img width="30" height="30" src={assets.fav} alt="Favourites" />
        </NavLink>
        <Link to="/cart" className="relative hidden md:block">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
          {cartCount > 0 && (
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {cartCount}
            </p>
          )}
        </Link>
        {!showSearch && (
          <img onClick={() => setVisible(true)} src={assets.menu_icon} className="w-5 cursor-pointer sm:hidden" alt="Menu" />
        )}
      </div>
      {/* Sidebar menu for small screens */}
      <div className={`absolute top-0 right-0 -bottom-350 h-max overflow-auto bg-gray-50 transition-all ${visible ? 'w-2/3 sm:w-1/3' : 'w-0'}`}>
        <div className="flex flex-col text-gray-600">
          <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="Back" />
            <p>Back</p>
          </div>
          <br />
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/">Home</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/collection">Collection</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/contact">Contact</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/about">About</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/favourite">Wishlist</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/cart">Cart</NavLink>
        </div>
        <p className="flex items-center justify-center pt-64 py-4">FashionFusion&copy;2024</p>
      </div>
    </div>
  );
};

export default Navbar;
