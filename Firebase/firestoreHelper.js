import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, database } from "./firebaseSetup";

export async function writeToDB(data, collectionName) {
  try {
    await addDoc(collection(database, collectionName), data);
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
    if (!auth.currentUser) {
      throw new Error("User is not authenticated");
    }
    const userQuery = collection(database, collectionName);

    const querySnapshot = await getDocs(userQuery);

    console.log(querySnapshot.empty);

    const documentsArray = [];
    querySnapshot.forEach((doc) => {
      documentsArray.push(doc.data());
    });

    return documentsArray;
  } catch (e) {
    console.error("Error reading documents: ", e);
    return [];
  }
}

export async function WriteWithIdToDB(data, collectionName, id) {
  try {
    await setDoc(doc(database, collectionName, id), data, { merge: true });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getADoc(collectionName, id) {
  try {
    const docSnap = await getDoc(doc(database, collectionName, id));

    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (e) {
    console.error("Error getting document: ", e);
  }
}
