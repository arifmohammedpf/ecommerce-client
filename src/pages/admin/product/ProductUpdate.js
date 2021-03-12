import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/form/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/form/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

const ProductUpdate = ({ match }) => {
  //to get slug, can use useParams from react-router-dom or {match} with props (udemy lec.101)
  //we get match from props since entire app is wrapped in browserRouter. json.stringify(props) for more info
  const [loading, setLoading] = useState(false);

  //router
  const { slug } = match.params;

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
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
