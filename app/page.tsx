"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [deviceToken, setDeviceToken] = useState<string | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data) {
        setDeviceToken(event.data);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black p-8">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
          This is your Device Token
        </h1>
      </header>

      <div className="w-full max-w-lg rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 p-6">
        {deviceToken ? (
          <p className="break-all font-mono text-sm text-zinc-700 dark:text-zinc-300">
            {deviceToken}
          </p>
        ) : (
          <p className="text-sm text-zinc-400 dark:text-zinc-500 italic">
            Waiting for token from app...
          </p>
        )}
      </div>
    </div>
  );
}
