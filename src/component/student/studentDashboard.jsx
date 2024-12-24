import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios'; // Assuming you're using axios for API calls
import Endpoints from '../../endPoint';
import { message, notification } from 'antd';
import { useNavigate } from 'react-router-dom';

const studentDashboard = () => {
    const studenttoken = Cookies.get('studentToken');
    const schoolDetail = localStorage.getItem('schoolDetail'); // Ensure it's fetched from localStorage

    const [studentdetail, setStudentDetail] = useState({});
    const [paymentStatus, setPaymentStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    
   
    const generateRandomId = () => `order-${Math.random().toString(36).substr(2, 9)}`;
    
    
    const [paymentData, setPaymentData] = useState({
        school_id: schoolDetail, 
        trustee_id: '',         
        gateway: '',            
        order_amount: '',
        custom_order_id: generateRandomId(),
        status: 'Success',       
        payment_method: '',
        bank_refrence: '',
    });

    
    useEffect(() => {
        const decoded = jwtDecode(studenttoken);
        setStudentDetail(decoded);  

        setPaymentData(prevData => ({
            ...prevData,
            trustee_id: decoded.id  
        }));
    }, [studenttoken]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

       
        if (name === 'payment_method') {
            setPaymentData((prevData) => ({
                ...prevData,
                payment_method: value,
                gateway: value,
            }));
        } else {
            setPaymentData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(paymentData); 

        try {
         
            const response = await axios.post(Endpoints.studentpayment, paymentData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response)

            if (response.status === 201) {
                setPaymentStatus('Payment Success');
                notification.success({
                    message:response.message
                })
       
            } else {
                setPaymentStatus('Payment Failed');
            }
        } catch (error) {
            setPaymentStatus('Payment Failed');
            console.error(error);
            notification.warning({
                message: error.message
            })
        } finally {
            setLoading(false);
            navigate('/')
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Pay Fees</h2>

         
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex justify-between text-lg text-gray-700">
                    <label htmlFor="order_amount" className="mr-4">Order Amount</label>
                    <input
                        type="number"
                        id="order_amount"
                        name="order_amount"
                        value={paymentData.order_amount}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="flex justify-between text-lg text-gray-700">
                    <label htmlFor="payment_method" className="mr-4">Payment Method</label>
                    <select
                        id="payment_method"
                        name="payment_method"
                        value={paymentData.payment_method}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Select Payment Method</option>
                        <option value="upi">UPI</option>
                        <option value="card">Card</option>
                        <option value="netbanking">Net Banking</option>
                        <option value="wallet">Wallet</option>
                    </select>
                </div>

                <div className="flex justify-between text-lg text-gray-700">
                    <label htmlFor="bank_refrence" className="mr-4">Bank Reference</label>
                    <input
                        type="text"
                        id="bank_refrence"
                        name="bank_refrence"
                        value={paymentData.bank_refrence}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Pay Fees"}
                    </button>
                </div>
            </form>

            {paymentStatus && (
                <div className="mt-4 text-center text-lg font-semibold text-gray-700">
                    {paymentStatus}
                </div>
            )}
        </div>
    );
};

export default studentDashboard;
