import React, { useContext } from "react";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";

function Order() {
  const userid = JSON.parse(localStorage.getItem("user")).user.uid;
  const context = useContext(myContext);
  const { mode, loading, order } = context;
  const calculateDiscountedPrice = (price, discountedPercentage) => {
    const discountedAmount = (price * discountedPercentage) / 100;
    return price - discountedAmount;
  };

  return (
    <Layout>
      <div className="h-full pt-10">
      <div className="lg:w-1/2 w-full mb-6 lg:mb-10 pl-10">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Your Orders
            </h1>
            <div className="h-1 w-20 bg-pink-600 rounded"></div>
          </div>
        {order.filter((obj) => obj.userid === userid).length === 0 ? (
          <span className="block ml-auto mr-auto text-center mb-60 text-gray-500 font-bold text-2xl mt-60">
            No Orders
          </span>
        ) : (
          <div className="mx-auto justify-center px-6 flex-wrap md:flex md:space-x-6 xl:px-0">
            {order
              .filter((obj) => obj.userid === userid)
              .map((order) => (
                <div className="rounded-lg md:w-2/3" key={order.id}>
                  {order.cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                      style={{
                        backgroundColor: mode === "dark" ? "#282c34" : "",
                        color: mode === "dark" ? "white" : "",
                      }}
                    >
                     <Link to={`/productinfo/${item.id}`}>
                      <img
                        src={item.imageUrl}
                        alt="product-image"
                        className="w-full object-cover rounded-lg sm:w-40"
                      /></Link> 
                      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                        <div className="mt-5 sm:mt-0">
                          <h2
                            className="text-lg font-bold text-gray-900"
                            style={{ color: mode === "dark" ? "white" : "" }}
                          >
                            {item.title}
                          </h2>
                          <p
                            className="mt-1 text-gray-700"
                            style={{ color: mode === "dark" ? "white" : "" }}
                          >
                            {item.description}
                          </p>
                          <p
                            className="mt-1 text-2xl font-bold text-red-400"
                            style={{ color: mode === "dark" ? "white" : "" }}
                          >
                            ₹
                            {calculateDiscountedPrice(
                              item.price,
                              item.discountedPrice
                            )}
                          </p>
                          <p
                            className="mt-1 font-medium text-xl text-gray-700"
                            style={{ color: mode === "dark" ? "white" : "" }}
                          >
                            Quantity : {item.quantity}
                          </p>
                          <p>Ordered On : {order.date}</p>
                          <p className="mt-4 text-green-800">
                            The order will be delivered within 1 to 7 days.
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Order;
