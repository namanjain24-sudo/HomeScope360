import { db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export async function getUserFavorites(uid) {
  const ref = doc(db, 'userFavorites', uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return snap.data().favorites || [];
  }
  return [];
}

export async function setUserFavorites(uid, favorites) {
  const ref = doc(db, 'userFavorites', uid);
  await setDoc(ref, { favorites });
} 