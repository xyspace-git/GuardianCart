import React, { useEffect } from 'react';
import { Spin, Typography } from 'antd'
import { useNavigate } from 'react-router';
import { ROUTES } from '~/resources/routes-constants';

const { Title } = Typography;

const MainSplash: React.FC = () => {
    const navigate = useNavigate();
  
    useEffect(() => {
      const timer = setTimeout(() => {
        navigate(ROUTES.HOMEPAGE_ROUTE);
      }, 5000);
  
      return () => clearTimeout(timer);
    }, [navigate]);
  
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#001529',
        flexDirection: 'column'
      }}>
        <Title level={1} style={{ color: 'white', margin: 0, fontFamily: 'Alata' }}>
          Guardian Cart
        </Title>
      </div>
    );
  };
  
  export default MainSplash