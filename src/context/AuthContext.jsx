import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // 1. Immediately set the base user and stop loading so the UI unblocks
                setUser({ 
                    uid: firebaseUser.uid, 
                    email: firebaseUser.email,
                    name: firebaseUser.displayName || 'User' 
                });
                setLoading(false);

                // 2. Fetch extended profile in the background
                try {
                    const docRef = doc(db, 'users', firebaseUser.uid);
                    const docSnap = await getDoc(docRef);
                    
                    if (docSnap.exists()) {
                        setUser(prev => ({ ...prev, ...docSnap.data() }));
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const register = async (userData) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
            const firebaseUser = userCredential.user;

            // Immediately set the displayName on the Firebase Auth object
            await updateProfile(firebaseUser, { displayName: userData.name });

            const newUserProfile = {
                name: userData.name,
                email: userData.email,
                mobile: userData.mobile,
                joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                walletBalance: 0
            };
            
            try {
                await setDoc(doc(db, 'users', firebaseUser.uid), newUserProfile);
            } catch (firestoreError) {
                console.error("Warning: Could not save to Firestore (rules may be strict)", firestoreError);
            }
            
            return { success: true };
        } catch (error) {
            console.error("Registration Error:", error);
            return { success: false, message: error.message };
        }
    };

    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (error) {
            console.error("Login Error:", error);
            let message = "Invalid email or password.";
            if (error.code === 'auth/user-not-found') message = "No account found with this email.";
            if (error.code === 'auth/wrong-password') message = "Incorrect password.";
            if (error.code === 'auth/invalid-credential') message = "Incorrect email or password.";
            return { success: false, message };
        }
    };

    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const firebaseUser = result.user;

            // Check if this is their first time logging in by seeing if they have a Firestore doc
            const docRef = doc(db, 'users', firebaseUser.uid);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                // If it's a new user, create a profile for them
                const newUserProfile = {
                    name: firebaseUser.displayName || 'Google User',
                    email: firebaseUser.email,
                    mobile: firebaseUser.phoneNumber || '',
                    joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                    walletBalance: 0
                };
                try {
                    await setDoc(docRef, newUserProfile);
                } catch (firestoreError) {
                    console.error("Warning: Could not save Google profile to Firestore", firestoreError);
                }
            }

            return { success: true };
        } catch (error) {
            console.error("Google Login Error:", error);
            return { success: false, message: error.message };
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    const updateProfileData = async (uid, updatedData) => {
        try {
            const docRef = doc(db, 'users', uid);
            await updateDoc(docRef, updatedData);
            setUser(prev => ({ ...prev, ...updatedData }));
            return { success: true };
        } catch (error) {
            console.error("Error updating profile:", error);
            return { success: false, message: error.message };
        }
    };

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f4f6f8' }}>Loading App...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, register, login, loginWithGoogle, logout, updateProfileData, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
