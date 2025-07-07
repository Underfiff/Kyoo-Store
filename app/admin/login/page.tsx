"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const username = (form.elements.namedItem("username") as HTMLInputElement)
      .value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (res?.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Login gagal. Username atau password salah.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4">Login Admin</h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <input
          name="username"
          placeholder="Username"
          className="w-full border px-3 py-2 mb-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border px-3 py-2 mb-4"
        />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded"
          type="submit"
        >
          Masuk
        </button>
      </form>
    </div>
  );
}
