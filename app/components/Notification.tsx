"use client";
import React, { useState, useEffect } from "react";
// import {
//   requestPermission,
//   onMessageListener,
// } from "@/public/firebase-messaging-sw";
import { Toaster } from "react-hot-toast";
import OneSignal from "react-onesignal";


// interface IOneSignalOneSignal {
// 	Slidedown: IOneSignalSlidedown;
// 	Notifications: IOneSignalNotifications;
// 	Session: IOneSignalSession;
// 	User: IOneSignalUser;
// 	Debug: IOneSignalDebug;
// 	login(externalId: string, jwtToken?: string): Promise<void>;
// 	logout(): Promise<void>;
// 	init(options: IInitObject): Promise<void>;
// 	setConsentGiven(consent: boolean): Promise<void>;
// 	setConsentRequired(requiresConsent: boolean): Promise<void>;
// }

// // // Define a type for the payload object
// interface NotificationPayload {
//   notification: {
//     title: string;
//     body: string;
//   };
// }

// const Notification = () => {
//   const [notification, setNotification] = useState({ title: "", body: "" });

//   useEffect(() => {
//     requestPermission();
//     const unsubscribe = onMessageListener().then((payload: unknown) => {
//       if (payload && typeof payload === "object" && "notification" in payload) {
//         const notificationPayload = payload as NotificationPayload;
//         setNotification({
//           title: notificationPayload.notification.title,
//           body: notificationPayload.notification.body,
//         });
//       }
//     });

//     return () => {
//       unsubscribe.then((error) => console.log(error));
//     };
//   }, []);

//   return (
//     <div>
//       <Toaster />
//     </div>
//   );
// };

// export default Notification;


//   const [notification, setNotification] = useState({ title: "", body: "" });

//   useEffect(() => {
//     OneSignal.init({
//       appId: "439afa83-e31f-46b4-9bcc-3859f0d499c5",
//       notifyButton: {
//         enable: true,
//       },
//       allowLocalhostAsSecureOrigin: true,
//       welcomeNotification: {
//         title: "Welcome!",
//         message: "Thanks for subscribing!",
//       },
//     });
//     // Add a click event listener during component initialization
//     OneSignal.Notifications.addEventListener("click", (event) => {
//       console.log("The notification was clicked!", event);
//     });

//     return () => {
//       // Clean up the event listener when the component is unmounted
//       OneSignal.Notifications.removeEventListener("dismiss", (event) => {
//         console.log("The notification was dismissed", event);
//       });
//     };
//   }, []);

//   return (
//     <div>
//       <Toaster />
//     </div>
//   );
// };
const Notification = () => {
 const [pushNotificationId,setPushNotificationId]=  useState<string>("")
  useEffect(() => {

    const initializeOneSignal = async () => { OneSignal.init({
      appId: "439afa83-e31f-46b4-9bcc-3859f0d499c5",
      notifyButton: {
        enable: true,
      },

      allowLocalhostAsSecureOrigin: true,
      welcomeNotification: {
        title: "Welcome!",
        message: "Thanks for subscribing!",
      },

      
      
      
    });
    const subscriptionId = OneSignal.User?.PushSubscription?.id;

    if (subscriptionId) {
      console.log(subscriptionId);
      setPushNotificationId(subscriptionId);
      // Add any other logic you need with the subscription ID here
    }

    
  
    // Add a click event listener during component initialization
    // const clickHandler = (event:any) => {
    //   console.log("The notification was clicked!", event);
    //   OneSignal.User.PushSubscription.id
    //   OneSignal.init
    // };

    // const dismissHandler = (event:any) => {
    //   console.log("The notification was dismissed", event);
    // };
   

    // OneSignal.Notifications.addEventListener("click", clickHandler);
    // OneSignal.Notifications.addEventListener("dismiss", dismissHandler);
    // // Clean up the event listeners when the component is unmounted
    // return () => {
    //   OneSignal.Notifications.removeEventListener("click", clickHandler);
    //   OneSignal.Notifications.removeEventListener("dismiss", dismissHandler);
    // };
    }
    initializeOneSignal();

  });
  

  const handleNotificationClick = () => {
    OneSignal.User.addTag("Key","Value")
    // OneSignal.Slidedown.promptPush();
    
  OneSignal.Notifications.addEventListener('click', (event) => {
  console.log("The notification was clicked!", event);

  
});
  }

  return (
    <div>
      <button onClick={handleNotificationClick}>Test click</button>
      <h1>{ pushNotificationId ? pushNotificationId :"nothing"}</h1>
    </div>
  );
};

export default Notification;