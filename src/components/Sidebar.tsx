import React, { useState } from 'react';
import {
  Home,
  BookOpen,
  User,
  Settings,
  Bell,
  Heart,
  Calendar,
  Star,
  Menu,
  X,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { Link } from "react-router-dom";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'from-pink-500 to-rose-400', path: '/' },
    { id: 'education', label: 'Education', icon: BookOpen, color: 'from-orange-400 to-pink-400', path: '/education' },
  ];

  const quickActions = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const stats = [
    { label: 'Health Score', value: '8.5/10', icon: Heart, gradient: 'from-pink-400 to-rose-400' },
    { label: 'Streak Days', value: '12', icon: Calendar, gradient: 'from-rose-400 to-pink-500' },
    { label: 'Products Used', value: '24', icon: Star, gradient: 'from-pink-500 to-orange-400' },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Custom CSS for animations */}
      <style>{`
        @keyframes slideInLeft {
          from { 
            opacity: 0; 
            transform: translateX(-20px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0; 
            transform: scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: scale(1); 
          }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.3s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
        
        .animate-pulse-gentle {
          animation: pulse 2s infinite;
        }
        
        .sidebar-transition {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift {
          transition: all 0.2s ease-out;
        }
        
        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
      `}</style>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 bg-gradient-to-r from-pink-500 to-rose-400 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-gradient-to-b from-pink-50 via-rose-50 to-orange-50 border-r border-pink-100 shadow-2xl z-40 sidebar-transition ${
          isCollapsed ? 'w-20' : 'w-80'
        } ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 animate-slideInLeft`}
      >
        {/* Header */}
        <div className="p-6 border-b border-pink-100 bg-white/50 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="animate-fadeIn">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-pink-500 to-rose-400 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg animate-pulse-gentle">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                      HairCare
                    </h1>
                    <p className="text-sm text-gray-600">Dashboard</p>
                  </div>
                </div>
              </div>
            )}
            <button
              onClick={toggleSidebar}
              className="hidden lg:flex p-2 rounded-lg hover:bg-pink-100 transition-all duration-200 hover:scale-110"
            >
              <ChevronRight className={`w-5 h-5 text-gray-600 sidebar-transition ${isCollapsed ? 'rotate-0' : 'rotate-180'}`} />
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        {!isCollapsed && (
          <div className="p-6 animate-fadeIn">
            <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Quick Stats</h3>
            <div className="space-y-3">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-white/70 backdrop-blur-sm rounded-xl p-4 hover-lift animate-scaleIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`bg-gradient-to-r ${stat.gradient} w-10 h-10 rounded-lg flex items-center justify-center shadow-md`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className="font-bold text-gray-800">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="px-6 py-4">
          <h3 className={`text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide ${isCollapsed ? 'text-center' : ''}`}>
            {isCollapsed ? '•••' : 'Navigation'}
          </h3>
          <nav className="space-y-2">
            {navigationItems.map((item, index) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 hover-lift animate-scaleIn ${
                  activeTab === item.id
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                    : 'text-gray-700 hover:bg-white/70 hover:text-gray-900'
                } ${isCollapsed ? 'justify-center' : ''}`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <item.icon className="w-5 h-5" />
                {!isCollapsed && <span>{item.label}</span>}
                {!isCollapsed && activeTab === item.id && (
                  <div className="ml-auto">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse-gentle" />
                  </div>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Quick Actions */}
        <div className="px-6 py-4 border-t border-pink-100 mt-auto">
          <h3 className={`text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide ${isCollapsed ? 'text-center' : ''}`}>
            {isCollapsed ? '•••' : 'Quick Actions'}
          </h3>
          <div className="space-y-2">
            {quickActions.map((action, index) => (
              <button
                key={action.id}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:bg-white/70 hover:text-gray-900 transition-all duration-300 hover-lift animate-scaleIn ${
                  isCollapsed ? 'justify-center' : ''
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <action.icon className="w-5 h-5" />
                {!isCollapsed && <span>{action.label}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* User Profile */}
        <div className="p-6 border-t border-pink-100 bg-white/30 backdrop-blur-sm">
          <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-400 rounded-xl flex items-center justify-center shadow-lg">
              <User className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <div className="flex-1 animate-fadeIn">
                <p className="font-semibold text-gray-800">Sarah Johnson</p>
                <p className="text-sm text-gray-600">Premium Member</p>
              </div>
            )}
            {!isCollapsed && (
              <button className="p-2 rounded-lg hover:bg-pink-100 transition-all duration-200 hover:scale-110">
                <LogOut className="w-4 h-4 text-gray-600" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Spacer */}
      <div className={`hidden lg:block sidebar-transition ${isCollapsed ? 'w-20' : 'w-80'}`} />
    </>
  );
};

export default Sidebar;