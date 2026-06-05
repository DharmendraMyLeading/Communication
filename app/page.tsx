"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [deviceToken, setDeviceToken] = useState<string | null>(null);

  useEffect(() => {
    const handler = (event: any) => {
      const token = event.detail.deviceToken;

      console.log("FCM Token:", token);

      setDeviceToken(token);

      localStorage.setItem("deviceToken", token);
    };

    window.addEventListener("FCM_TOKEN", handler);

    return () => {
      window.removeEventListener("FCM_TOKEN", handler);
    };
  }, []);

  const sendToReactNative = () => {
    const message = {
      type: "BUTTON_CLICKED",
      payload: {
        message: "Hello from Website",
        timestamp: Date.now(),
      },
    };

    if (window?.ReactNativeWebView) {
      window?.ReactNativeWebView.postMessage(
        JSON.stringify(message)
      );
    } else {
      console.log("Not running inside React Native WebView");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-semibold mb-4">
        This is your Device Token
      </h1>

      <button
        onClick={sendToReactNative}
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
      >
        Send Message To React Native
      </button>

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