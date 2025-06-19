"use client";

import escape_room_1 from "@/assets/images/escape_room_1.jpg";
import escape_room_2 from "@/assets/images/escape_room_2.jpg";
import escape_room_3 from "@/assets/images/escape_room_3.jpg";
import escape_room_4 from "@/assets/images/escape_room_4.jpg";
import { RiLockPasswordFill } from "react-icons/ri";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const RoomPage = () => {
  const params = useParams();
  const router = useRouter();
  const room_id = Number(params.id);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ room_id: params.id }),
      });
      const data = await response.json();

      if (!data.success) {
        router.push(`/room/${data.room}`);
      }
    })();
  }, [params]);

  return (
    <div className="h-screen flex items-center justify-center relative">
      <Image
        src={
          room_id === 1
            ? escape_room_1
            : room_id === 2
            ? escape_room_2
            : room_id === 3
            ? escape_room_3
            : room_id === 4
            ? escape_room_4
            : undefined
        }
        alt=""
        className="w-full h-full object-cover"
      />
      <button
        className="absolute bottom-4 right-4 cursor-pointer rounded-full h-12 w-12 flex items-center justify-center bg-blue shadow-2xl shadow-blue transition-all hover:scale-125"
        title="Code eingeben"
        onClick={() => {
          router.push(`/room/${params.id}/code`);
        }}
      >
        <RiLockPasswordFill size={25} />
      </button>
    </div>
  );
};

export default RoomPage;
