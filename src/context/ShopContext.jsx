import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 50;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);
  const [hero, setHero] = useState([]);
  const [token,setToken] = useState('')
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error('Select product size');
      return;
    }

    let cartData = JSON.parse(JSON.stringify(cartItems));

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
  };

  const updateItemQuantity = (itemId, size, quantity) => {
    let cartData = JSON.parse(JSON.stringify(cartItems));
    if (cartData[itemId] && cartData[itemId][size]) {
      cartData[itemId][size] = quantity;
      if (quantity <= 0) {
        delete cartData[itemId][size];
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
    }
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        const product = products.find(p => p._id === items);
        if (product) {
          totalAmount += cartItems[items][item] * product.price;
        }
      }
    }
    return totalAmount;
  };

  const addToFavorites = (productId, size) => {
    const product = products.find(item => item._id === productId);
    if (product) {
      setFavorites(prevFavorites => [...prevFavorites, { ...product, size }]);
    }
  };

  const removeFromFavorites = (productId) => {
    setFavorites(prevFavorites => prevFavorites.filter(item => item._id !== productId));
  };

  const getProductData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      console.log(response.data);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Fetch Products Error:", error.response || error.message);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const getAdsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/ads/add`);
      console.log(response.data);
      if (response.data.success) {
        setHero(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Fetch Products Error:", error.response || error.message);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    console.log(cartItems);
    getProductData();
  }, [cartItems]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    getCartAmount,
    updateItemQuantity,
    navigate,
    favorites,
    addToFavorites,
    removeFromFavorites,
    backendUrl,
    token,setToken,
    getAdsData,
    hero
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
