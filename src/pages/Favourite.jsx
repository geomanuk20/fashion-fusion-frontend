import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';

const Favorites = () => {
  const { favorites, updateFavoriteQuantity, products } = useContext(ShopContext);

  const handleRemoveFromFavorites = (productId) => {
    updateFavoriteQuantity(productId, 0); // Set quantity to 0 to remove the item from favorites
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Your Favorites</h1>
      {Object.keys(favorites).length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6">
          {Object.keys(favorites).map((itemId, index) => {
            const product = products.find(p => p._id === itemId);
            return (
              product && (
                <div key={index} className="border p-4">
                  <ProductItem
                    key={index}
                    name={product.name}
                    id={product._id}
                    price={product.price}
                    image={product.image}
                    type={product.type}
                  />
                  <button onClick={() => handleRemoveFromFavorites(product._id)} className="mt-4 bg-red-500 text-white px-3 py-2">
                    Remove
                  </button>
                </div>
              )
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500">No favorite products yet.</p>
      )}
    </div>
  );
};

export default Favorites;
