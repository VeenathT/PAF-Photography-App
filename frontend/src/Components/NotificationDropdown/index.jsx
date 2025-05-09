import React, { useEffect } from "react";
import { Bell } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotificationsByUserId,
  updateNotificationsById,
} from "../../app/actions/notification.action";
import { CiSquareRemove } from "react-icons/ci";
import { AiOutlineNotification } from "react-icons/ai";

function NotificationDropdown() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);
  const notifications = useSelector((state) => state.notification.notifications);

  useEffect(() => {
    if (userId) {
      dispatch(getNotificationsByUserId(userId));
    }
  }, [dispatch, userId]);

  const handleOnRead = (id) => {
    const updateNotification = {
      id,
      isRead: true,
    };
    dispatch(updateNotificationsById(updateNotification));
  };

  return (
    <>
      <a
        className="nav-link position-relative"
        href="#"
        id="notification-dropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <Bell size={20} className="text-light" />
        {notifications && notifications.length > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {notifications.length}
          </span>
        )}
      </a>

      <ul
        className="dropdown-menu dropdown-menu-end shadow-sm"
        aria-labelledby="notification-dropdown"
        style={{ minWidth: "280px" }}
      >
        {notifications && notifications.length ? (
          [...notifications]
            .reverse()
            .slice(-5)
            .map((notification) => (
              <li key={notification.id} className="px-2 py-2 border-bottom">
                <div className="d-flex justify-content-between align-items-start">
                  <div className="text-dark">
                    <AiOutlineNotification className="me-2 text-primary" />
                    <span>{notification.message}</span>
                  </div>
                  <CiSquareRemove
                    size={20}
                    className="text-danger cursor-pointer"
                    onClick={() => handleOnRead(notification.id)}
                    title="Mark as read"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </li>
            ))
        ) : (
          <li className="px-3 py-2 text-muted">No Notifications yet</li>
        )}
      </ul>
    </>
  );
}

export default NotificationDropdown;
