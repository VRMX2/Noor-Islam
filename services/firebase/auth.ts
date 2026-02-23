import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    sendPasswordResetEmail,
    updateProfile as firebaseUpdateProfile,
    User,
} from 'firebase/auth';
import { auth, db } from './config';
import { doc, setDoc } from 'firebase/firestore';

export const signUp = async (email: string, password: string, name: string, country: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update Auth profile
        await firebaseUpdateProfile(user, { displayName: name });

        // Create a Firestore document for the user
        await setDoc(doc(db, 'users', user.uid), {
            name,
            email,
            country,
            avatar: '',
            language: 'en',
            theme: 'system',
            notifications: { prayer: true, adhkar: true },
            prayerMethod: 'MWL',
            createdAt: new Date().toISOString(),
        });

        return user;
    } catch (error) {
        throw error;
    }
};

export const signIn = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};

export const signOut = async () => {
    try {
        await firebaseSignOut(auth);
    } catch (error) {
        throw error;
    }
};

export const resetPassword = async (email: string) => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        throw error;
    }
};
