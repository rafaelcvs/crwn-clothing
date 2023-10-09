import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC4O9phBok0VG8J1TnJg5N1ckhz5UomkQI",
    authDomain: "crwn-clothing-database-8420b.firebaseapp.com",
    projectId: "crwn-clothing-database-8420b",
    storageBucket: "crwn-clothing-database-8420b.appspot.com",
    messagingSenderId: "966969280620",
    appId: "1:966969280620:web:db408c3d3bfc53106d7049"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const singInWithGooglePopup = () =>  signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());
    
    // if user data does not exist
    // Create / set the document with the data from userAuth in my collection
    if (!userSnapshot.exists()) {
        const { displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating the user, error.message')
        }
    }
    
    // if user data Exists
   return userDocRef;
    
};

