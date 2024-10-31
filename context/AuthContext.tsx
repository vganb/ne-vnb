// context/AuthContext.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  updateEmail,
} from "firebase/auth";
import { auth, db } from "../lib/firebase"; // Import your Firebase configuration
import { useRouter } from "next/navigation";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Define the shape of your context
interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  createUserDocument: (user: User, data: Record<string, any>) => Promise<void>;
  updateUserProfile: (data: Record<string, any>) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe();
  }, []);

  // Function to create or update a user document in Firestore
  const createUserDocument = async (user: User, data: Record<string, any>) => {
    const userDocRef = doc(db, "users", user.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      await setDoc(userDocRef, data);
    }
  };

  // Function to handle profile updates
  const updateUserProfile = async (data: Record<string, any>) => {
    if (user) {
      try {
        // Update email in Firebase Auth if it has changed
        if (data.email && data.email !== user.email) {
          await updateEmail(user, data.email);
        }

        // Update user data in Firestore
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, data, { merge: true });
      } catch (error) {
        console.error("Error updating user profile:", error);
      }
    }
  };

  // Function to handle login
  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  // Function to handle login with Google
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await createUserDocument(user, {
        email: user.email,
        firstName: "", // Set default empty fields
        lastName: "",
        phoneNumber: "",
      });
      router.push("/dashboard");
    } catch (error) {
      console.error("Google sign in error:", error);
    }
  };

  // Function to handle logout
  const logout = async () => {
    await signOut(auth);
    router.push("/login"); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loginWithGoogle,
        createUserDocument,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Helper hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
