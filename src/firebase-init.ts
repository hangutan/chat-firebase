
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  // databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MESSAGINGSENDERID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const fetchToken = (setTokenFound) => {
  return getToken(messaging, {vapidKey: process.env.REACT_APP_KEY_FIREBASE}).then((currentToken) => {
    if (currentToken) {
      setTokenFound(true);
      return currentToken;
    
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      return;
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = getAnalytics(app);

export default app;