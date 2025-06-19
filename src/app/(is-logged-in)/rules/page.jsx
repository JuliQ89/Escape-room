"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const BreakoutRulesPage = () => {
  const router = useRouter();
  const [rulesChecked, setRulesChecked] = useState(false);

  const handleContinue = () => {
    if (!rulesChecked) {
      return;
    }
    router.push("/room/1");
  };

  return (
    <div className="h-screen flex items-center justify-center w-full">
      <div className="flex flex-col gap-8 items-center w-full px-8 sm:px-0 sm:w-3/4 md:w-2/4 lg:w-1/3">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          Breakout Regeln
        </h1>
        <div className="bg-gray rounded-[4px] flex flex-col gap-6 p-6 sm:p-8 w-full">
          <div className="flex items-center gap-2.5">
            <input
              type="checkbox"
              name="regeln_gelesen"
              id="regeln_gelesen"
              className="w-[18px] h-[18px] bg-blue cursor-pointer"
              value={rulesChecked}
              onChange={(e) => setRulesChecked(e.target.checked)}
            />
            <label
              htmlFor="regeln_gelesen"
              className="text-white cursor-pointer"
            >
              Regeln gelesen und verstanden
            </label>
          </div>

          {/* sent button */}
          <button
            className="bg-blue rounded-[10px] px-4 py-2 cursor-pointer"
            onClick={handleContinue}
          >
            weiter
          </button>
        </div>
      </div>
    </div>
  );
};

export default BreakoutRulesPage;
