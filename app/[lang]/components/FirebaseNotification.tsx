// import { getMessaging } from "firebase/messaging/sw";
// import { getToken, getMessaging } from "firebase/messaging";

import firebase, { initializeApp } from "firebase/app";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

const FirebaseNotification = () => {
  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyCMpkEh78GgEUx8tW5KBwvcUdDK0iqXF9M",
      authDomain: "icapps-notification.firebaseapp.com",
      projectId: "icapps-notification",
      storageBucket: "icapps-notification.appspot.com",
      messagingSenderId: "104097315441",
      appId: "1:104097315441:web:05e767409891112e9379d0",
      measurementId: "G-XR875G6CS1",
    };
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    const requestPermission = async () => {
      try {
        console.log("Requesting permission for notifications...");
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
          console.log("Notification User Permission Granted");
          const currentToken = await getToken(messaging);

          if (currentToken) {
            console.log("Token:", currentToken);
          } else {
            console.log(
              "No registration token available. Request permission to generate one."
            );
          }
        } else {
          console.log("User Permission Denied");
        }
      } catch (error) {
        console.error("An error occurred while requesting permission:", error);
      }
    };

    requestPermission();
  }, []);

  return (
    <>
      <Toaster />
    </>
  );
};

export default FirebaseNotification;
