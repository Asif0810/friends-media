import React, { createContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth'
import app from '../firebase/Firebase.config';

export const AuthContext = createContext(app);

const auth = getAuth()
const googleProvider = new GoogleAuthProvider()
const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState('')
    const [loader, setLoader] = useState(true)
    const signUp = (email, passoword) => {
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, passoword)
    }
    const updateuser = (update) => {
        return updateProfile(auth.currentUser, update)
    }
    const signIn = (email, password) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        return signOut(auth)
    }
    const google = () => {
        return signInWithPopup(auth, googleProvider)
    }
    const authInfo = {
        signUp,
        signIn,
        user,
        logOut,
        updateuser,
        loader,
        google,

    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoader(false)
        })
        return () => {
            unsubscribe()
        }
    }, [])
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;