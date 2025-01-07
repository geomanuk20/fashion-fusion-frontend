import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Order = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      {
        products.slice(1, 4).map((item, index) => (
          <div key={index} className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-6 text-sm">
              <img className="w-16 sm:w-20" src={item.image[0]} alt={item.name} />
              <div className="flex flex-col">
                <p className="text-xs sm:text-lg font-medium">{item.name}</p>
                <p className="text-lg">{currency}{item.price}</p>
                <p>Quantity: 1</p>
                <p>Size: M</p>
                <p className="mt-2">Date: <span className="text-gray-300">25, Jul, 2024</span></p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 rounded-full bg-green-500 h-2 w-2"></p>
                <p className="text-sm md:text-base">Ready to ship</p>
              </div>
              <button className="border px-4 py-2 text-sm font-medium rounded-sm">Track Order</button>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default Order;
