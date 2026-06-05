"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    postMessageFromApp: (data: any) => void;
  }
}

export default function Home() {
  const [deviceToken, setDeviceToken] = useState<string | null>(null);

  useEffect(() => {
  const handler = (event: any) => {
    const token = event.detail.deviceToken;

    console.log('FCM Token:', token);

    setDeviceToken(token);

    localStorage.setItem('deviceToken', token);
  };

  window.addEventListener('FCM_TOKEN', handler);

  return () => {
    window.removeEventListener('FCM_TOKEN', handler);
  };
}, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black p-8">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-semibold">
          This is your Device Token
        </h1>
      </header>

      <div className="w-full max-w-lg rounded-xl border p-6">
        {deviceToken ? (
          <p className="break-all font-mono text-sm">
            {deviceToken}
          </p>
        ) : (
          <p className="text-sm italic">
            Waiting for token from app...
          </p>
        )}
      </div>
    </div>
  );
}