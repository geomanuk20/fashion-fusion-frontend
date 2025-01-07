// src/pages/Favorites.js
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';

const Favorites = () => {
  const { favorites, removeFromFavorites } = useContext(ShopContext);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Your Favorites</h1>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6">
          {favorites.map((item, index) => (
            <div key={index} className="border p-4">
              <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
              type={item.type}
            />
              <button onClick={() => removeFromFavorites(item._id)} className="mt-4 bg-red-500 text-white px-3 py-2">Remove</button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No favorite products yet.</p>
      )}
    </div>
  );
};

export default Favorites;
