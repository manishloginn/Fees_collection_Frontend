import React, { useContext, useEffect, useState } from 'react';
import './dashboard.css';
import { ThemeContext } from '../../ThemeProvider';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import Endpoints from '../../endPoint';
import { Flex, message, notification, Spin, Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);

  const [loader, setLoader] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterData, setFilterData] = useState({
    orderId: '',
    date: '',
    statusFilter: '',
    instituteFilter: '',
  });


  console.log(filteredData)

  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1);    
  const [pageSize, setPageSize] = useState(10);       

  const allStatus = [...new Set(apiData.map((item) => item.statuses[0].status))];
  const allInstitutes = [...new Set(apiData.map((item) => item.school_id.name))];

  // Fetch API Data with Pagination
  useEffect(() => {
    const fetchApi = async () => {
      try {
        setLoader(true);
        const response = await axios.get(Endpoints.getDashboardData, {
          params: {
            page: currentPage,
            pageSize,
          },
        });
        if (response.status === 200) {
          setLoader(false);
          notification.success({
            message: 'Data loaded successfully',
          });
          const data = response.data.data;
          setApiData(data);
          setFilteredData(data);
          setTotalPages(response.data.pagination.totalPages); 
        }
      } catch (error) {
        setLoader(false);
        notification.error({
          message: error.message,
        });
      }
    };
    fetchApi();
  }, [currentPage, pageSize]);

  useEffect(() => {
    const applyFilters = () => {
      const { orderId, date, statusFilter, instituteFilter } = filterData;

      const filtered = apiData.filter((item) => {
        const matchesOrderId = orderId
          ? item._id.toLowerCase().includes(orderId.toLowerCase())
          : true;
        const matchesDate = date
          ? new Date(item.trustee_id.createdAt).toISOString().split('T')[0] === date
          : true;
        const matchesStatus = statusFilter
          ? item.statuses[0].status.toLowerCase() === statusFilter.toLowerCase()
          : true;
        const matchesInstitute = instituteFilter
          ? item.school_id.name.toLowerCase().includes(instituteFilter.toLowerCase())
          : true;

        return matchesOrderId && matchesDate && matchesStatus && matchesInstitute;
      });

      setFilteredData(filtered);
    };

    applyFilters();
  }, [filterData, apiData, loader]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const navigate = useNavigate()

  const handleStatusChange = ({ id, newStatus}) => {
    setFilteredData((prevFilteredData) =>
      prevFilteredData.map((item) => {
        if (item.statuses[0]._id === id) {
          const updatedStatuses = [...item.statuses];
          updatedStatuses[0].status = newStatus;
          return { ...item, statuses: updatedStatuses };
        }
        return item;
      })
    );
    changeStatusInDatabase({ id, newStatus });  
  };

  const changeStatusInDatabase = async ({id, newStatus}) => {
    try {
      setLoader(true)
      const response = await axios.post(Endpoints.changeStatus, 
        {id:id, status:newStatus}, 
        {withCredentials:true}
      )
      if(response.status === 200 ){
        notification.success({
          message:response.data.message
        })
        setLoader(false)
      }
    } catch (error) {
      setLoader(false);
      notification.warning({
        message:error.message
      })
      // navigate('/admin/login')
    }
  }

  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
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
    <div className="flex justify-center align-middle flex-col">
      <div className={`topInputcontainer ${theme}`}>
        <div className="top-input">
          <input
            className="h-7 rounded-50 py-0 px-10 border-0 outline-none bg-transparent"
            name="orderId"
            onChange={handleChange}
            value={filterData.orderId}
            type="text"
            placeholder="Search(OrderId...)"
          />{' '}
          |
          <SearchOutlined />
        </div>
        <div className="second-input h-7 flex gap-2">
          <input
            className="bg-transparent border-solid border-2 border-indigo-600 h-7"
            type="date"
            name="date"
            onChange={handleChange}
            value={filterData.date}
          />

          <select
            onChange={handleChange}
            name="statusFilter"
            className={`bg-transparent border-solid border-2 border-indigo-600 h-7 ${theme}`}
            value={filterData.statusFilter}
          >
            <option value="">Select Status</option>
            {allStatus.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>

          <select
            onChange={handleChange}
            name="instituteFilter"
            className={`bg-transparent border-solid border-2 border-indigo-600 h-7 ${theme}`}
            value={filterData.instituteFilter}
          >
            <option value="">Select Institute</option>
            {allInstitutes.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="containerrr">
        {filteredData && filteredData.length > 0 ? (
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
              {filteredData.map((value, index) => (
                <tr key={index} className={theme}>
                  {/* {console.log(pageSize)} */}
                  <td>{index + 1 }</td>
                  <td>{value.school_id.name}</td>
                  <td>{new Date(value.trustee_id.createdAt).toLocaleString()}</td>
                  <td>{value._id}</td>
                  <td>{value.order_amount}</td>
                  <td>{value.statuses[0].transaction_amount}</td>
                  <td>{value.statuses[0].payment_method}</td>
                  <td>
                    <div className="status-container">
                      <span
                        style={{
                          color:
                            value.statuses[0].status === 'Success'
                              ? 'green'
                              : value.statuses[0].status === 'Pending'
                              ? 'yellow'
                              : value.statuses[0].status === 'Decline'
                              ? 'red'
                              : 'black',
                        }}
                      >
                        {value.statuses[0].status}
                      </span>
                      <div className="status-options">
                        <button onClick={() => handleStatusChange({ id: value.statuses[0]._id, newStatus: 'Success' })}>
                          Success
                        </button>
                        <button onClick={() => handleStatusChange({ id: value.statuses[0]._id, newStatus: 'Pending' })}>
                          Pending
                        </button>
                        <button onClick={() => handleStatusChange({ id: value.statuses[0]._id, newStatus: 'Decline' })}>
                          Decline
                        </button>
                      </div>
                    </div>
                  </td>
                  <td>{value.trustee_id.name}</td>
                  <td>{value.trustee_id.phoneNo || 'N/A'}</td>
                  <td>{value.vendorAmount || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h1>No data found</h1>
        )}
      </div>

     
      <Pagination
        current={currentPage}
        total={totalPages * pageSize}  
        pageSize={pageSize}
        onChange={handlePaginationChange}
      />
    </div>
  );
};

export default Dashboard;
