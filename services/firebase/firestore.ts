import { doc, getDoc, updateDoc, collection, setDoc, deleteDoc, query, getDocs } from 'firebase/firestore';
import { db } from './config';

export const getUserProfile = async (uid: string) => {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    }
    return null;
};

export const updateUserProfile = async (uid: string, data: any) => {
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, data);
};

export const addBookmark = async (uid: string, surahId: number, ayahNumber: number, text: string) => {
    const ayahId = `${surahId}_${ayahNumber}`;
    const docRef = doc(db, `bookmarks/${uid}/items`, ayahId);
    await setDoc(docRef, {
        surahId,
        ayahNumber,
        text,
        timestamp: new Date().toISOString(),
    });
};

export const getBookmarks = async (uid: string) => {
    const q = query(collection(db, `bookmarks/${uid}/items`));
    const querySnapshot = await getDocs(q);
    const bookmarks: any[] = [];
    querySnapshot.forEach((doc) => {
        bookmarks.push({ id: doc.id, ...doc.data() });
    });
    return bookmarks;
};

export const removeBookmark = async (uid: string, surahId: number, ayahNumber: number) => {
    const ayahId = `${surahId}_${ayahNumber}`;
    const docRef = doc(db, `bookmarks/${uid}/items`, ayahId);
    await deleteDoc(docRef);
};

export const saveLastReadPosition = async (uid: string, surahId: number, ayahNumber: number) => {
    const docRef = doc(db, 'progress', uid);
    await setDoc(docRef, {
        lastRead: {
            surahId,
            ayahNumber,
            timestamp: new Date().toISOString()
        }
    }, { merge: true });
};

export const getLastReadPosition = async (uid: string) => {
    const docRef = doc(db, 'progress', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data().lastRead;
    }
    return null;
};
