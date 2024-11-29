import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect } from "react";
import {fetchToken} from "../../../firebase-config"
function RootLayout() {
  useEffect(() => {
    const requestNotificationPermission = async () => {
      if ("Notification" in window) {
        if (Notification.permission === "default") {
          try {
            const permission = await Notification.requestPermission();
            if (permission === "granted") {
              const token = await fetchToken();
              console.log("token", token);
  
             
            } else {
              console.log("Notification permission denied.");
            }
          } catch (error) {
            console.error("Error requesting notification permission:", error);
          }
        }
      } else {
        console.log("This browser does not support notifications.");
      }
    };
  
    requestNotificationPermission();
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default RootLayout;
