import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((c) => {
      setCategories(c.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () =>
    categories.map((c) => (
      <Link
        key={c._id}
        to={`/category/${c.slug}`}
        className='col btn btn-outline-primary btn-lg btn-block btn-raised m-3'
      >
        {c.name}
      </Link>
    ));

  return (
    <div className='container'>
      <div className='row'>
        {loading ? (
          <h3 className='col text-center'>Categories Loading....</h3>
        ) : (
          showCategories()
        )}
      </div>
    </div>
  );
};

export default CategoryList;
