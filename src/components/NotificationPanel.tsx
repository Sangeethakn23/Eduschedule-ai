import React from 'react';
import { X, Bell, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const { notifications, markAsRead, clearNotifications } = useNotifications();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      case 'error': return <AlertCircle className="h-5 w-5 text-red-400" />;
      default: return <Info className="h-5 w-5 text-blue-400" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-25 z-50" onClick={onClose} />
      )}

      {/* Panel */}
      <div className={`fixed top-0 right-0 h-full w-96 glass-morphism transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white border-opacity-20">
            <div className="flex items-center">
              <Bell className="h-6 w-6 text-white mr-2" />
              <h2 className="text-lg font-semibold text-white">Notifications</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-white hover:bg-white hover:bg-opacity-10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Actions */}
          <div className="p-4 border-b border-white border-opacity-20">
            <button
              onClick={clearNotifications}
              className="text-sm text-white hover:text-gray-300 transition-colors"
            >
              Clear all notifications
            </button>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="h-12 w-12 text-white text-opacity-40 mx-auto mb-4" />
                <p className="text-white text-opacity-60">No notifications yet</p>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg cursor-pointer transition-all hover-lift ${
                      notification.read 
                        ? 'bg-white bg-opacity-5' 
                        : 'bg-white bg-opacity-10 border border-white border-opacity-20'
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3 mt-1">
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-sm font-medium text-white truncate">
                            {notification.title}
                          </h3>
                          <span className="text-xs text-white text-opacity-60 ml-2">
                            {formatTime(notification.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-white text-opacity-80">
                          {notification.message}
                        </p>
                        {!notification.read && (
                          <div className="mt-2">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              New
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationPanel;