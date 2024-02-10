import React, { useEffect, useState } from "react";
import MyContext from "./myContext";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { fireDB } from "../../fireabase/FirebaseConfig";

function MyStateProvider(props) {
  // State for controlling light/dark mode
  const [mode, setMode] = useState("light");

  // Function to toggle between light and dark mode
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  // State for controlling loading spinner
  const [loading, setLoading] = useState(false);

  // //srihari
  // const storage = new getStorage()

  // State for managing product information
  const [products, setProducts] = useState({
    title: null,
    price: null,
    discountedPrice: null,
    imageUrl: null,
    category: null,
    stocks: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // Function to add a new product
  const addProduct = async () => {
    // Check if all required fields are filled
    if (
      products.title == null ||
      products.price == null ||
      products.discountedPrice == null ||
      products.imageUrl == null ||
      products.category == null ||
      products.stocks == null ||
      products.description == null
    ) {
      return toast.error("All fields are required");
    }

    setLoading(true);

    // //srihari
    // const date =  new Date.getTime()

    try {
      // Add product to the 'products' collection in Firestore
      const productRef = collection(fireDB, "products");
      // const storeFileRef = ref(storage, `${products.title + date}`)
      // const uploadTask = await uploadBytesResumable(storeFileRef, `${products.}` )
      await addDoc(productRef, products);
      
      // Set timeout and redirect to dashboard after successful addition
      setTimeout(() => {
        window.location.href = "/vjyothi-ecommerce/dashboard";
      }, 800);

      // Refresh product data and stop loading spinner
      getProductData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // State for managing product data
  const [product, setProduct] = useState([]);

  // Function to get product data from Firestore
  const getProductData = async () => {
    setLoading(true);

    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));

      // Subscribe to real-time updates on the 'products' collection
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productArray);
        setLoading(false);
      });

      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Fetch product data on component mount
  useEffect(() => {
    getProductData();
  }, []);

  // Function to handle product editing
  const edithandle = (item) => {
    setProducts(item);
  };

  // Function to update a product
  const updateProduct = async () => {
    setLoading(true);
    try {
      // Update product in the 'products' collection
      await setDoc(doc(fireDB, "products", products.id), products);
      toast.success("Product Updated successfully");

      // Set timeout and redirect to dashboard after successful update
      setTimeout(() => {
        window.location.href = "/vjyothi-ecommerce/dashboard";
      }, 800);

      // Refresh product data and stop loading spinner
      getProductData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Function to delete a product
  const deleteProduct = async (item) => {
    setLoading(true);
    try {
      // Delete product from the 'products' collection
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success("Product Deleted successfully");

      // Refresh product data and stop loading spinner
      getProductData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // State for managing order data
  const [order, setOrder] = useState([]);

  // Function to get order data from Firestore
  const getOrderData = async () => {
    setLoading(true);
    try {
      // Fetch order data from the 'order' collection
      const result = await getDocs(collection(fireDB, "order"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      });
      setOrder(ordersArray);
      console.log(ordersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // State for managing user data
  const [user, setUser] = useState([]);

  // Function to get user data from Firestore
  const getUserData = async () => {
    setLoading(true);
    try {
      // Fetch user data from the 'users' collection
      const result = await getDocs(collection(fireDB, "users"));
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false);
      });
      setUser(usersArray);
      console.log(usersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Fetch order and user data on component mount
  useEffect(() => {
    getOrderData();
    getUserData();
  }, []);

  // State for managing search key
  const [searchkey, setSearchkey] = useState("");
  
  // State for managing filter type
  const [filterType, setFilterType] = useState("");
  
  // State for managing filter price
  const [filterPrice, setFilterPrice] = useState("");

  // Context value to be provided to consumers
  const contextValue = {
    mode,
    toggleMode,
    loading,
    setLoading,
    products,
    setProducts,
    addProduct,
    product,
    edithandle,
    updateProduct,
    deleteProduct,
    order,
    user,
    searchkey,
    setSearchkey,
    filterType,
    setFilterType,
    filterPrice,
    setFilterPrice
  };

  return (
    <MyContext.Provider value={contextValue}>
      {props.children}
    </MyContext.Provider>
  );
}

export default MyStateProvider;
