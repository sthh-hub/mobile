import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { database } from "./firebaseSetup";

export async function writeToDB(data, collectionName) {
  try {
    await addDoc(collection(database, collectionName), data);
    console.log("Document written with ID: ", data.id);
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

export async function readAllDocs(collectionName) {
  try {
    const querySnapShot = await getDocs(collection(database, collectionName));
    console.log("arr from doc: ", querySnapShot);
  } catch (e) {
    console.error("Error reading documents: ", e);
  }
}
