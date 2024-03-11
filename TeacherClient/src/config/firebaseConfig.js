import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCKcN7cUSybc5D8HSjcsdWs5c5UT139LDg",
    authDomain: "quizzy-4f34e.firebaseapp.com",
    projectId: "quizzy-4f34e",
    storageBucket: "quizzy-4f34e.appspot.com",
    messagingSenderId: "422404803111",
    appId: "1:422404803111:web:3045d19398c7d2904f1c02",
    measurementId: "G-CRBPT632YJ"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };
