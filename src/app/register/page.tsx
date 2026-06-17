"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] =
    useState("");
  const [password, setPassword] =
    useState("");
  const [role, setRole] =
    useState("user");

  async function handleRegister() {
    try {
      const response = await fetch(
        "/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Registration Failed"
        );
        return;
      }

      alert(
        "✅ Registration Successful"
      );

      setName("");
      setEmail("");
      setPassword("");
      setRole("user");
    } catch (error) {
      console.error(error);

      alert(
        "❌ Registration Failed"
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-cyan-100 flex items-center justify-center">

      <div className="bg-white p-8 rounded-3xl shadow-xl w-[450px]">

        <h1 className="text-4xl font-bold text-center mb-6">
          🚀 Register
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          className="w-full p-4 border rounded-xl mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="w-full p-4 border rounded-xl mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full p-4 border rounded-xl mb-4"
        />

        <select
          value={role}
          onChange={(e) =>
            setRole(
              e.target.value
            )
          }
          className="w-full p-4 border rounded-xl mb-6"
        >
          <option value="user">
            👤 User
          </option>

          <option value="admin">
            👑 Admin
          </option>
        </select>

        <button
          onClick={
            handleRegister
          }
          className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700"
        >
          Register
        </button>

      </div>

    </div>
  );
}