import { lazy, Suspense, useContext } from 'react';
import './App.css';
import { Flex, Spin, Button } from 'antd'; // Import Button
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { ThemeContext } from './ThemeProvider.jsx'; // Import ThemeContext
// import './index.css';


const Dashboard = lazy(() => import('./component/dashboard/Dashboard.jsx'));

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
        <Routes>
          <Route path="/" element={<LazyLoaderComponent Component={Dashboard} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
