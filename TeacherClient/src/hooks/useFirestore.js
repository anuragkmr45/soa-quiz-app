import { useContext } from "react";
import { FirestoreContext } from "../context/FirestoreContext";

export function useFirestore() {
    const firestoreContext = useContext(FirestoreContext);
    if (!firestoreContext) {
        throw new Error("useFirestore must be used within a FirestoreProvider");
    }
    return firestoreContext.fetchDocumentData;
}
