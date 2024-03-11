import { createContext, useContext } from "react";
import { db } from "../config/firebaseConfig";
import {
    doc,
    getDoc,
} from "firebase/firestore";

const FirestoreContext = createContext();

export function useFirestore() {
    return useContext(FirestoreContext);
}

export function FirestoreProvider({ children }) {

    const fetchDocumentData = async (collectionName, docId) => {
        try {
            const docRef = doc(db, collectionName, docId);
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.exists()) {
                // console.log(docSnapshot.data())
                return docSnapshot.data();
            } else {
                console.error("Document does not exist");
                return null;
            }
        } catch (error) {
            console.error("Error getting document: ", error);
            return null;
        }
    };

    const value = {
        fetchDocumentData,
    };

    return (
        <FirestoreContext.Provider value={value}>
            {children}
        </FirestoreContext.Provider>
    );
}
