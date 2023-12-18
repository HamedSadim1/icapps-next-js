import OneSignal from "react-onesignal";
import { useCallback, useEffect, useState } from "react";
import useStagairStore from "@/store";

const useOneSignalNotification = () => {
  const pushNotificationId = useStagairStore((s) => s.pushNotificationId);
  const [isInitializedOneSignal, setIsInitializedOneSignal] = useState(false);
  

  const initializeOneSignal = useCallback(async () => {
    // if (isInitializedOneSignal) {
    //   return;
    // }

    await OneSignal.init({
      appId: "439afa83-e31f-46b4-9bcc-3859f0d499c5",
      notifyButton: {
        enable: true,
      },
      allowLocalhostAsSecureOrigin: true,
    });
    if (OneSignal.User.PushSubscription.id) {
      useStagairStore.setState({
        pushNotificationId: OneSignal.User.PushSubscription.id,
      });
    }
  }, []);
  useEffect(() => {
    if (!pushNotificationId) {
      OneSignal.Notifications.permission;
    }

    initializeOneSignal();
  });

  return;
};

export default useOneSignalNotification;
