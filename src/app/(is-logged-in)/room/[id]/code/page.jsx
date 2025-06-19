"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const CodePage = () => {
  const params = useParams();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/check-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, room_id: params.id }),
    });

    if (res.ok) {
      if (Number(params.id) < 4) {
        router.push(`/room/${Number(params.id) + 1}`);
      } else {
        router.push(`/completed`);
      }
      setCode("");
    } else {
      const data = await res.json();
      setError(data.error || "Login fehlgeschlagen");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center w-full">
      <div className="flex flex-col gap-8 items-center w-1/3">
        <form
          className="bg-gray rounded-[4px] flex flex-col gap-6 p-8 w-full"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex flex-col gap-1.5">
            {/* Password field */}
            <div
              className="flex gap-3 items-center border border-border rounded-[10px] px-4 py-2"
              style={error ? { borderColor: "#fb2c36" } : {}}
            >
              <input
                type="text"
                name="code"
                id="code"
                placeholder="Code eingeben"
                className="outline-hidden border-hidden bg-transparent grow"
                autoComplete="current-password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
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
        </form>
      </div>
    </div>
  );
};

export default CodePage;
