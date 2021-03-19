import React from "react";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Laptop from "../images/laptop.jpg";
import ProductListItems from "./cards/ProductListItems";
import StarRating from "react-star-ratings";

const { TabPane } = Tabs;

const SingleProduct = ({ product }) => {
  const { title, images, description, _id } = product;
  return (
    <>
      <div className='col-md-7'>
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((image) => (
                <img src={image.url} key={image.public_id} />
              ))}
          </Carousel>
        ) : (
          <Card cover={<img src={Laptop} className='mb-3 card__image' />} />
        )}

        <Tabs type='card'>
          <TabPane tab='Description' key='1'>
            {description && description}
          </TabPane>
          <TabPane tab='More info' key='2'>
            Call us on xxx xx xxx for more info.
          </TabPane>
        </Tabs>
      </div>
      <div className='col-md-5'>
        <h1 className='bg-info p-3'>{title}</h1>
        <StarRating
          name={_id}
          numberOfStars={5}
          rating={2}
          changeRating={(newRating, name) => {
            console.log(newRating, name);
          }}
          isSelectable={true}
          starRatedColor='red'
        />
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className='text-success' />
              <br />
              Add to cart
            </>,
            <Link to={`/`}>
              <HeartOutlined className='text-info' />
              <br />
              Add to Wishlist
            </Link>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
