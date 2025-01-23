import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";


const Order = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]); // Correct useState hook

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: {token} });
      console.log(response.data); // Log API response
      if(response.data.success){
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error(error); // Log any errors
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>
      {
        orderData.length > 0 ? (
          orderData.map((item, index) => (
            <div key={index} className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start gap-6 text-sm">
                <img className="w-16 sm:w-20" src={item.image[0]} alt={item.name} />
                <div className="flex flex-col">
                  <p className="text-xs sm:text-lg font-medium">{item.name}</p>
                  <p >{currency}{item.price}</p>
                  <p>Quantity:{item.quantity}</p>
                  <p>Size: {item.size}</p>
                  <p className="mt-1">Date: <span className="text-gray-300">{new Date(item.date).toDateString()}</span></p>
                  <p className="mt-1">payment: <span className="text-gray-300">{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 rounded-full bg-green-500 h-2 w-2"></p>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>
                <button onClick={loadOrderData} className="border px-4 py-2 text-sm font-medium rounded-sm">Track Order</button>
              </div>
            </div>
          ))
        ) : (
          <p>No orders available.</p>
        )
      }
    </div>
  );
};

export default Order;
