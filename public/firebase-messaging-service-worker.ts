// importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js")
// importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBz-92mIkF8ZVwQ6GiNtRP2e63zJQzzCPo",
//   authDomain: "myapp-1fae2.firebaseapp.com",
//   projectId: "myapp-1fae2",
//   storageBucket: "myapp-1fae2.firebasestorage.app",
//   messagingSenderId: "543587011900",
//   appId: "1:543587011900:web:360bf1307cdb6fd3b96239",
//   measurementId: "G-RFW9VCSS5T",
// };

// // Initialize Firebase  
// firebase.initializeApp(firebaseConfig);

// // Initialize Messaging
// const messaging = firebase.messaging();

// // Handle background messages
// messaging.onBackgroundMessage((payload) => {
//   console.log("[firebase-messaging-sw.js] Received background message:", payload);

//   const notificationTitle = payload.notification?.title || "Default Title";
//   const notificationOptions = {
//     body: payload.notification?.body || "Default Body",
//     icon: "./logo.png", // Replace with your app's icon
//     data: {
//       url: payload.fcmOptions?.link || payload.data?.link || "/",
//     },
//   };

//   // Show notification
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// // Handle notification click
// self.addEventListener("notificationclick", (event) => {
//   console.log("[firebase-messaging-sw.js] Notification click received:", event);

//   event.notification.close(); // Close the notification

//   const url = event.notification.data?.url || "/";
//   event.waitUntil(
//     clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
//       for (const client of clientList) {
//         if (client.url === url && "focus" in client) {
//           return client.focus();
//         }
//       }
//       if (clients.openWindow) {
//         return clients.openWindow(url);
//       }
//     })
//   );
// });
