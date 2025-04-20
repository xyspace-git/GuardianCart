import React, { useEffect } from 'react';
import { Spin, Typography } from 'antd'
import { useNavigate } from 'react-router';
import { ROUTES } from '~/resources/routes-constants';

const { Title } = Typography;

const LaunchScreen: React.FC = () => {
const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate(ROUTES.HOMEPAGE_ROUTE);
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#001529'
        }}>
            <div style={{
                textAlign: 'center',
                color: '#fff'
            }}>
               
                <Title level={1} style={{ color: 'white', margin: 0, fontFamily: 'Silkscreen' }}>XYSPACE NETWORK</Title>
                <Title level={5} style={{ color: 'white', margin: 0, marginTop: 8, fontFamily: 'Silkscreen' }}>PRESENTS</Title>
                {/*<Title level={1} style={{ color: 'white', margin: 0, marginTop: 20, fontFamily: 'Poppins' }}>Guardian Cart</Title> */}
            </div>
        </div>
    )
}

export default LaunchScreen;