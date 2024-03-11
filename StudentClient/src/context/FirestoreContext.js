import React, { createContext, useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

// Create Firebase Context
export const FirestoreContext = createContext();

// Create Firebase Provider
export const FirestoreProvider = ({ children }) => {
    const [db, setDb] = useState(null);

    useEffect(() => {
        // Initialize Firestore
        setDb(firestore());
    }, []);

    const getDocuments = async (collection) => {
        const snapshot = await db.collection(collection).get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    };

    const value = {
        db,
        getDocuments,
    };

    return (
        <FirestoreContext.Provider value={value}>
            {children}
        </FirestoreContext.Provider>
    );
};
