"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase"; // Firebase instance from your setup
import Link from "next/link";
import Header from "../components/Header";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password); // Firebase sign-up
      router.push("/"); // Redirect to dashboard after sign-up
    } catch {
      setError("Failed to create an account");
    }
  };

  return (
    <div className="overflow-hidden min-h-screen">
      <div className="fixed top-0 left-0 w-full">
        <Header includeNavigation={false} />
      </div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col max-w-lg w-full mx-auto p-8 border-2 border-gray-100 rounded-lg shadow-lg">
          <h1 className="text-2xl mb-4">Create an Account</h1>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSignUp}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 mb-4 border"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-2 mb-4 border"
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded"
            >
              Sign Up
            </button>
          </form>

          {/* Add a link to go back to the login page */}
          <p className="mt-4">
            Already have an account?{" "}
            <Link href="/login">
              <button className="text-blue-500 underline">Login here</button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
