import React, { useContext, useState } from 'react'
import { ThemeContext } from '../../ThemeProvider';
import axios from 'axios';
import Endpoints from '../../endPoint';
import { Flex, message, notification, Spin, Pagination } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const login = () => {

    const { theme } = useContext(ThemeContext);
    const [loader, setloader] = useState(false)
    const navigate = useNavigate()
    

    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setloader(true)
      try {
        const response = await axios.post(
          Endpoints.adminLogin, 
          formData, 
          { withCredentials: true } 
      );
        console.log(response)
        if(response.status === 200){
          setloader(false)
          notification.success({
            message: 'Login successful',
          });
          const { data } = response.data;  
          // Cookies.set('admin', data, { expires: 7 });  
          navigate('/')
        }  
      } catch (error) {
        setloader(false);
      notification.error({
        message: 'Login failed. Please check your credentials.',
        description:error.message
      });
      }
    };
  


    if (loader) {
      return (
        <Flex
          style={{
            display: 'flex',
            width: '100vw',
            height: '10vh',
            justifyContent: 'center',
          }}
          align="center"
          gap="middle"
        >
          <Spin indicator={<LoadingOutlined style={{ fontSize: 70 }} spin />} />
        </Flex>
      );
    }
  
  return (
    <div className={`${theme} flex justify-center items-center min-h-screen` }>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-6 flex items-center justify-between">
           
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default login