import React, { useState,useEffect  } from 'react';
import { toast } from "react-toastify";
import { create_payment } from '../../service/PaymentService';
const Payment = () => {
    const [amount, setAmount] = useState('10000');
    const [bankCode, setBankCode] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    useEffect(() => {
        setBankCode(selectedOption);
    }, [selectedOption]);
    const handleSubmit = async (event) => {
        try {
            setBankCode(selectedOption);
            if (bankCode) {
                console.log(bankCode, amount);
                toast.success("successful");
                const response = await create_payment(amount, bankCode);
                console.log("Response:", response); // Log the response object
                window.location.href = response.data.paymentUrl;
            } else {
                toast.error("Not choose method payment failed");
            }
        } catch (error) {
            console.error('Error creating payment URL:', error);
        }
    };
    return (
        <div className="flex justify-center items-center">
            <div className="py-16 px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto 2xl:container">
                <div className="flex flex-col justify-start items-start w-full space-y-9">
                    <div className="flex flex-col xl:flex-row justify-center  xl:space-x-6 w-full">
                        <div className="p-8 bg-gray-100 flex flex-col lg:w-full xl:w-3/5">
                            <div className="flex flex-row justify-center items-center mt-6">
                                <hr className="border w-full" />
                                <p className="flex flex-shrink-0 px-4 text-base leading-4 text-gray-600">Payment</p>
                                <hr className="border w-full" />
                            </div>
                            <label className="mt-8 text-base leading-1 text-gray-800">Money:  {amount} <span>VND</span></label>
                            <label className="mt-5 text-base leading-4 text-gray-800">Method payment</label>
                            <div className="mt-2 flex-col">
                                <div className="relative">
                                    <select value={selectedOption}  onChange={handleOptionChange} className="mt-1 w-50 px-4 py-2 border rounded-md bg-gray-50 text-gray-600 focus:outline-none focus:border-indigo-500">
                                    <option value="">Choose method payment</option>
                                    <option value="VNPAYQR">VNPAYQR payment gateway</option>
                                    <option value="VNBANK">Payment via ATM-Domestic bank account</option>
                                    <option value="INTCARD">Payment via international card</option>
                                    </select>
                                </div>
                                </div>
                            <div className="mt-2 flex-col flex justify-center items-center">
                                <button onClick={handleSubmit} className="mt-8 w-52 border border-transparent hover:border-gray-300 bg-gray-900 hover:bg-white text-white hover:text-gray-900  items-center py-4 rounded">
                                    Payment
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
