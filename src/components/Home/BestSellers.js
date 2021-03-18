import React, { useEffect, useState } from "react";
import ProductCard from "../cards/ProductCard";
import SkeletonCard from "../cards/SkeletonCard";
import { getProducts } from "../../functions/product";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    //sort,order,limit as paramters for getProducts
    getProducts("sold", "desc", 3).then((res) => {
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
    </>
  );
};

export default BestSellers;
