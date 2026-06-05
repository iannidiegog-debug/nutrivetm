export const appConfig = {
  appName: "NutriVetM",
  clinicName: "Melanie",
  contact: {
    phone: "",
    email: "",
    address: "",
    hours: "",
  },
  auth: {
    provider: "email-password",
    collectProfile: ["first_name", "last_name", "username"],
    googleEnabled: false,
  },
  supabase: {
    projectId: "xvwqhtgjlijplehpxyav",
    url: "https://xvwqhtgjlijplehpxyav.supabase.co",
    publishableKey: "sb_publishable_U-WC1ABtp7ZEhlN2UEjTNw_3KwgRA-W",
  },
  firebase: {
    apiKey: "AIzaSyDvDCK0keMuHMh9tBZMXFFpUP38iFGV8xI",
    authDomain: "nutrivetm-d73a7.firebaseapp.com",
    projectId: "nutrivetm-d73a7",
    storageBucket: "nutrivetm-d73a7.firebasestorage.app",
    messagingSenderId: "262034224909",
    appId: "1:262034224909:web:ee1a035c0e329aa6cee244",
    vapidPublicKey:
      "BL5Kuzq2UgEluFyyqwURfhkYGIXMVDjTLJqVRGqlVAA2f94hQhAHurkoXF7TbNQuQ87hE5maghDBh8VWc4BGLM8",
  },
  email: {
    provider: "resend-recommended",
    senderName: "NutriVetM",
    senderEmail: "",
  },
};
