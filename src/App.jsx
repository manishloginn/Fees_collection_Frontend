import { lazy, Suspense, useContext } from 'react';
import './App.css';
import { Flex, Spin, Button } from 'antd'; // Import Button
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { ThemeContext } from './ThemeProvider.jsx'; // Import ThemeContext
// import './index.css';


const Dashboard = lazy(() => import('./component/dashboard/Dashboard.jsx'));
const Login = lazy(() => import('./component/login/adminlogin.jsx'))
const StudentLogin = lazy(() => import('./component/student/studentlogin.jsx'))
const StudentDashboard = lazy(() => import('./component/student/studentDashboard.jsx')) 

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

  return (
    <div className={`app ${theme}`}> 
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
          <Route path="/student/dashboard" element={<LazyLoaderComponent Component={StudentDashboard} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
