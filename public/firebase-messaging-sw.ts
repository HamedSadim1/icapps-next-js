// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import firebase from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMpkEh78GgEUx8tW5KBwvcUdDK0iqXF9M",
  authDomain: "icapps-notification.firebaseapp.com",
  projectId: "icapps-notification",
  storageBucket: "icapps-notification.appspot.com",
  messagingSenderId: "104097315441",
  appId: "1:104097315441:web:05e767409891112e9379d0",
  measurementId: "G-XR875G6CS1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestPermission = () => {
  console.log("requestPermission");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification User Permission Granted");

      return getToken(messaging, {
        vapidKey:
          "BB8RmNjPnIcaMUmbgfXzeA3RDmq7EczWlbuC9ixCjHcm0wcUNSlwdHo3Y5dlt6pCKJ_eVhWzF0-BcYt4BDma0EQ",
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log("Token =>", currentToken);
          } else {
            console.log(
              "No registration token available. Request permission to generate one."
            );
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
        });
    } else {
      console.log("User Permission Denied");
    }
  });
};

requestPermission();

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      resolve(payload);
    });
  });

// export const askForPermissioToReceiveNotifications = async () => {
//   try {
//     const messaging = firebase.messaging();
//     await messaging.requestPermission();
//     const token = await messaging.getToken();
//     console.log("token do usuário:", token);

//     return token;
//   } catch (error) {
//     console.error(error);
//   }
// };
