import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration

  const firebaseConfig = {
      apiKey: "AIzaSyBz-92mIkF8ZVwQ6GiNtRP2e63zJQzzCPo",
      authDomain: "myapp-1fae2.firebaseapp.com",
      projectId: "myapp-1fae2",
      storageBucket: "myapp-1fae2.firebasestorage.app",
      messagingSenderId: "543587011900",
      appId: "1:543587011900:web:360bf1307cdb6fd3b96239",
      measurementId: "G-RFW9VCSS5T"
    }

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

const VAPID_KEY: string  = "BLH4FMDxoNMI2FF70V4xDS852jWhLF5dwzprphWZz_tgJE3Sb17wNBmZKpFiHaHm8dAXIC11eJt_AYuYAYF4oXE";
export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
