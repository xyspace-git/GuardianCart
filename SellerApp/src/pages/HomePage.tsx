import React, { useState } from 'react';
import { Typography, Button, Card } from 'antd';

const { Title } = Typography;

const HomePage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<string>('home'); // 'home', 'latestOrder', etc.

  const renderSection = () => {
    switch (currentSection) {
      case 'latestOrder':
        return (
          <Card>
            <Title level={2}>Latest Order</Title>
            <p>Order ID: 12345</p>
            <p>Customer: John Doe</p>
            <p>Status: Delivered</p>
            <Button type="primary" block>View Details</Button>
          </Card>
        );
      case 'previousReceipt':
        return (
          <Card>
            <Title level={2}>Previous Receipt</Title>
            <p>Receipt ID: 67890</p>
            <p>Amount: $120</p>
            <p>Date: 2023-05-01</p>
            <Button type="primary" block>View Details</Button>
          </Card>
        );
      case 'search':
        return (
          <Card>
            <Title level={2}>Search</Title>
            <input type="text" placeholder="Search Orders" style={{ width: '100%' }} />
          </Card>
        );
      default:
        return (
          <Card>
            <Title level={2}>Welcome to Seller Dashboard</Title>
            <p>Please choose an option to proceed.</p>
          </Card>
        );
    }
  };

  return (
    <div
      style={{
        height: '91vh',
        backgroundColor: '#352F44',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem 1rem',
        boxSizing: 'border-box',
        textAlign: 'center',
      }}
    >
      <div>
        <Title level={1} style={{
          color: '#FAF0E6',
          fontFamily: 'Eagle Lake',
          marginBottom: 0,
          fontSize: 'clamp(24px, 6vw, 36px)',
        }}>
          Guardian Cart
        </Title>
        <Title level={2} style={{
          color: '#FAF0E6',
          fontFamily: 'Poppins',
          marginTop: 8,
          fontSize: 'clamp(18px, 4vw, 28px)',
        }}>
          Seller Dashboard
        </Title>
        <div style={{ marginTop: 150 }}>
          {renderSection()}
        </div>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <Button type="primary" block onClick={() => setCurrentSection('latestOrder')} style={{ marginTop: 8 }}>
          Latest Order
        </Button>
        <Button block onClick={() => setCurrentSection('previousReceipt')} style={{ marginTop: 8 }}>
          Previous Receipt
        </Button>
        <Button block onClick={() => setCurrentSection('search')} style={{ marginTop: 8 }}>
          Search
        </Button>
        <Button danger block onClick={() => setCurrentSection('home')} style={{ marginTop: 8 }}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
