import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAUWmpGZrIG0ca5ZcO7sRiO8_WwbhTA7ds",
    authDomain: "finance-dashboard-2809a.firebaseapp.com",
    databaseURL: "https://finance-dashboard-2809a-default-rtdb.firebaseio.com",
    projectId: "finance-dashboard-2809a",
    storageBucket: "finance-dashboard-2809a.firebasestorage.app",
    messagingSenderId: "900677356111",
    appId: "1:900677356111:web:4958ceb02166517f75383a",
    measurementId: "G-99RBKBBM3K"
  };
// const firebaseConfig = {
//     apiKey: 'AIzaSyD-4v0x1gk2J3X5Z7G9z8Q6Y1a5F4e3h0I',
//     authDomain:'finance-dashboard-2809a.firebaseapp.com',
//     projectId: 'finance-dashboard-2809a',
//     storageBucket: 'finance-dashboard-2809a.appspot.com',
//     messagingSenderId: '123456',
//     appId: '1:123456:web:abcdef123456'
// };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {auth};
const db = getFirestore(app);
export { db };