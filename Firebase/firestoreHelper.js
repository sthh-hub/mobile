import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { database } from './firebaseSetup';

export async function writeToDB(data, collectionName) {
    try {
        const docId = await addDoc(collection(database, collectionName), data);
        console.log(docId);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function deleteFromDB(docId, collectionName) {
    try {
        await deleteDoc(doc(database, collectionName, docId));
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}

export async function markAsWarning(docId, collectionName) {
    try {
        const docRef = doc(database, collectionName, docId);
        await updateDoc(docRef, { warning: true });
        console.log(`Document with ID: ${docId} marked as warning`);
    } catch (e) {
        console.error("Error updating document: ", e);
    }
}