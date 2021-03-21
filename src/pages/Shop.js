import React, { useEffect, useState } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    setLoading(true);
    loadAllProducts();
  }, []);

  //1. load products by default on shopPage load
  const loadAllProducts = () => {
    getProductsByCount(12).then((prod) => {
      setProducts(prod.data);
      setLoading(false);
    });
  };

  //2. load products on user input
  useEffect(() => {
    // console.log('load products on user input-->',text);
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>SearchFilter Menu</div>
        <div className='col-md-9'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Products</h4>
          )}
          {products.length < 1 && <p>No products found</p>}
          <div className='row pb-5'>
            {products.map((product) => (
              <div key={product._id} className='col-md-4 mt-3'>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
