import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDtHjswXswzKzC56pEBJvYft6tIEzBXAUo",
    authDomain: "crwn-clothing-db-c4449.firebaseapp.com",
    projectId: "crwn-clothing-db-c4449",
    storageBucket: "crwn-clothing-db-c4449.appspot.com",
    messagingSenderId: "671853385707",
    appId: "1:671853385707:web:0bc2fa9ed6e738dceb2bae"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email, 
                createdAt
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userDocRef;
}