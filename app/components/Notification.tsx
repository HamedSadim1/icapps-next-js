import React, { useState, useEffect } from "react";
import {
  requestPermission,
  onMessageListener,
} from "@/public/firebase-messaging-sw";
import { Toaster } from "react-hot-toast";

// Define a type for the payload object
interface NotificationPayload {
  notification: {
    title: string;
    body: string;
  };
}

const Notification = () => {
  const [notification, setNotification] = useState({ title: "", body: "" });

  useEffect(() => {
    requestPermission();
    const unsubscribe = onMessageListener().then((payload: unknown) => {
      if (payload && typeof payload === "object" && "notification" in payload) {
        const notificationPayload = payload as NotificationPayload;
        setNotification({
          title: notificationPayload.notification.title,
          body: notificationPayload.notification.body,
        });
      }
    });

    return () => {
      unsubscribe.then((error) => console.log(error));
    };
  }, []);

  return (
    <div>
      <Toaster />
    </div>
  );
};

export default Notification;
