import React, { useState } from "react";

export type Notification = {
  id: string;
  message: string;
  read: boolean;
};

interface BellNotificationProps {
  notifications: Notification[];
}

const BellNotification: React.FC<BellNotificationProps> = ({ notifications }) => {
  const [isOpen, setIsOpen] = useState(false); // State to control dialog visibility

  // Toggle the dialog
  const toggleDialog = () => setIsOpen(!isOpen);

  // Mark all notifications as read (optional functionality)
  const markAllAsRead = () => {
    // Logic to mark notifications as read goes here
    console.log("All notifications marked as read");
  };

  return (
    <div className="relative">
      {/* Notification Bell Icon */}
      <button
        className="relative p-2 text-2xl text-gray-500 hover:text-gray-700"
        onClick={toggleDialog}
      >
        🔔
        {notifications.some((notif) => !notif.read) && (
          <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full" />
        )}
      </button>

      {/* Dialog Popup */}
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
          onClick={toggleDialog} // Close dialog on background click
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()} // Prevent background click from closing dialog
          >
            <h2 className="text-lg font-bold mb-4">Notifications</h2>
            <ul className="space-y-2">
              {notifications.map((notif) => (
                <li
                  key={notif.id}
                  className={`p-2 rounded-md ${
                    notif.read ? "bg-gray-100" : "bg-blue-100"
                  }`}
                >
                  {notif.message}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="px-4 py-2 text-sm bg-gray-200 rounded-md hover:bg-gray-300"
                onClick={toggleDialog}
              >
                Close
              </button>
              <button
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={markAllAsRead}
              >
                Mark All as Read
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BellNotification;
