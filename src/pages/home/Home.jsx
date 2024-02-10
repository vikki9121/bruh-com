import React, { useContext } from "react";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/HeroSection";
import ProductCard from "../../components/productCard/ProductCard";
import { Link } from "react-router-dom";
import "../home/home.css";
import Category from "../../components/category/Category";

// Functional component for the home page
function Home() {
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  return (
    <Layout>
      {/* Hero section at the top of the page with fade-down animation */}
      <div className="fade-down">
        <HeroSection />
      </div>

      {/* ProductCard component displaying product cards with fade-down animation */}
      {loading ? (
        <div className="spinner">
          <div className="inner-spin"></div>
        </div>
      ) : (
        <div className="fade-down">
          <ProductCard />
        </div>
      )}

      {/* Button to navigate to the "allproducts" page with fade-down animation */}
      <div className="flex justify-center -mt-10 mb-4 fade-down">
        <Link to={"/vjyothi-ecommerce/allproducts"}>
          <button className="text-white text-xl hover:bg-violet-500 transition ease-in-out bg-pink-500 px-10 py-3 m-9 rounded-3xl">
            See more
          </button>
        </Link>
      </div>

      {/* Track component for tracking information with fade-down animation */}
      <div className="fade-down">
        <Category />
      </div>

      {/* Testimonial component (commented out for now) with fade-down animation */}
      {/* <div className="fade-down">
        <Testimonial />
      </div> */}
    </Layout>
  );
}

// Export the component as the default export
export default Home;
