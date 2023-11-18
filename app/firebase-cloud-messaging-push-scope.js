navigator.serviceWorker
  .register("/firebase-messaging-sw.js")
  .then((registration) => {
    // Service worker registration successful
    console.log("Service Worker registered with scope:", registration.scope);
  })
  .catch((error) => {
    // Service worker registration failed
    console.error("Service Worker registration failed:", error);
  });
