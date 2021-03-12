import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/form/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "",
  brand: "",
};

const ProductUpdate = ({ match }) => {
  //to get slug, can use useParams from react-router-dom or {match} with props (udemy lec.101)
  //we get match from props since entire app is wrapped in browserRouter. json.stringify(props) for more info
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  //router
  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      setValues({ ...values, ...p.data });
    });
  };

  //redux
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col-md-10'>
          <h4>Product Update</h4>
          {JSON.stringify(values)}
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
