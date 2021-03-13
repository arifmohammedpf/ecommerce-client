import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import Avatar from "antd/lib/avatar/avatar";
import { Badge } from "antd";

const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    //console.log(e.target.files);
    //resize
    let files = e.target.files;
    let allUploadedFiles = values.images;

    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                {
                  image: uri, //send to server(image-> this name will use to get in controllers. ie. req.body.image)
                },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                console.log("IMAGE UPLOAD RES DATA", res);
                setLoading(false);
                allUploadedFiles.push(res.data);
                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log("CLOUDINARY UPLOAD ERROR", err);
              });
          },
          "base64"
        );
      }
    }
    //send back to server to upload to cloudinary
    //set url to images[] in the parent component - ProductCreate
  };

  const handleImageRemove = (public_id) => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API}/removeimage`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        const { images } = values;
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <div className='row'>
        {values.images &&
          values.images.map((img) => (
            <Badge
              count='X'
              key={img.public_id}
              onClick={() => handleImageRemove(img.public_id)}
              style={{ cursor: "pointer" }}
            >
              <Avatar src={img.url} shape='square' size={100} className='m-3' />
            </Badge>
          ))}
      </div>
      <div className='row'>
        <label className='btn btn-primary btn-raised mt-3'>
          Choose Files
          <input
            type='file'
            multiple
            hidden
            accept='images/*'
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
