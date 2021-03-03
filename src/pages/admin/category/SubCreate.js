import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getCategories } from "../../../functions/category";
import { createSub, getSub, removeSub } from "../../../functions/sub";
import CategoryForm from "../../../components/form/CategoryForm";
import LocalSearch from "../../../components/form/LocalSearch";

const SubCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  //search filter - step 1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((catg) => setCategories(catg.data));
  };

  const { user } = useSelector((state) => ({ ...state }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is created`);
      })
      .catch((err) => {
        // console.log(err)
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    // let answer = window.confirm('Are you Sure to Delete ?')
    // console.log(answer)
    if (window.confirm("Are you Sure to Delete ?")) {
      setLoading(true);
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} is deleted`);
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  //step 4
  const searched = (keyword) => (catg) =>
    catg.name.toLowerCase().includes(keyword);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Create Sub category</h4>
          )}

          <div className='form-group'>
            <label>Parent Category</label>
            <select
              name='category'
              className='form-control'
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />

          {/* step 2 and step 3 */}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {/* step 5 */}
          {/* {categories.filter(searched(keyword)).map((catg) => (
            <div className='alert alert-secondary' key={catg._id}>
              {catg.name}
              <span
                onClick={() => handleRemove(catg.slug)}
                className='btn btn-sm float-right'
              >
                <DeleteOutlined className='text-danger' />
              </span>
              <Link to={`/admin/category/${catg.slug}`}>
                <span className='btn btn-sm float-right'>
                  <EditOutlined className='text-warning' />
                </span>
              </Link>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default SubCreate;
