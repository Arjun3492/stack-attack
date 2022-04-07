import { Subject } from 'rxjs';
import { auth, db } from './firebase.config';

const googleProvider = auth.GoogleAuthProvider();
const facebookProvider = auth.FacebookAuthProvider();

const authState = async () => {
    try {
        const subject = new Subject();
        subject.next(auth.onAuthStateChanged(user => { return user }))
        return subject.asObservable;
        //    return auth.onAuthStateChanged(user => { return user })
    }
    catch (err) {
        throw new Error(err.message)
    }
}

//Sign in with Google
const signInWithGoogle = async () => {
    try {
        const userCredential = await auth.signInWithPopup(googleProvider);
        const user = userCredential.user;
        const query = await db
            .collection("users")
            .where("uid", "==", user.uid)
            .get();
        if (query.docs.length === 0) {
            await db.collection("users").add({
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
        return user;
    } catch (err) {
        throw new Error(err.message)

    }
};

//Sign in with Facebook
const signInWithFacebook = async () => {
    try {
        const userCredential = await auth.signInWithPopup(facebookProvider);
        const user = userCredential.user;
        const query = await db
            .collection("users")
            .where("uid", "==", user.uid)
            .get();
        if (query.docs.length === 0) {
            await db.collection("users").add({
                uid: user.uid,
                name: user.displayName,
                authProvider: "facebook",
                email: user.email,
            });
        }
        return user;

    } catch (err) {
        throw new Error(err.message)

    }
};
//SignUp user with email and password
const signUpWithEmailandPassword = async (email, password) => {
    try {
        await auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
            return userCredential.user;
        })
    }
    catch (err) {
        throw new Error(err.message)

    }
}
//Sign in with email and password
const signInWithEmailAndPassword = async (email, password) => {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        const query = await db
            .collection("users")
            .where("uid", "==", user.uid)
            .get();
        if (query.docs.length === 0) {
            await db.collection("users").add({
                uid: user.uid,
                // name: user.displayName,

                authProvider: "firebase",
                email: user.email,
                emailVerified: user.emailVerified
            });
        }
        return user;

    } catch (err) {
        throw new Error(err.message)

    }
};

//SignOut current user
const signOut = async () => {
    try {
        auth.signOut().then(() => { return null })
    }
    catch (err) {
        throw new Error(err.message)
    }
}

const getCurrentUser = async () => {
    try {

        const userCredential = await auth.currentUser()
        const user = userCredential.user;
        return user;
    }
    catch (err) {
        throw new Error(err.message)
    }
}
export { authState, signInWithGoogle, signInWithFacebook, signUpWithEmailandPassword, signInWithEmailAndPassword, signOut, getCurrentUser }