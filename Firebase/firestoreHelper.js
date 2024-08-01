import {
  addDoc,
  collection,
  deleteDoc,
  doc,
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
    const querySnapShot = await getDocs(
      query(
        collection(database, collectionName),
        where("owner", "==", auth.currentUser.uid)
      )
    );
    console.log(querySnapShot.empty);

    let newArray = [];
    querySnapShot.forEach((doc) => {
      newArray.push(doc.data());
    });
    return newArray;
  } catch (e) {
    console.error("Error reading documents: ", e);
  }
}
