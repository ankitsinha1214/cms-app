import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "chrgup-india.firebaseapp.com",
    projectId: "chrgup-india",
    storageBucket: "chrgup-india.firebasestorage.app",
    messagingSenderId: "665573547274",
    appId: "1:665573547274:web:988b54551c6d03a758aef3",
    measurementId: "G-TV4N95WG59"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { analytics };
