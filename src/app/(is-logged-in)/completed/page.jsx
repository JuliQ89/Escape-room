"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CgLockUnlock } from "react-icons/cg";
import { LuPlay } from "react-icons/lu";

const CompletedPage = () => {
  const router = useRouter();
  const handleStart = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });

    router.push("/");
  };

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/check-completed");
      const data = await response.json();
      if (!data.completed) {
        router.push(`/room/${data.room}`);
      }
    })();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center w-full">
      <div className="flex flex-col gap-8 items-center">
        <CgLockUnlock className="text-success font-bold text-8xl" />
        <h1 className="text-white font-bold text-3xl text-center sm:text-4xl">
          Du hast den Escape Room geschafft!
        </h1>
        <button
          onClick={handleStart}
          className="bg-blue rounded-[10px] px-4 py-2 cursor-pointer flex items-center justify-center gap-2 text-[18px] mt-4"
        >
          <LuPlay />
          Start
        </button>
      </div>
    </div>
  );
};

export default CompletedPage;
