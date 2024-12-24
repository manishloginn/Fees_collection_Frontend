import { lazy, Suspense, useContext } from 'react';
import './App.css';
import { Flex, Spin, Button, notification } from 'antd'; // Import Button
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { ThemeContext } from './ThemeProvider.jsx'; // Import ThemeContext
import axios from 'axios';
import Endpoints from './endPoint.jsx';
import { saveAs } from 'file-saver';
// import './index.css';




const Dashboard = lazy(() => import('./component/dashboard/Dashboard.jsx'));
const Login = lazy(() => import('./component/login/adminlogin.jsx'))
const StudentLogin = lazy(() => import('./component/student/studentlogin.jsx'))
const StudentDashboard = lazy(() => import('./component/student/studentDashboard.jsx')) 
const StudentSignup = lazy(() => import('./component/student/studentsignup.jsx'))

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Lazy loading wrapper component
  const LazyLoaderComponent = ({ Component }) => {
    return (
      <Suspense
        fallback={
          <Flex
            style={{ display: 'flex', width: '100vw', height: '100vh', justifyContent: 'center' }}
            align="center"
            gap="middle"
          >
            <Spin indicator={<LoadingOutlined style={{ fontSize: 70 }} spin />} />
          </Flex>
        }
      >
        <Component />
      </Suspense>
    );
  };


  const exportData = async () => {
    try {
      const response = await axios.get(Endpoints.getCsvData);
  
      if (response.status === 200) {
        console.log(response.data)
        const data = response.data.requestsdata;
       
        if (data && data.length > 0) {
         
          const headers = Object.keys(data[0]);
  
         
          const csvRows = [];
          csvRows.push(headers.join(',')); 
  
          
          for (const row of data) {
            const values = headers.map((header) => row[header]); 
            csvRows.push(values.join(',')); 
          }
  
          const csvContent = csvRows.join('\n');
          const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
          saveAs(blob, 'collect_request.csv');
        } else {
          console.error('No data available to export.');
        }
      } else {
        console.error('Failed to fetch data with status:', response.status);
      }
    } catch (error) {
      notification.warning({
        message: error.message,
      });
    }
  };
  


  return (
    <div className={`app ${theme} w-full`}> 
     <Button onClick={toggleTheme} style={{ margin: '20px' }}>
        Toggle Theme
      </Button>
      
   
     
    

      <BrowserRouter>
      <Button style={{ margin: '20px' }}>
       <Link to="/"> Dashboard</Link>
      </Button>
      <Button style={{ margin: '20px' }}>
       <Link to="/admin/login"> Admin Login</Link>
      </Button>



      <Button style={{ margin: '20px' }}>
       <Link to="/student/login"> Student Login</Link>
      </Button>
        <Routes>
          <Route path="/" element={<LazyLoaderComponent Component={Dashboard} />} />
          <Route path="/admin/login" element={<LazyLoaderComponent Component={Login} />} />
          <Route path="/student/login" element={<LazyLoaderComponent Component={StudentLogin} />} />
          <Route path="/student/signup" element={<LazyLoaderComponent Component={StudentSignup} />} />
          <Route path="/student/dashboard" element={<LazyLoaderComponent Component={StudentDashboard} />} />
        </Routes>
  
      </BrowserRouter>
      <Button onClick={exportData} className='absolute top-8 right-20' >
        Exports
      </Button>
  
    </div>
  );
}

export default App;
