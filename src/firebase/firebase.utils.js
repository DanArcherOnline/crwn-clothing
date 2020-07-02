import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

const config = {
    apiKey: "AIzaSyB07UuEHO4Tbm38Y99gpkNx-NJpZX8lygo",
    authDomain: "crwn-db-9feae.firebaseapp.com",
    databaseURL: "https://crwn-db-9feae.firebaseio.com",
    projectId: "crwn-db-9feae",
    storageBucket: "crwn-db-9feae.appspot.com",
    messagingSenderId: "988893878458",
    appId: "1:988893878458:web:6626041032acab4b284a83"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();
    console.log(snapshot);
    if (!snapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
})
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;