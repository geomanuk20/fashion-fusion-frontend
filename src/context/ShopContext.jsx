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
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error('Select product size');
      return;
    }
  
    let cartData = structuredClone(cartItems);
  
    if (cartData[itemId]) {
      if(cartData[itemId][size]) {
      cartData[itemId][size] += 1;
    } else {
      cartData[itemId] = 1 ;
    }
    }
    else{
      cartData[itemId] = {}
      cartData[itemId][size] = 1
    }
    console.log('cartData:', cartData);
    setCartItems(cartData);
  
    if(token){
      try {
        await axios.post(backendUrl + '/api/cart/add',{itemId,size},{headers:{token}})

      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
  };
  
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
      if(response.data.success){
        setCartItems(response.data.cartData)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const updateItemQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;
  
    setCartItems(cartData);

    if(token){
      try {
        await axios.post(backendUrl + '/api/cart/update',{itemId,size,quantity},{headers:{token}})
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const addToFavorites = async (itemId) => {
    let favData = structuredClone(favorites);
  
    if (favData[itemId]) {
      favData[itemId] += 1;
    } else {
      favData[itemId] = 1;
    }
    console.log('favData:', favData);
    setFavorites(favData);
  
    if (token) {
      try {
        await axios.post(backendUrl + '/api/favorite/add', { itemId }, { headers: { token } });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };
  
  const getUserFavorites = async (token) => {
    try {
      const response = await axios.post(backendUrl + '/api/favorite/get', {}, { headers: { token } });
      if (response.data.success) {
        setFavorites(response.data.favData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  
  const updateFavoriteQuantity = async (itemId, quantity) => {
    let favData = structuredClone(favorites);
  
    if (quantity === 0) {
      delete favData[itemId];
    } else {
      favData[itemId] = quantity;
    }
  
    setFavorites(favData);
  
    if (token) {
      try {
        await axios.post(backendUrl + '/api/favorite/update', { itemId, quantity }, { headers: { token } });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
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
      const response = await axios.get(`${backendUrl}/api/ads/list`);
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
    getProductData();
  }, [cartItems]);

  useEffect(() => { 
    if (token) { 
      getUserCart(token); 
      getUserFavorites(token); 
      getAdsData(token)
    } 
  }, [token]);

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
    getUserCart,
    getCartCount,
    getCartAmount,
    updateItemQuantity,
    navigate,
    favorites,
    addToFavorites,
    updateFavoriteQuantity,
    backendUrl,
    token, 
    setToken,
    getAdsData,
    hero,
    setCartItems
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
