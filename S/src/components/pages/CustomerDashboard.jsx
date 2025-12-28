import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Coins, LogOut, ShoppingBag, History, User, 
  Plus, ArrowRight, Clock, CheckCircle, Inbox
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const CustomerDashboard = () => {
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
      icon: Plus, 
      title: 'Buy Tokens', 
      desc: 'Add tokens to your wallet for quick payments',
      color: 'customer'
    },
    { 
      icon: ShoppingBag, 
      title: 'Place Order', 
      desc: 'Browse menu and order your favorite food',
      color: 'customer'
    },
    { 
      icon: History, 
      title: 'Order History', 
      desc: 'View all your past orders and transactions',
      color: 'customer'
    },
    { 
      icon: User, 
      title: 'My Profile', 
      desc: 'Manage your account settings and preferences',
      color: 'customer'
    }
  ];

  const recentActivity = [
    { id: 1, type: 'success', title: 'Order #1234 completed', time: '2 hours ago', amount: '-50' },
    { id: 2, type: 'info', title: 'Tokens purchased', time: '1 day ago', amount: '+200' },
    { id: 3, type: 'success', title: 'Order #1233 completed', time: '2 days ago', amount: '-75' }
  ];

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <div className="nav-logo customer">
            <Coins size={24} color="#10b981" />
          </div>
          <div>
            <div className="nav-title">Token Pay</div>
            <div className="nav-subtitle">Customer Portal</div>
          </div>
        </div>
        
        <div className="nav-actions">
          <div className="nav-user">
            <div className="user-avatar">
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
          <div className="welcome-card customer">
            <div className="welcome-content">
              <div className="welcome-text">
                <h2>Welcome back, {user?.name?.split(' ')[0]}! 👋</h2>
                <p>Ready to grab something delicious today?</p>
              </div>
              <div className="welcome-stats">
                <div className="stat-item">
                  <span className="stat-value">{user?.tokenBalance || 0}</span>
                  <span className="stat-label">Token Balance</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{user?.totalOrders || 0}</span>
                  <span className="stat-label">Total Orders</span>
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
                    <span>Get Started</span>
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
              <h3>Recent Activity</h3>
              <button className="view-all-btn">
                View All
                <ArrowRight size={14} />
              </button>
            </div>
            <div className="activity-list">
              {recentActivity.length > 0 ? (
                recentActivity.map(item => (
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
                    <div className={`activity-amount ${item.amount.startsWith('+') ? 'positive' : 'negative'}`}>
                      {item.amount} Tokens
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-activity">
                  <Inbox size={48} />
                  <p>No recent activity</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CustomerDashboard;