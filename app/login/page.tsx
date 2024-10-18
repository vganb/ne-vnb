"use client";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { ro } from "date-fns/locale";

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
    } catch (err) {
      setError("Failed to login");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      router.push("/");
    } catch (error) {
      setError("Failed to login with Google");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
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
        Don't have an account?{" "}
        <Link href="/signup">
          <button className="text-blue-500 underline">Create one</button>
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
