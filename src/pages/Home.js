import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/Home/NewArrivals";
import BestSellers from "../components/Home/BestSellers";
import CategoryList from "../components/category/CategoryList";

const Home = () => {
  return (
    <>
      <div className='jumbotron text-danger h1 font-weight-bold text-center'>
        {/* {loading ? <h4>Loading...</h4> : <h4>All Products</h4>} */}
        <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
      </div>
      <div className='text-center p-3 mt-5 display-3 jumbotron'>
        New Arrivals
      </div>
      <NewArrivals />
      <div className='text-center p-3 mt-5 display-3 jumbotron'>
        Best Sellers
      </div>
      <BestSellers />
      <div className='text-center p-3 mt-5 display-3 jumbotron'>Categories</div>
      <CategoryList />
    </>
  );
};

export default Home;
