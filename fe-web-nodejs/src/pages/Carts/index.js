import React from 'react';
const cartData = [
    {
        name: 'Iphone 6S',
        type: 'Apple',
        image: 'https://cdn.tgdd.vn/Products/Images/60/85308/op-lung-iphone-6-6s-plus-nhua-hinh-thu-osmia-tho-t-org-2.jpg',
        quantity: 2,
        price: 400.0,
    },
    {
        name: 'Xiaomi Mi 20000mAh',
        type: 'Xiaomi',
        image: 'https://lzd-img-global.slatic.net/g/p/38e1fa7dccd67bb527e13d3dec47ea60.jpg_400x400q80.jpg_.webp',
        quantity: 1,
        price: 150.0,
    },
    {
        name: 'Samsung Galaxy A12',
        type: 'Samsung',
        image: 'https://cdn.tgdd.vn/Products/Images/60/235267/op-lung-galaxy-a12-nhua-deo-glue-case-meeker-20101--1-600x600.jpg',
        quantity: 1,
        price: 150.0,
    },
];
const oderTotal = {
    subtotal: cartData.reduce((total, data) => total + data.price * data.quantity, 0),
    shipping: 50,
    tax: 60,
};
function Carts() {
    return (
        <div className='container'>
            <a href="/" className="flex font-semibold text-indigo-600 text-sm mt-10">
                <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
                    <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                Continue Shopping
            </a>
            <div className=" mx-auto mt-9 bg-slate-100 ">
                <div className="flex shadow-md my-10 border-4 rounded-lg">
                    <div className="w-3/4 bg-white px-10 py-10 bg-slate-100">
                        <div className="flex justify-center  border-b pb-8">
                            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                        </div>
                        <div className="flex mt-10 mb-5">
                            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
                            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
                            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
                        </div>
                        {cartData.map((cartsdata) => {
                            return (
                                <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5" key={cartsdata.name}>
                                    <div className="flex w-2/5">
                                        <div className="w-20">
                                            <img className="h-20" src={cartsdata.image} alt="" />
                                        </div>
                                        <div className="flex flex-col justify-between ml-4 flex-grow">
                                            <span className="font-bold text-xl">{cartsdata.name}</span>
                                            <span className="text-red-500 text-xl">{cartsdata.type}</span>
                                            <a href="/" className="font-semibold hover:text-red-500 text-gray-500 text-lg">
                                                Remove
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex justify-center w-1/5">
                                        <button>
                                            <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                                                <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                            </svg>
                                        </button>
                                        <input className="mx-2 border text-center w-8" type="text" defaultValue={cartsdata.quantity} />
                                        <button>
                                            <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                                                <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <span className="text-center w-1/5 font-semibold text-sm">{cartsdata.price}</span>
                                    <span className="text-center w-1/5 font-semibold text-sm">${cartsdata.price * cartsdata.quantity}</span>
                                </div>
                            );
                        })}
                    </div>
                    <div id="summary" className="w-1/4 px-8 py-10 bg-slate-200 border-l-4">
                        <div>
                            <p className="text-4xl font-black leading-9 text-gray-800">Order</p>
                            <div className="flex items-center justify-between pt-16">
                                <p className="text-base leading-none text-gray-800">Subtotal</p>
                                <p className="text-base leading-none text-gray-800">${oderTotal.subtotal}</p>
                            </div>
                            <div className="flex items-center justify-between pt-5">
                                <p className="text-base leading-none text-gray-800">Shipping</p>
                                <p className="text-base leading-none text-gray-800">${oderTotal.shipping}</p>
                            </div>
                            <div className="flex items-center justify-between pt-5">
                                <p className="text-base leading-none text-gray-800">Tax</p>
                                <p className="text-base leading-none text-gray-800">${oderTotal.tax}</p>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                                <p className="text-2xl leading-normal text-gray-800">Total</p>
                                <p className="text-2xl font-bold leading-normal text-right text-gray-800">
                                    ${oderTotal.subtotal + oderTotal.shipping + oderTotal.tax}
                                </p>
                            </div>
                        </div>
                        <a href="/payment">
                            <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                                payment
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Carts;
