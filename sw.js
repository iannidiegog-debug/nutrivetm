const CACHE_NAME = "nutrivetm-v2";
const firebaseConfig = {
  apiKey: "AIzaSyDvDCK0keMuHMh9tBZMXFFpUP38iFGV8xI",
  authDomain: "nutrivetm-d73a7.firebaseapp.com",
  projectId: "nutrivetm-d73a7",
  storageBucket: "nutrivetm-d73a7.firebasestorage.app",
  messagingSenderId: "262034224909",
  appId: "1:262034224909:web:ee1a035c0e329aa6cee244",
};
const APP_ASSETS = [
  "./",
  "index.html",
  "styles.css",
  "app.js",
  "manifest.webmanifest",
  "nutrivetm-hero.png",
  "icon-192.svg",
  "icon-512.svg",
];

try {
  importScripts("https://www.gstatic.com/firebasejs/11.9.1/firebase-app-compat.js");
  importScripts("https://www.gstatic.com/firebasejs/11.9.1/firebase-messaging-compat.js");

  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    const title = payload.notification?.title || "NutriVetM";
    const options = {
      body: payload.notification?.body || "Tenes una nueva alerta.",
      icon: "icon-192.svg",
      badge: "icon-192.svg",
      data: payload.data || {},
    };

    self.registration.showNotification(title, options);
  });
} catch (error) {
  console.info("Firebase Messaging no quedo activo en este contexto.", error);
}

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_ASSETS)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
