import React, { useEffect, useState } from "react";
import ProductCard from "../cards/ProductCard";
import SkeletonCard from "../cards/SkeletonCard";
import { getProducts, getProductsCount } from "../../functions/product";
import { Pagination } from "antd";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    //sort,order,limit as paramters for getProducts
    getProducts("sold", "desc", page).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <>
      <div className='container'>
        {loading ? (
          <SkeletonCard count={3} />
        ) : (
          <div className='row'>
            {products.map((product) => (
              <div className='col-md-4' key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='row'>
        <nav className='col-md-4 offset-4 text-center pt-5 p-3'>
          <Pagination
            current={page}
            total={(productsCount / 3) * 10}
            onchange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </>
  );
};

export default BestSellers;
