import React, { useContext, useEffect, useState } from 'react';
import './dashboard.css'
import { ThemeContext } from '../../ThemeProvider';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import Endpoints from '../../endPoint';
import { Flex, message, notification, Spin } from 'antd';

const Dashboard = () => {


  const initialData = [
    {
      srNo: 1,
      instituteName: 'high school',
      dateandtime: '12/13/2024 11:30AM',
      orderId: 'jfasdjfladsf',
      orderAmount: '15',
      transitionAmount: '15',
      paymentMethod: 'netbanking',
      Status: 'Success',
      StudentName: 'abhay',
      phoneNo: '8564896454650',
      vendorAmount: 'NA',
    },
    {
      srNo: 2,
      instituteName: 'college A',
      dateandtime: '12/14/2024 12:00PM',
      orderId: 'jfdasjlksd',
      orderAmount: '25',
      transitionAmount: '25',
      paymentMethod: 'credit card',
      Status: 'Pending',
      StudentName: 'john',
      phoneNo: '9876543210',
      vendorAmount: 'NA',
    },
    {
      srNo: 3,
      instituteName: 'college B',
      dateandtime: '12/15/2024 1:00PM',
      orderId: 'alskfjalsk',
      orderAmount: '30',
      transitionAmount: '30',
      paymentMethod: 'debit card',
      Status: 'Decline',
      StudentName: 'mary',
      phoneNo: '8765432109',
      vendorAmount: 'NA',
    },
    {
      srNo: 4,
      instituteName: 'university C',
      dateandtime: '12/16/2024 2:30PM',
      orderId: 'sldkjflsdj',
      orderAmount: '20',
      transitionAmount: '20',
      paymentMethod: 'netbanking',
      Status: 'Success',
      StudentName: 'rohit',
      phoneNo: '9988776655',
      vendorAmount: 'NA',
    },
    {
      srNo: 5,
      instituteName: 'university D',
      dateandtime: '12/17/2024 3:00PM',
      orderId: 'fjdkslfgjs',
      orderAmount: '10',
      transitionAmount: '10',
      paymentMethod: 'paypal',
      Status: 'Pending',
      StudentName: 'sara',
      phoneNo: '9898989898',
      vendorAmount: 'NA',
    },
    {
      srNo: 6,
      instituteName: 'high school',
      dateandtime: '12/18/2024 9:00AM',
      orderId: 'jdsfalkds',
      orderAmount: '12',
      transitionAmount: '12',
      paymentMethod: 'credit card',
      Status: 'Success',
      StudentName: 'alex',
      phoneNo: '9008007006',
      vendorAmount: 'NA',
    },
    {
      srNo: 7,
      instituteName: 'college E',
      dateandtime: '12/19/2024 11:45AM',
      orderId: 'asdljkfalk',
      orderAmount: '40',
      transitionAmount: '40',
      paymentMethod: 'debit card',
      Status: 'Decline',
      StudentName: 'mona',
      phoneNo: '9876543211',
      vendorAmount: 'NA',
    },
    {
      srNo: 8,
      instituteName: 'university F',
      dateandtime: '12/20/2024 4:30PM',
      orderId: 'lsdjkfajsd',
      orderAmount: '50',
      transitionAmount: '50',
      paymentMethod: 'netbanking',
      Status: 'Success',
      StudentName: 'peter',
      phoneNo: '7766554433',
      vendorAmount: 'NA',
    },
    {
      srNo: 9,
      instituteName: 'college G',
      dateandtime: '12/21/2024 5:30PM',
      orderId: 'sdkfjldsjf',
      orderAmount: '18',
      transitionAmount: '18',
      paymentMethod: 'paypal',
      Status: 'Pending',
      StudentName: 'lisa',
      phoneNo: '1234567890',
      vendorAmount: 'NA',
    },
    {
      srNo: 10,
      instituteName: 'high school',
      dateandtime: '12/22/2024 6:00PM',
      orderId: 'aksjdlfkjl',
      orderAmount: '22',
      transitionAmount: '22',
      paymentMethod: 'credit card',
      Status: 'Success',
      StudentName: 'james',
      phoneNo: '8527419630',
      vendorAmount: 'NA',
    },
    // Add more rows if needed...
  ];

  const { theme } = useContext(ThemeContext);
  const [data, setData] = useState(initialData);
  const [loader, setloader] = useState(false)
  const [filterData, SetFilterData] = useState({
    orderId: '',
    date: '',
    statusFilter: '',
    instituteFilter: ""
  })

  const allStatus = [...new Set(initialData.map(item => item.Status))];


  const handleStatusChange = (index, newStatus) => {
    const updatedData = [...data];
    updatedData[index].Status = newStatus;
    setData(updatedData);
  };

  useEffect( () => {

    const fetchApi = async () => {

    
    try {
      setloader(true)
      const responce = await axios.get(Endpoints.getDashboardData)
      if(responce.status === 200){
        setloader(false)
        notification.success({
          message:"data loaded successfull"
        })
      }
    } catch (error) {
      notification.message({
        message:error.message
      })
    }
  }

  fetchApi()
  }, [])


  
  if(loader) return ( 
    <Flex
    style={{ display: 'flex', width: '100vw', height: '10vh', justifyContent: 'center' }}
    align="center"
    gap="middle"
  >
    <Spin indicator={<LoadingOutlined style={{ fontSize: 70 }} spin />} />
  </Flex>
   )






  const handleChange = (e) => {
    const { name, value } = e.target;


    SetFilterData({
      ...filterData,
      [name]: value,
    });

    const filteredData = initialData.filter((item) => {
      return (
        (name === "orderId" ? item.orderId.includes(value) : item.orderId.includes(filterData.orderId)) &&
        (name === "date" ? item.dateandtime.includes(value) : item.dateandtime.includes(filterData.date)) &&
        (name === "statusFilter" ? item.Status.includes(value) : item.Status.includes(filterData.statusFilter)) &&
        (name === 'instituteFilter' ? item.instituteName.includes(value) : item.instituteName.includes(filterData.instituteFilter))
      );
    });
    setData(filteredData);
  };


  const allInstitute = [...new Set(initialData.map((value) => value.instituteName))]



  return (
    <div className='flex justify-center align-middle flex-col '>
      <div className={`topInputcontainer ${theme}`}>
        <div className='top-input'>
          <input
            className="h-7 rounded-50 py-0 px-10 border-0 outline-none bg-transparent"
            name="orderId"
            onChange={handleChange}
            value={filterData.orderId}
            type="text"
            placeholder="Search(OrderId...)"
          /> |
          <select className='bg-transparent' name="filter" id="filter">
            <option value="Filter">Filter By</option>

          </select>
          <SearchOutlined />
        </div>
        <div className='second-input  h-7 flex gap-2 '>
          <input
            className='bg-transparent border-solid border-2 border-indigo-600 h-7'
            type='date'
            name='date'
            onChange={handleChange}
            value={filterData.date} />

          <select onChange={handleChange} name="statusFilter" className={`bg-transparent border-solid border-2 border-indigo-600  h-7  ${theme}`} id="statusFilter">
            <option value="">Select Status</option>
            {allStatus.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>

          <select onChange={handleChange} name="instituteFilter" className={`bg-transparent border-solid border-2 border-indigo-600  h-7  ${theme}`} id="instituteFilter">
            <option value="">Select Institute</option>
            {allInstitute.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>


        </div>

      </div>




      <div className='containerrr'>

        {data && data.length > 0 ? (
          <table border="1" className={theme}>
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Institute Name</th>
                <th>Date & Time</th>
                <th>Order Id</th>
                <th>Order Amt</th>
                <th>Transaction Amt</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Student Name</th>
                <th>Phone No.</th>
                <th>Vendor Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.map((value, index) => (
                <tr key={index} className={theme} >
                  <td>{value.srNo}</td>
                  <td>{value.instituteName}</td>
                  <td>{value.dateandtime}</td>
                  <td>{value.orderId}</td>
                  <td>{value.orderAmount}</td>
                  <td>{value.transitionAmount}</td>
                  <td>{value.paymentMethod}</td>
                  <td>
                    <div className="status-container">
                      <span style={{
                        color:
                          value.Status === "Success" ? "green" :
                            value.Status === 'Pending' ? 'yellow' :
                              value.Status === 'Decline' ? 'red' : 'black'
                      }} >{value.Status}</span>
                      <div className='status-options'>
                        <button onClick={() => handleStatusChange(index, 'Success')}>Success</button>
                        <button onClick={() => handleStatusChange(index, 'Pending')}>Pending</button>
                        <button onClick={() => handleStatusChange(index, 'Decline')}>Decline</button>
                      </div>
                    </div>
                  </td>
                  <td>{value.StudentName}</td>
                  <td>{value.phoneNo}</td>
                  <td>{value.vendorAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h1>No data found</h1>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
