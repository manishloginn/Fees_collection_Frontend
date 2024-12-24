import React, { useState } from 'react'
import Endpoints from '../../endPoint';
import axios from 'axios';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';

const studentsignup = () => {

    const [formData, setFormData] = useState({
        student_id: "",
        name: "",
        school_id: "",
        email: "",
        password: "",
      });

      const [message, setMessage] = useState("");

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const navigate = useNavigate()
      const handleSubmit = async (e) => {
        console.log('hit')
        e.preventDefault();
        console.log(formData)
        try {
          const response = await axios.post(Endpoints.studentRegistration, formData);
          setMessage(response.data.message);
          console.log(response.data)
          if(response.status === 200){
            notification.success({
                message:response.data.message
            })
            navigate('/student/login')
          }

        } catch (error) {
          setMessage(error.response?.data?.message || "An error occurred");
        }
      };
        

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Student Signup</h2>
        {message && <p className="text-center text-sm mb-4 text-red-500">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="student_id" className="block text-sm font-medium text-gray-700">
              Student ID
            </label>
            <input
              type="text"
              id="student_id"
              name="student_id"
              value={formData.student_id}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your student ID"
              required
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label htmlFor="school_id" className="block text-sm font-medium text-gray-700">
              School ID
            </label>
            <input
              type="text"
              id="school_id"
              name="school_id"
              value={formData.school_id}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your school ID"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}

export default studentsignup
