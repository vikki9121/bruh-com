// Favorites.jsx
import React from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import { Link } from "react-router-dom";

function Favorites() {
  const favorites = useSelector((state) => state.favorites) || [];

  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Your Favourites
            </h1>
            <div className="h-1 w-20 bg-pink-600 rounded"></div>
          </div>
          <div className="flex flex-wrap -m-4">
            {favorites.length === 0 ? (
              <span className="block ml-auto mr-auto text-center mb-60 text-gray-500 font-bold text-2xl mt-60">
                No Favourites List
              </span>
            ) : (
              favorites.map((item) => (
                <div key={item.id} className="lg:w-1/4 md:w-1/2 p-4">
                  <Link to={`/vjyothi-ecommerce/productinfo/${item.id}`}>
                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                      <img
                        className="lg:h-48 md:h-36 w-full object-cover object-top"
                        src={item.imageUrl}
                        alt={item.title}
                      />
                      <div className="p-6">
                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                          V Jyothi
                        </h2>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                          {item.title}
                        </h1>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Favorites;
