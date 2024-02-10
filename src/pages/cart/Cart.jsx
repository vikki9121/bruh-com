import React, { useContext, useEffect, useState } from "react";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import Modal from "../../components/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../fireabase/FirebaseConfig";
import { updateQuantityInCart } from "../../redux/cartSlice";
import { updateCart } from "../../redux/cartSlice";
import "../cart/cart.css";
import { Link } from "react-router-dom";

function Cart() {
  const context = useContext(myContext)
  const { mode } = context;
  // const [products, setProducts] = useState({});
  // const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart);

  const calculateDiscountedPrice = (price, discountPercentage) => {
    const discountAmount = (price * discountPercentage) / 100;
    return price - discountAmount;
  };

  // console.log(cartItems);

  const CustomTickIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="red" // Change this to the desired color
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Deleted From cart", {
      progressStyle: { backgroundColor: "red" },
      icon: <CustomTickIcon />,
    });
  };

  const updateQuantity = (item, newQuantity) => {
    dispatch(updateQuantityInCart({ id: item.title, quantity: newQuantity }));

    // Update the entire cart in the state
    const updatedCart = cartItems.map((product) => {
      if (product.title === item.title) {
        return { ...product, quantity: newQuantity };
      }
      return product;
    });

    dispatch(updateCart(updatedCart));
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      const discountedPrice = calculateDiscountedPrice(
        cartItem.price,
        cartItem.discountedPrice
      );
      temp = temp + discountedPrice * cartItem.quantity;
    });
    setTotalAmount(temp);
  }, [cartItems]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const shipping = parseInt(100);
  const [funds, setFunds] = useState("50");

  const grandTotal = shipping + totalAmount;
  // console.log(grandTotal)

  /**========================================================================
   *!                           Payment Intigration
   *========================================================================**/

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const buyNow = async () => {
    if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
      return toast.error("All fields are required", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    const totalWithFunds = grandTotal + parseFloat(funds);

    var options = {
      key: "rzp_test_LAWJiTUCIAkkZi",
      key_secret: "ctkhTQRunGcXGI4RJs7ZWfxR",
      amount: parseInt(totalWithFunds * 100),
      currency: "INR",
      order_receipt: "order_rcptid_" + name,
      name: "V Jyothi",
      description: "for testing purpose",
      handler: function (response) {
        console.log(response);
        toast.success("Payment Successful");

        const paymentId = response.razorpay_payment_id;

        const orderInfo = {
          cartItems,
          addressInfo,
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          email: JSON.parse(localStorage.getItem("user")).user.email,
          userid: JSON.parse(localStorage.getItem("user")).user.uid,
          paymentId,
          funds,
        };

        try {
          const orderRef = collection(fireDB, "order");
          addDoc(orderRef, orderInfo);
        } catch (error) {
          console.log(error);
        }
      },

      theme: {
        color: "#3399cc",
      },
    };

    var pay = new window.Razorpay(options);
    pay.open();
  };

  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------

  return (
    <Layout>
      <div
        className="h-auto bg-gray-100 pt-5 mb-[5%] "
        style={{
          backgroundColor: mode === "dark" ? "#282c34" : "white",
          color: mode === "dark" ? "white" : "",
        }}
      >
        <h1 className="mb-10 text-center text-2xl font-bold fade-down">
          Cart Items
        </h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
          <div className="rounded-lg md:w-2/3 fade-down">
            {cartItems.map((item, index) => {
              const {
                title,
                id,
                price,
                discountedPrice,
                description,
                imageUrl,
              } = item;
              const discountPrice = calculateDiscountedPrice(
                price,
                discountedPrice
              );
              return (
                <div
                  className="justify-between mb-6 rounded-lg border  drop-shadow-xl bg-white p-6  sm:flex  sm:justify-start"
                  style={{
                    backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
                    color: mode === "dark" ? "white" : "",
                  }}
                >
                  <img
                    onClick={() =>
                      (window.location.href = `/${id}`)
                    }
                    src={imageUrl}
                    alt="product-image"
                    className="w-full rounded-lg sm:w-40 sm:h-40 cursor-pointer"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2
                        className="text-lg font-bold text-gray-900"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        {title}
                      </h2>
                      <h2
                        className="text-sm  text-gray-900"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        {description}
                      </h2>
                      <p
                        className="mt-3 text-xl font-bold text-pink-700"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        ₹{discountPrice}{" "}
                        <span className="font-normal line-through text-gray-500 text-lg">
                          ₹{price}
                        </span>
                      </p>

                      <button
                        onClick={() => {
                          const newQuantity = Math.max(item.quantity - 1, 1); // Ensure quantity is at least 1
                          updateQuantity(item, newQuantity);
                        }}
                        className="w-10 h-10 bg-white p-0 border-2 border-gray-300 inline-flex items-center justify-center text-gray-500 ml-1 hover:bg-gray-300 mt-5 ml-0"
                      >
                        <span className="text-lg">-</span>
                      </button>

                      <span className="px-3 py-2 text-lg border-2 w-10 h-10 inline-flex items-center justify-center border-gray-300">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => {
                          const newQuantity = Math.min(
                            item.quantity + 1,
                            item.stocks || 1
                          ); // Ensure quantity does not exceed stocks
                          updateQuantity(item, newQuantity);
                        }}
                        className="w-10 h-10 bg-white p-0 border-2 border-gray-300 inline-flex items-center justify-center text-gray-500 hover:bg-gray-300"
                      >
                        <span className="text-lg">+</span>
                      </button>

                      <span className="mt-5 flex font-medium text-xl text-gray-500">
                        In stock:{" "}
                        {item.stocks - item.quantity >= 0
                          ? item.stocks - item.quantity
                          : 0}
                      </span>
                    </div>

                    <div
                      onClick={() => deleteCart(item)}
                      className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 fade-down"
            style={{
              backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
              color: mode === "dark" ? "white" : "",
            }}
          >
            <div className="mb-2 flex justify-between">
              <p
                className="text-gray-700"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Subtotal
              </p>
              <p
                className="text-gray-700"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                ₹{totalAmount}
              </p>
            </div>
            <div className="flex justify-between">
              <p
                className="text-gray-700"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Shipping
              </p>
              <p
                className="text-gray-700 mb-2"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                ₹{shipping}
              </p>
            </div>
            <div className="flex justify-between">
              <p
                className="text-gray-700"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Funds
              </p>
              <p
                className="text-gray-700"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                ₹{funds}
              </p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-3">
              <p
                className="text-lg font-bold"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Total
              </p>
              <div className>
                <p
                  className="mb-1 text-lg font-bold"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  ₹{grandTotal + parseFloat(funds)}
                </p>
              </div>
            </div>
            {/* <Modal  /> */}
            {cartItems.length !== 0 && (
              <Modal
                name={name}
                address={address}
                pincode={pincode}
                phoneNumber={phoneNumber}
                setName={setName}
                setAddress={setAddress}
                setPincode={setPincode}
                setPhoneNumber={setPhoneNumber}
                buyNow={buyNow}
              />
            )}
          </div>
        </div>
        <div className="m-8">
          <div
            className="mt-6 flex-justify-between h-full ml-auto mr-auto rounded-lg border bg-white p-5 shadow-md md:mt-0 md:w-1/3 fade-down"
            style={{
              backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
              color: mode === "dark" ? "white" : "",
            }}
          >
            <p
              className="text-lg font-bold"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              Help Handlooms !
            </p>
            <input
              className="border m-4 border-gray-400 rounded-2xl w-1/8 p-2 pl-4"
              style={{ color: mode === "dark" ? "black" : "" }}
              placeholder="Enter the Amount"
              value={funds}
              onChange={(e) => setFunds(e.target.value)}
            ></input>
            <p
              className="text-lg font-bold"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              Know more about{" "}
              <Link to="/nopage" className="text-pink-700 hover:text-pink-500">
                {" "}
                Handlooms
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
