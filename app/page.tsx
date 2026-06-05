// "use client";

// import { useEffect, useState } from "react";

// export default function Home() {
//   const [deviceToken, setDeviceToken] = useState<string | null>(null);

//   useEffect(() => {
//     const handler = (event: any) => {
//       const token = event.detail.deviceToken;

//       console.log("FCM Token:", token);

//       setDeviceToken(token);

//       localStorage.setItem("deviceToken", token);
//     };

//     window.addEventListener("FCM_TOKEN", handler);

//     return () => {
//       window.removeEventListener("FCM_TOKEN", handler);
//     };
//   }, []);

//   const sendToReactNative = () => {
//     const message = {
//       type: "BUTTON_CLICKED",
//       payload: {
//         message: "Hello from Website",
//         timestamp: Date.now(),
//       },
//     };

//     if (window?.ReactNativeWebView) {
//       console.log("Sending message to React Native WebView:", message);
//       window?.ReactNativeWebView.postMessage(
//         JSON.stringify(message)
//       );

//       console.log("Message sent to React Native WebView");

//     } else {
//       console.log("Not running inside React Native WebView");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-8">
//       <h1 className="text-2xl font-semibold mb-4">
//         This is your Device Token
//       </h1>

//       <button
//         onClick={sendToReactNative}
//         className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
//       >
//         Send Message To React Native
//       </button>

//       <div className="w-full max-w-lg rounded-xl border p-6">
//         {deviceToken ? (
//           <p className="break-all font-mono text-sm">
//             {deviceToken}
//           </p>
//         ) : (
//           <p className="text-sm italic">
//             Waiting for token from app...
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [deviceToken, setDeviceToken] = useState<string | null>(null);

  useEffect(() => {
    console.log("[WEB] Page loaded");
    console.log(
      "[WEB] Running inside React Native WebView:",
      !!window.ReactNativeWebView
    );

    const handler = async (event: any) => {
      console.log("[WEB] FCM_TOKEN event received");
      console.log("[WEB] Full event:", event);

      const token = event?.detail?.deviceToken;

      console.log("[WEB] Extracted token:", token);

      if (!token) {
        console.error("[WEB] No token found in event.detail");
        return;
      }

      setDeviceToken(token);

      try {
        console.log("[WEB] Calling API...");

        const response = await fetch("/api/save-device-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            deviceToken: token,
          }),
        });

        console.log(
          "[WEB] API Response Status:",
          response.status
        );

        const data = await response.json();

        console.log("[WEB] API Response Data:", data);
      } catch (error) {
        console.error(
          "[WEB] API Call Failed:",
          error
        );
      }
    };

    console.log("[WEB] Registering FCM_TOKEN listener");

    window.addEventListener("FCM_TOKEN", handler);

    return () => {
      console.log(
        "[WEB] Removing FCM_TOKEN listener"
      );

      window.removeEventListener(
        "FCM_TOKEN",
        handler
      );
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