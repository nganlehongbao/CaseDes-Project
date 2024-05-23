import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../service/ProductService";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getUserById } from "../../service/UserService";

const ProductDetail = () => {
  let { id } = useParams();
  const [productDetail, setProductDetail] = useState({});
  const [productFeedbacks, setProductFeedbacks] = useState([]);
  const [activeImg, setActiveImage] = useState("");
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const productData = await getProductById(id);
    console.log(productData);
    setProductDetail(productData);
    setActiveImage(productData.images[0]);
  };

  const createRating = (rating) => {
    var elements = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        elements.push(
          <svg
            className='w-4 h-4 text-yellow-300 ms-1'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 22 20'
          >
            <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
          </svg>
        );
      } else {
        elements.push(
          <svg
            class='w-4 h-4 ms-1 text-gray-300 dark:text-gray-500'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 22 20'
          >
            <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
          </svg>
        );
      }
    }
    return elements;
  };

  return (
    <div className='max-w-7xl mx-auto p-8 pt-0'>
      <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center'>
        <div className='flex flex-col gap-6 lg:w-2/5'>
          <img
            src={activeImg}
            alt=''
            className='w-full h-full aspect-square object-cover rounded-xl'
          />
          <div className='flex flex-row justify-between h-24'>
            {productDetail?.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt=''
                className='w-24 h-24 rounded-md cursor-pointer'
                onClick={() => setActiveImage(image)}
              />
            ))}
          </div>
        </div>
        {/* ABOUT */}
        <div className='flex flex-col gap-4 lg:w-2/4'>
          <div>
            <span className=' text-violet-600 font-semibold'>
              {productDetail.phoneModel}
            </span>
            <h1 className='text-3xl font-bold'>{productDetail.name}</h1>
          </div>
          <p className='text-gray-700'>{productDetail.description}</p>
          <h6 className='text-2xl font-semibold'>
            {productDetail?.price?.amount} {productDetail?.price?.currency}
          </h6>
          <div className='mx-auto flex flex-row items-center gap-12'>
            <div className='flex flex-row items-center'>
              <button
                className='bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl'
                onClick={() => setAmount((prev) => prev - 1)}
                disabled={amount === 1 ? true : false}
              >
                -
              </button>
              <span className='py-4 px-6 rounded-lg'>{amount}</span>
              <button
                className='bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl'
                onClick={() => setAmount((prev) => prev + 1)}
                disabled={amount === productDetail.inventory ? true : false}
              >
                +
              </button>
            </div>
            <button className='bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full'>
              Add to Cart
            </button>
          </div>
          <div className='mx-auto mt-5 flex'>
            <div className='flex'>
              <Icon width='30' icon='akar-icons:heart' />
              <p className='ml-2 mt-1'>Liked ({productDetail.like})</p>
            </div>
            <div className='ml-10 flex text-left'>
              <Icon width='30' icon='ep:sold-out' />
              <p className='ml-2 mt-1'>Sold({productDetail.bought || "0"})</p>
            </div>
          </div>
          <div className='mt-3 p-5 border-2 rounded-md flex'>
            <div className='w-1/3 text-slate-400 flex flex-col items-start gap-2'>
              <p>Brand</p>
              <p>Model</p>
              <p>Material</p>
              <p>Stock</p>
            </div>
            <div className='flex flex-col items-start gap-2'>
              <p>{productDetail.brand}</p>
              <p>{productDetail.phoneModel}</p>
              <p>{productDetail.material}</p>
              <p>{productDetail.inventory}</p>
            </div>
          </div>
          <div>
            <h3>Feedbacks</h3>
            {productFeedbacks?.map((feedback) => (
              <div>
                <img
                  className='mx-auto h-10 w-auto'
                  src={feedback.userImage}
                  alt='Your Company'
                />
                <p>{feedback.userName}</p>
                <p>{feedback.content}</p>
                <div>
                  <div class='flex items-center'>
                    {createRating(feedback.rating)}
                  </div>
                </div>
                <Icon width='30' icon="mdi:like-outline" />
                <p>{feedback.like}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
