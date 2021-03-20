import React, { useEffect, useState } from "react";
import { getCategory } from "../../functions/category";
import { Link } from "react-router-dom";
import ProductCard from "../../components/cards/ProductCard";

const CategoryHome = ({ match }) => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((res) => {
      //   console.log(JSON.stringify(c.data, null, 4));
      setCategory(res.data.category);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col'>
          {loading ? (
            <h4 className='jumbotron text-center p-3 mt-5 mb-5 '>Loading...</h4>
          ) : (
            <h4 className='jumbotron text-center p-3 mt-5 mb-5'>
              {products.length} Products in "{category.name}" category
            </h4>
          )}
        </div>
      </div>
      <div className='row'>
        {products.map((product) => (
          <div className='col-md-4' key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryHome;
