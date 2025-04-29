import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import { useNavigate } from 'react-router';
import { ROUTES } from '~/resources/routes-constants';

const { Title } = Typography;

const LaunchScreen: React.FC = () => {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    const navtimer = setTimeout(() => {
      navigate(ROUTES.HOMEPAGE_ROUTE);
    }, 4000);

    return () => {
      clearTimeout(navtimer);
      clearTimeout(fadeTimer);
    };
  }, [navigate]);

  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        backgroundColor: 'black',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#001529',
          opacity: fadeOut ? 0 : 1,
          transition: 'opacity 1s ease-in-out',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            color: '#fff',
          }}
        >
          <Title
            level={1}
            style={{
              color: 'white',
              margin: 0,
              fontFamily: 'Silkscreen',
              fontSize: 'clamp(20px, 5vw, 32px)',
              lineHeight: '1.2',
            }}
          >
            XYSPACE NETWORK
          </Title>
          <Title
            level={5}
            style={{
              color: 'white',
              margin: 0,
              marginTop: 8,
              fontFamily: 'Silkscreen',
              fontSize: 'clamp(10px, 3vw, 14px)',
              lineHeight: '1.2',
            }}
          >
            PRESENTS
          </Title>
        </div>
      </div>
    </div>
  );
};

export default LaunchScreen;
