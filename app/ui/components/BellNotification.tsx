'use client'

import React, { useState, useEffect } from "react";
import { updateRead } from "@/app/api/handler";

interface BellNotificationProps {
  notifications: Notifications[];
}

const BellNotification: React.FC<BellNotificationProps> = ({ notifications }) => {
  const [isOpen, setIsOpen] = useState(false); // State to control dialog visibility
  const [unreadNotifications, setUnreadNotifications] = useState<Notifications[]>(notifications); // Track unread notifications

  useEffect(() => {
    setUnreadNotifications(notifications.filter((notif) => !notif.read)); // Update unread notifications on notifications change
  }, [notifications]);

  // Toggle the dialog
  const toggleDialog = () => setIsOpen(!isOpen);

  // Mark all notifications as read
  const markAllAsRead = () => {
    unreadNotifications.forEach((notif) => {
      updateRead(notif.notification_id);
    });
    setUnreadNotifications([]); // Clear unread notifications after marking as read
    setIsOpen(false); // Close the dialog
    console.log("All unread notifications marked as read");
  };

  return (
    <div className="relative">
      {/* Notifications Bell Icon */}
      <button
        className="relative p-2 text-2xl text-gray-500 hover:text-gray-700"
        onClick={toggleDialog}
      >
        🔔
        {unreadNotifications.length > 0 && (
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
            <h2 className="text-lg font-bold mb-4">Notificaciones</h2>
            <ul className="space-y-2">
            {unreadNotifications.length > 0 ? (
              unreadNotifications.map((notif) => (
                <li key={notif.notification_id} className="p-2 rounded-md bg-blue-100">
                  {notif.message}
                </li>
              ))
            ) : (
              <li className="p-2 text-center text-gray-500">
                No hay mensajes en este momento
              </li>
            )}
            </ul>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="px-4 py-2 text-sm bg-gray-200 rounded-md hover:bg-gray-300"
                onClick={toggleDialog}
              >
                Cerrar
              </button>
              <button
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={markAllAsRead}
              >
                Marcar como Leídos
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BellNotification;
