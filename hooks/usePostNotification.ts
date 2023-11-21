import { useMutation, useQueryClient } from "react-query";
import { INotification } from "@/types";
import axios from "axios";


const usePostNotification = (pushNotificationId:string) => {
  

  return useMutation(
    (notification: INotification) =>
      axios.post(
        "https://onesignal.com/api/v1/notifications",
        {
          app_id: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
          include_player_ids: [pushNotificationId],
          headings: notification.headings,
          contents: notification.contents,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${process.env.NEXT_PUBLIC_ONESIGNAL_REST_API_KEY}`,


          },

        }
      ),
    {
      onSuccess: () => {
        console.log("Notification success");
      },
      onError: (err) => {
        console.log("Notification error" + err);
      },
    }
  );
};

export default usePostNotification;
