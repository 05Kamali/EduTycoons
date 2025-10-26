<<<<<<< HEAD
import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';
import { 
  FiHome, 
  FiBriefcase, 
  FiUser, 
  FiTrendingUp, 
  FiFileText, 
  FiLogOut,
  FiMenu,
  FiX,
  FiMessageCircle,
  FiBookOpen
} from 'react-icons/fi';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f8fafc;
`;

const Sidebar = styled.aside`
  width: 250px;
  background: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  position: fixed;
  height: 100vh;
  left: ${props => props.isOpen ? '0' : '-250px'};
  transition: left 0.3s ease;
  z-index: 1000;
  
  @media (min-width: 768px) {
    position: relative;
    left: 0;
  }
`;

const SidebarHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  
  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1a202c;
    margin: 0;
  }
  
  p {
    color: #6b7280;
    font-size: 0.875rem;
    margin: 0.25rem 0 0 0;
  }
`;

const SidebarContent = styled.div`
  padding: 1rem 0;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: ${props => props.active ? '#3b82f6' : '#6b7280'};
  background-color: ${props => props.active ? '#eff6ff' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;
  border-left: ${props => props.active ? '3px solid #3b82f6' : '3px solid transparent'};
  
  &:hover {
    background-color: #f9fafb;
    color: #374151;
  }
  
  svg {
    margin-right: 0.75rem;
    font-size: 1.125rem;
  }
  
  span {
    font-weight: 500;
  }
`;

const UserInfo = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  margin-top: auto;
`;

const UserDetails = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    margin-right: 0.75rem;
  }
  
  .user-info {
    flex: 1;
    
    .name {
      font-weight: 600;
      color: #1a202c;
      font-size: 0.875rem;
    }
    
    .role {
      color: #6b7280;
      font-size: 0.75rem;
      text-transform: capitalize;
    }
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #fee2e2;
  }
  
  svg {
    margin-right: 0.5rem;
  }
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 0;
  
  @media (min-width: 768px) {
    margin-left: 250px;
  }
`;

const TopBar = styled.div`
  background: white;
  padding: 1rem 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const ContentArea = styled.div`
  padding: 1.5rem;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${props => props.show ? 'block' : 'none'};
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/jobs', icon: FiBriefcase, label: 'Jobs' },
    { path: '/profile', icon: FiUser, label: 'Profile' },
    { path: '/placements', icon: FiTrendingUp, label: 'Placements' },
    { path: '/applications', icon: FiFileText, label: 'Applications' },
  ];

  // Add AI features for job seekers
  if (user?.role === 'jobseeker') {
    navigationItems.push(
      { path: '/ai-tutor', icon: FiBookOpen, label: 'AI Tutor' },
      { path: '/ai-chatbot', icon: FiMessageCircle, label: 'AI Helpline' }
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavClick = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <LayoutContainer>
      <Overlay show={sidebarOpen} onClick={() => setSidebarOpen(false)} />
      
      <Sidebar isOpen={sidebarOpen}>
        <SidebarHeader>
          <h2>EduTycoons</h2>
          <p>Career Portal</p>
        </SidebarHeader>
        
        <SidebarContent>
          {navigationItems.map((item) => (
            <NavItem
              key={item.path}
              active={location.pathname === item.path}
              onClick={() => handleNavClick(item.path)}
            >
              <item.icon />
              <span>{item.label}</span>
            </NavItem>
          ))}
        </SidebarContent>
        
        <UserInfo>
          <UserDetails>
            <div className="avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <div className="name">{user?.name}</div>
              <div className="role">{user?.role}</div>
            </div>
          </UserDetails>
          
          <LogoutButton onClick={handleLogout}>
            <FiLogOut />
            Logout
          </LogoutButton>
        </UserInfo>
      </Sidebar>
      
      <MainContent>
        <TopBar>
          <MobileMenuButton onClick={() => setSidebarOpen(true)}>
            <FiMenu size={24} />
          </MobileMenuButton>
          
          <div>
            <h3 style={{ margin: 0, color: '#1a202c' }}>
              Welcome back, {user?.name}!
            </h3>
          </div>
        </TopBar>
        
        <ContentArea>
          <Outlet />
        </ContentArea>
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout;
=======
import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';
import { 
  FiHome, 
  FiBriefcase, 
  FiUser, 
  FiTrendingUp, 
  FiFileText, 
  FiLogOut,
  FiMenu,
  FiX,
  FiMessageCircle,
  FiBookOpen
} from 'react-icons/fi';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f8fafc;
`;

const Sidebar = styled.aside`
  width: 250px;
  background: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  position: fixed;
  height: 100vh;
  left: ${props => props.isOpen ? '0' : '-250px'};
  transition: left 0.3s ease;
  z-index: 1000;
  
  @media (min-width: 768px) {
    position: relative;
    left: 0;
  }
`;

const SidebarHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  
  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1a202c;
    margin: 0;
  }
  
  p {
    color: #6b7280;
    font-size: 0.875rem;
    margin: 0.25rem 0 0 0;
  }
`;

const SidebarContent = styled.div`
  padding: 1rem 0;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: ${props => props.active ? '#3b82f6' : '#6b7280'};
  background-color: ${props => props.active ? '#eff6ff' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;
  border-left: ${props => props.active ? '3px solid #3b82f6' : '3px solid transparent'};
  
  &:hover {
    background-color: #f9fafb;
    color: #374151;
  }
  
  svg {
    margin-right: 0.75rem;
    font-size: 1.125rem;
  }
  
  span {
    font-weight: 500;
  }
`;

const UserInfo = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  margin-top: auto;
`;

const UserDetails = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    margin-right: 0.75rem;
  }
  
  .user-info {
    flex: 1;
    
    .name {
      font-weight: 600;
      color: #1a202c;
      font-size: 0.875rem;
    }
    
    .role {
      color: #6b7280;
      font-size: 0.75rem;
      text-transform: capitalize;
    }
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #fee2e2;
  }
  
  svg {
    margin-right: 0.5rem;
  }
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 0;
  
  @media (min-width: 768px) {
    margin-left: 250px;
  }
`;

const TopBar = styled.div`
  background: white;
  padding: 1rem 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const ContentArea = styled.div`
  padding: 1.5rem;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${props => props.show ? 'block' : 'none'};
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/jobs', icon: FiBriefcase, label: 'Jobs' },
    { path: '/profile', icon: FiUser, label: 'Profile' },
    { path: '/placements', icon: FiTrendingUp, label: 'Placements' },
    { path: '/applications', icon: FiFileText, label: 'Applications' },
  ];

  // Add AI features for job seekers
  if (user?.role === 'jobseeker') {
    navigationItems.push(
      { path: '/ai-tutor', icon: FiBookOpen, label: 'AI Tutor' },
      { path: '/ai-chatbot', icon: FiMessageCircle, label: 'AI Helpline' }
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavClick = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <LayoutContainer>
      <Overlay show={sidebarOpen} onClick={() => setSidebarOpen(false)} />
      
      <Sidebar isOpen={sidebarOpen}>
        <SidebarHeader>
          <h2>EduTycoons</h2>
          <p>Career Portal</p>
        </SidebarHeader>
        
        <SidebarContent>
          {navigationItems.map((item) => (
            <NavItem
              key={item.path}
              active={location.pathname === item.path}
              onClick={() => handleNavClick(item.path)}
            >
              <item.icon />
              <span>{item.label}</span>
            </NavItem>
          ))}
        </SidebarContent>
        
        <UserInfo>
          <UserDetails>
            <div className="avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <div className="name">{user?.name}</div>
              <div className="role">{user?.role}</div>
            </div>
          </UserDetails>
          
          <LogoutButton onClick={handleLogout}>
            <FiLogOut />
            Logout
          </LogoutButton>
        </UserInfo>
      </Sidebar>
      
      <MainContent>
        <TopBar>
          <MobileMenuButton onClick={() => setSidebarOpen(true)}>
            <FiMenu size={24} />
          </MobileMenuButton>
          
          <div>
            <h3 style={{ margin: 0, color: '#1a202c' }}>
              Welcome back, {user?.name}!
            </h3>
          </div>
        </TopBar>
        
        <ContentArea>
          <Outlet />
        </ContentArea>
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout;
>>>>>>> 6da5be8cee5bf37ced3c94567921457d10bf2dea
