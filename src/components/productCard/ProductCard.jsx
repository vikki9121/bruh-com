import React, { useContext, useEffect } from "react";
import myContext from "../../context/data/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";

function ProductCard({ item, mode }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Added to cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  
  const calculateDiscountedPrice = (price, discountPercentage) => {
    const discountAmount = (price * discountPercentage) / 100;
    return price - discountAmount;
  };

  // Check if item is defined before accessing its properties
  if (!item) {
    return null; // or handle the case where item is undefined
  }

  const { title, price, imageUrl,discountedPrice } = item;
  const discountPrice = calculateDiscountedPrice(
    price,
    discountedPrice
  );

  return (
    <div className="p-4 md:w-1/4 md:flex-shrink-0 drop-shadow-lg flex items-center justify-center mx-auto my-auto">
      <div
        className="h-full border-2 bg-gray-200 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-100 border-opacity-60 rounded-2xl overflow-hidden"
        style={{
          backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
          color: mode === "dark" ? "white" : "",
        }}
      >
        <div
          onClick={() => (window.location.href = `/vjyothi-ecommerce/productinfo/${item.id}`)}
          className="flex justify-center cursor-pointer"
        >
          <img
            className="rounded-2xl object-cover object-top w-80 h-80 p-2 hover:scale-110 transition-scale-110 duration-300 ease-in-out"
            src={imageUrl}
            alt="blog"
          />
        </div>
        <div className="p-5 border-t-2">
          <h2
            className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            V Jyothi
          </h2>
          <h1
            className="title-font text-lg font-medium text-gray-900 mb-3"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            {title}
          </h1>
          <p
            className="leading-relaxed mb-3 font-bold text-xl text-pink-500"
            style={{ color: mode === "dark" ? "rose" : "" }}
          >
            ₹{discountPrice} <span className="ml-1 text-lg font-normal text-gray-700 line-through"style={{ color: mode === "dark" ? "white" : "" }}>₹{price}</span>
          </p>
          {/* <div className=" flex justify-center">
            <button
              type="button"
              onClick={() => addCart(item)}
              className="focus:outline-none text-white bg-pink-500 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2"
            >
              Add To Cart
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

function Product() {
  const context = useContext(myContext);
  const {
    mode,
    product
  } = context;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 md:py-16 mx-auto">
        <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
          <h1
            className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            Our Latest Collection
          </h1>
          <div className="h-1 w-20 bg-pink-600 rounded"></div>
        </div>

        <div className="flex flex-wrap -m-4">
          {product
            .filter((obj) => obj.title.toLowerCase())
            .reverse()
            .slice(0,4)
            .map((item, index) => (
              <ProductCard key={index} item={item} mode={mode} />
            ))}
        </div>
      </div>
    </section>
  );
}

export default Product;
