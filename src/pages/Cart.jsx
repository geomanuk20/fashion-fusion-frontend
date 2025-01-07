import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { products, currency, cartItems, updateItemQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  const handleQuantityChange = (itemId, size, quantity) => {
    updateItemQuantity(itemId, size, quantity);
  };

  const incrementQuantity = (itemId, size, quantity) => {
    handleQuantityChange(itemId, size, quantity + 1);
  };

  const decrementQuantity = (itemId, size, quantity) => {
    if (quantity > 1) {
      handleQuantityChange(itemId, size, quantity - 1);
    }
  };

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>
      <div>
        {cartData.length > 0 ? (
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);

            if (!productData) return null;

            return (
              <div key={index} className="my-4 border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] text-center gap-4">
                <div className="flex items-start gap-6">
                  <img className="w-16 sm:w-20" src={productData.image[0]} alt={productData.name} />
                  <div className="flex flex-col items-start">
                    <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                    <p className="text-sm">{currency}{productData.price}</p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
                  </div>
                </div>
                <div className="text-sm">
                  <p>QTY</p>
                  <div className="flex items-center">
                    <button
                      className="border w-12 sm:w-10 px-1 sm:px-2 py-1 text-center"
                      onClick={() => decrementQuantity(item._id, item.size, item.quantity)}
                    >-</button>
                    <input
                      readOnly
                      className="border w-12 sm:w-12 px-1 sm:px-2 py-1 text-center"
                      type="number"
                      min={1}
                      value={item.quantity}
                    />
                    <button
                      className="border w-12 sm:w-10 px-1 sm:px-2 py-1 text-center"
                      onClick={() => incrementQuantity(item._id, item.size, item.quantity)}
                    >+</button>
                  </div>
                </div>
                <img className="w-4 mr-4 sm:w-5 cursor-pointer" src={assets.bin_icon} alt="Delete" />
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
      </div>

      {cartData.length > 0 && (
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
            <div className="w-full text-end">
              <button onClick={() => navigate('/place-order')} className="bg-black text-white text-sm my-8 px-8 py-3">PROCEED TO CHECKOUT</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
