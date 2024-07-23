import { addDoc, collection, deleteDoc } from 'firebase/firestore';
import { database } from './firebaseSetup';

export async function writeToDB(data, collectionName) {
    try {
        const docId = await addDoc(collection(database, collectionName), data);
        console.log(docId);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function deleteFromDB(dataId, collectionName) {
    try {
        const docId = await deleteDoc(collection(database, collectionName, dataId));
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}