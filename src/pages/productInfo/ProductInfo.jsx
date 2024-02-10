import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/myContext";
import { LuHeart } from "react-icons/lu";
import "../productInfo/productInfo.css";

import {
  addToCart,
  updateQuantityInCart,
  updateCart,
} from "../../redux/cartSlice";
import { addToFavorites, removeFromFavorites } from "../../redux/favoriteSlice";
import { fireDB } from "../../fireabase/FirebaseConfig";

function ProductInfo() {
  const context = useContext(myContext);
  const { loading, setLoading, mode } = context;

  const [products, setProducts] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const params = useParams();

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart) ?? [];
  const favorites = useSelector((state) => state.favorites) ?? [];

  const getProductData = async () => {
    setLoading(true);
    setAddedToCart(false);

    try {
      const productTemp = await getDoc(doc(fireDB, "products", params.id));
      setProducts(productTemp.data());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  const addCart = (product) => {
    const existingProductIndex = cartItems.findIndex(
      (item) => item.title === product.title
    );

    if (existingProductIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingProductIndex].quantity += quantity;
      dispatch(
        updateQuantityInCart({
          id: product.id,
          quantity: updatedCartItems[existingProductIndex].quantity,
        })
      );
      dispatch(updateCart(updatedCartItems));
    } else {
      dispatch(addToCart({ ...product, quantity }));
    }

    toast.success("Added to Cart");
    setAddedToCart(true);
  };

  useEffect(() => {
    if (products) {
      setAddedToCart(cartItems.some((item) => item.title === products.title));
      setQuantity(
        cartItems.find((item) => item.title === products.title)?.quantity || 1
      );
    }
  }, [cartItems, products?.title]);

  useEffect(() => {
    return () => setAddedToCart(false);
  }, []);

  const toggleFavorite = () => {
    if (products) {
      const existingProductIndex = favorites.findIndex(
        (item) => item.id === products.id
      );

      if (existingProductIndex !== -1) {
        dispatch(removeFromFavorites({ ...products }));
        setIsFavorite(false);
      } else {
        dispatch(addToFavorites({ ...products }));
        setIsFavorite(true);
      }
    }
  };

  useEffect(() => {
    if (products) {
      setIsFavorite(favorites.some((item) => item.id === products.id));
    }
  }, [favorites, products?.id]);

  const calculateDiscountedPrice = () => {
    if (products) {
      const originalPrice = parseFloat(products.price);
      const discountPrice =
        originalPrice - (originalPrice * products.discountedPrice) / 100;
      return discountPrice.toFixed(2);
    }
    return "";
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-10 mx-auto">
          {loading ? (
            <div className="spinner">
              <div className="inner-spin"></div>
            </div>
          ) : (
            products && (
              <div className="lg:w-4/5 mx-auto flex flex-wrap fade-down">
                <img
                  alt="ecommerce"
                  className="lg:w-1/3 w-full lg:h-auto object-cover object-top rounded"
                  src={products.imageUrl}
                />
                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                  <h2
                    className="text-sm title-font text-gray-500 tracking-widest"
                    style={{ color: mode === "dark" ? "wheat" : "" }}
                  >
                    SAREE NAME
                  </h2>
                  <h1
                    className="text-gray-900 text-3xl title-font font-medium mb-1"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    {products.title}
                  </h1>
                  <p
                    className="leading-relaxed border-b-2 mb-5 pb-5"
                    style={{ color: mode === "dark" ? "gray" : "" }}
                  >
                    {products.description}
                  </p>

                  <div className="flex items-center pb-5">
                    <button
                      onClick={() =>
                        setQuantity((prev) => Math.max(prev - 1, 1))
                      }
                      className="w-10 h-10 bg-white p-0 border-2 border-gray-300 inline-flex items-center justify-center text-gray-500 ml-1 hover:bg-gray-300"
                      style={{
                        backgroundColor: mode === "dark" ? "#282c34" : "",
                        color: mode === "dark" ? "white" : "",
                        borderColor: mode === "dark" ? "gray" : "",
                      }}
                    >
                      <span className="text-lg">-</span>
                    </button>
                    <span
                      className="px-3 py-2 text-lg border-2 w-10 h-10 inline-flex items-center justify-center border-gray-300"
                      style={{
                        backgroundColor: mode === "dark" ? "#282c34" : "",
                        color: mode === "dark" ? "white" : "",
                        borderColor: mode === "dark" ? "gray" : "",
                      }}
                    >
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity((prev) =>
                          Math.min(prev + 1, products.stocks || 1)
                        )
                      }
                      className="w-10 h-10 bg-white p-0 border-2 border-gray-300 inline-flex items-center justify-center text-gray-500 hover:bg-gray-300"
                      style={{
                        backgroundColor: mode === "dark" ? "#282c34" : "",
                        color: mode === "dark" ? "white" : "",
                        borderColor: mode === "dark" ? "gray" : "",
                      }}
                    >
                      <span className="text-lg">+</span>
                    </button>
                  </div>

                  <div className="ml-1 pb-5">
                    <span className="font-medium text-xl text-gray-500">
                      In stock:{" "}
                      {products.stocks ? Math.max(0, products.stocks - quantity) : ""}
                    </span>
                  </div>

                  <div className="flex">
                    <span className="title-font font-bold text-2xl text-red-500 ml-0">
                      ₹{calculateDiscountedPrice()}
                      <span className="line-through text-xl font-normal text-gray-500 ml-3">
                        ₹{products.price}
                      </span>
                    </span>
                          {addedToCart &&
                          cartItems.some(
                            (item) => item.title === products.title
                          ) ? (
                            <Link
                              to="/vjyothi-ecommerce/cart"
                              className="flex ml-auto text-white border-0 bg-gray-500 py-2 px-4 focus:outline-none rounded hover:bg-violet-800"
                            >
                              View In Cart
                            </Link>
                          ) : (
                            <button
                              onClick={() => {
                                addCart(products);
                              }}
                              disabled={products.stocks == 0}
                              className={`flex ml-auto text-white border-0 ${
                                products.stocks == 0
                                  ? "bg-red-500"
                                  : "bg-violet-500"
                              } py-2 px-4 focus:outline-none rounded hover:bg-gray-700`}
                            >
                              {products.stocks == 0
                                ? "Out of Stock"
                                : "Add To Cart"}
                            </button>
                          )}
                          <button
                            onClick={toggleFavorite}
                            className={`rounded-full w-10 h-10 p-0 border-0 inline-flex items-center justify-center ml-2 ${
                              isFavorite ? "bg-red-500" : "bg-gray-400"
                            }`}
                          >
                            <LuHeart
                              fill={isFavorite ? "white" : "white"}
                              className="w-10 h-7"
                              strokeWidth={isFavorite ? "white" : "gray"}
                              stroke={isFavorite ? "white" : "gray"}
                            />
                          </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </section>
    </Layout>
  );
}

export default ProductInfo;
