// Import necessary dependencies and components
import React, { useContext, useEffect } from "react";
import Filter from "../../components/filter/Filter";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/myContext";
import "../allproducts/allProducts.css";

function Allproducts() {
  // Accessing context values
  const context = useContext(myContext);
  const { mode, product, searchkey, filterType, filterPrice } = context;
  const { loading, setLoading } = context;

  // Effect to scroll to the top of the window when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Function to calculate discounted price based on the original price and discount percentage
  const calculateDiscountedPrice = (price, discountPercentage) => {
    const discountAmount = (price * discountPercentage) / 100;
    return price - discountAmount;
  };

  // Render component JSX
  return (
    <Layout>
      {/* Display the filter component with fade-down animation */}
      <div className="fade-down">
        <Filter />
      </div>

      {/* Main section for displaying products with fade-down animation */}
      {loading ? (
        <div className="spinner">
          <div className="inner-spin"></div>
        </div>
      ) : (
        <section className="text-gray-600 body-font fade-down">
          <div className="container px-5 py-8 md:py-16 mx-auto">
            <div className="flex flex-wrap -m-4 justify-center">
              {product
                .filter((obj) =>
                  obj.title.toLowerCase().includes(searchkey.toLowerCase())
                )
                .filter(
                  (obj) =>
                    !filterType ||
                    obj.category
                      .toLowerCase()
                      .includes(filterType.toLowerCase())
                )
                .filter(
                  (obj) => !filterPrice || obj.price.includes(filterPrice)
                )
                .reverse( )
                .map((item, index) => {
                  const { title, price, imageUrl, id, discountedPrice } = item;
                  const discountPrice = calculateDiscountedPrice(
                    price,
                    discountedPrice
                  );
                  return (
                    <div
                      onClick={() =>
                        (window.location.href = `/vjyothi-ecommerce/productinfo/${id}`)
                      }
                      key={index}
                      className="p-4 md:w-1/4 drop-shadow-lg"
                    >
                      <div
                        className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
                        style={{
                          backgroundColor:
                            mode === "dark" ? "rgb(46 49 55)" : "",
                          color: mode === "dark" ? "white" : "",
                        }}
                      >
                        <div className="flex justify-center cursor-pointer">
                          <img
                            className="rounded-2xl object-cover object-top w-80 h-80 p-2 hover:scale-110 transition-scale-110 duration-300 ease-in-out"
                            src={imageUrl}
                            alt="product"
                          />
                        </div>
                        <div className="p-5 border-t-2">
                          <h2
                            className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1"
                            style={{ color: mode === "dark" ? "gray" : "" }}
                          >
                            V Jyothi
                          </h2>
                          <h1
                            className="title-font text-xl font-medium text-gray-900 mb-3"
                            style={{ color: mode === "dark" ? "white" : "" }}
                          >
                            {title}
                          </h1>
                          <p
                            className="leading-relaxed mb-3 font-bold text-xl text-pink-500"
                            style={{ color: mode === "dark" ? "rose" : "" }}
                          >
                            ₹{discountPrice}{" "}
                            <span
                              className="line-through text-gray-500 text-lg ml-1 font-normal"
                              style={{ color: mode === "dark" ? "white" : "" }}
                            >
                              ₹{price}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}

// Export the component as the default export
export default Allproducts;
