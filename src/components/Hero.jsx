import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const Hero = () => {
  const { products, hero } = useContext(ShopContext);
  const [ads, setAds] = useState([]);
  
  useEffect(() => {
    console.log(products);  // Check products data
    const bestProduct = products.filter((item) => item.ads);
    setAds(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <div className="flex flex-col sm:flex-row border border-x-gray-400">
      {/*hero left side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
          </div>
          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            Latest Arrivals
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>
        </div>
      </div>
      {/*hero right side */}
      {hero && hero.length > 0 ? (
        hero.map((ad, index) => (
          <img
            className="w-full sm:w-1/2"
            key={index}
            src={ad.ads && ad.ads !== "" ? ad.ads : assets.hero_img}
            alt={ad.name || "default image"}
          />
        ))
      ) : (
        <img
          className="w-full sm:w-1/2"
          src={assets.hero_img}
          alt="default image"
        />
      )}
    </div>
  );
};

export default Hero;
