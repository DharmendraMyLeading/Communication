// "use client";

// import { useEffect, useState } from "react";

// export default function Home() {
//   const [deviceToken, setDeviceToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [saved, setSaved] = useState(false);

//   useEffect(() => {
//     const handler = (event: any) => {
//       const token = event?.detail?.deviceToken;
//       if (!token) return;
//       setDeviceToken(token);
//       setSaved(false);
//     };

//     window.addEventListener("FCM_TOKEN", handler);
//     return () => window.removeEventListener("FCM_TOKEN", handler);
//   }, []);

//   const saveToken = async () => {
//     if (!deviceToken) return;

//     setLoading(true);
//     try {
//       await fetch("/api/save-device-token", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ deviceToken }),
//       });
//       setSaved(true);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black p-8">
//       <header className="mb-8 text-center">
//         <h1 className="text-2xl font-semibold">This is your Device Token</h1>
//       </header>

//       <div className="w-full max-w-lg rounded-xl border p-6 mb-6">
//         {deviceToken ? (
//           <p className="break-all font-mono text-sm">{deviceToken}</p>
//         ) : (
//           <p className="text-sm italic">Waiting for token from app...</p>
//         )}
//       </div>

//       <button
//         onClick={saveToken}
//         disabled={!deviceToken || loading || saved}
//         className="px-6 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {loading ? "Saving..." : saved ? "Saved!" : "Save Device Token"}
//       </button>
//     </div>
//   );
// }


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
      console.log("Sending message to React Native WebView:", message);
      window?.ReactNativeWebView.postMessage(
        JSON.stringify(message)
      );

      console.log("Message sent to React Native WebView");

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