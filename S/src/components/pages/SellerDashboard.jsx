import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Coins, LogOut, Package, TrendingUp, Settings, 
  Users, ArrowRight, Clock, CheckCircle, Inbox, Menu
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const SellerDashboard = () => {
  const { user, logout } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    addToast('Successfully logged out', 'success');
    navigate('/login');
  };

  const quickActions = [
    { 
      icon: Package, 
      title: 'Active Orders', 
      desc: 'View and manage incoming food orders',
      color: 'seller'
    },
    { 
      icon: Menu, 
      title: 'Menu Management', 
      desc: 'Add, edit or remove menu items',
      color: 'seller'
    },
    { 
      icon: Users, 
      title: 'Token Transactions', 
      desc: 'View all token payments received',
      color: 'seller'
    },
    { 
      icon: Settings, 
      title: 'Shop Settings', 
      desc: 'Configure your shop preferences',
      color: 'seller'
    }
  ];

  const recentOrders = [
    { id: 1, type: 'pending', title: 'Order #5678 - Preparing', time: '5 mins ago', amount: '+45' },
    { id: 2, type: 'success', title: 'Order #5677 - Completed', time: '20 mins ago', amount: '+120' },
    { id: 3, type: 'success', title: 'Order #5676 - Completed', time: '45 mins ago', amount: '+85' }
  ];

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <div className="nav-logo seller">
            <Coins size={24} color="#f59e0b" />
          </div>
          <div>
            <div className="nav-title">{user?.shopName || 'Token Pay'}</div>
            <div className="nav-subtitle">Seller Dashboard</div>
          </div>
        </div>
        
        <div className="nav-actions">
          <div className="nav-user">
            <div className="user-avatar" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <span className="user-name">{user?.name}</span>
              <span className="user-role">{user?.role}</span>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-section">
          <div className="welcome-card seller">
            <div className="welcome-content">
              <div className="welcome-text">
                <h2>Good day, {user?.name?.split(' ')[0]}! 🍽️</h2>
                <p>Here's your business overview for today</p>
              </div>
              <div className="welcome-stats">
                <div className="stat-item">
                  <span className="stat-value">₹{user?.totalSales?.toLocaleString() || 0}</span>
                  <span className="stat-label">Total Sales</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{user?.todayOrders || 0}</span>
                  <span className="stat-label">Today's Orders</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">⭐ {user?.rating || 0}</span>
                  <span className="stat-label">Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section>
          <h3 className="section-title">Quick Actions</h3>
          <div className="actions-grid">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <div key={index} className={`action-card ${action.color}`}>
                  <div className={`action-icon ${action.color}`}>
                    <Icon size={28} />
                  </div>
                  <h3>{action.title}</h3>
                  <p>{action.desc}</p>
                  <div className="action-arrow">
                    <span>Manage</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="activity-section">
          <div className="activity-card">
            <div className="activity-header">
              <h3>Recent Orders</h3>
              <button className="view-all-btn">
                View All
                <ArrowRight size={14} />
              </button>
            </div>
            <div className="activity-list">
              {recentOrders.length > 0 ? (
                recentOrders.map(item => (
                  <div key={item.id} className="activity-item">
                    <div className={`activity-icon ${item.type}`}>
                      {item.type === 'success' ? (
                        <CheckCircle size={20} />
                      ) : (
                        <Clock size={20} />
                      )}
                    </div>
                    <div className="activity-details">
                      <div className="activity-title">{item.title}</div>
                      <div className="activity-time">{item.time}</div>
                    </div>
                    <div className="activity-amount positive">
                      {item.amount} Tokens
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-activity">
                  <Inbox size={48} />
                  <p>No recent orders</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SellerDashboard;