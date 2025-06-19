"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { RiLock2Fill } from "react-icons/ri";

export default function Home() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/check-session").then(
      (res) => res.status === 200 && router.push("/rules")
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/rules");
      setPassword("");
    } else {
      const data = await res.json();
      setError(data.error || "Login fehlgeschlagen");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center w-full">
      <div className="flex flex-col gap-8 items-center w-full px-8 sm:px-0 sm:w-3/4 md:w-2/4 lg:w-1/3">
        <h1 className="text-3xl sm:text-4xl font-bold text-white text-center">
          Breakout Physik
        </h1>
        <form
          className="bg-gray rounded-[4px] flex flex-col gap-6 p-6 sm:p-8 w-full"
          onSubmit={handleSubmit}
        >
          {/* Hidden username field */}
          <input
            type="text"
            hidden
            className="hidden invisible"
            name="username"
            id="username"
            autoComplete="username"
          />

          <div className="w-full flex flex-col gap-1.5">
            {/* Password field */}
            <div
              className="flex gap-3 items-center border border-border rounded-[10px] px-4 py-2"
              style={error ? { borderColor: "#fb2c36" } : {}}
            >
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Passwort eingeben"
                className="outline-hidden border-hidden bg-transparent grow"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <RiLock2Fill className="text-white" />
            </div>
            {error && (
              <span className="text-red-500 font-regular">{error}</span>
            )}
          </div>

          {/* sent button */}
          <button
            type="submit"
            className="bg-blue rounded-[10px] px-4 py-2 cursor-pointer"
          >
            Senden
          </button>

          <span className="text-blue text-center">
            Passwort bitte korrekt eingeben!
          </span>
        </form>
      </div>
    </div>
  );
}
