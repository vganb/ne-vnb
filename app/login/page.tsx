"use client";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";

const LoginPage = () => {
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/");
    } catch {
      setError("Failed to login");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      router.push("/");
    } catch {
      setError("Failed to login with Google");
    }
  };

  return (
    <div className="overflow-hidden min-h-screen">
      <div className="fixed top-0 left-0 w-full">
        <Header includeNavigation={false} />
      </div>

      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col max-w-lg w-full mx-auto p-8 border-2 border-gray-100 rounded-lg shadow-lg">
          <h1 className="text-2xl mb-4">Login</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleLogin}>
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
              className="w-full bg-orange-300 text-gray-700 p-2 rounded"
            >
              Login
            </button>
          </form>

          <button
            onClick={handleGoogleLogin}
            className="w-full bg-blue-500 text-white p-2 rounded mt-4"
          >
            Login with Google
          </button>
          {/* Add a link to the Sign-Up page */}
          <p className="mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/signup">
              <button className="text-blue-500 underline">Create one</button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
