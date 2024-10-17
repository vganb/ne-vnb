"use client";
import React, { use } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {user ? (
        <>
          <p>Logged in as:{user.email}</p>
          <button
            onClick={logout}
            className="w-full bg-red-500 text-white p-2 rounded mt-4"
          >
            Logout
          </button>
          <button></button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
