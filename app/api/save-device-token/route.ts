import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import DeviceToken from "@/models/DeviceToken";

export async function POST(req: NextRequest) {
  try {
    const { deviceToken } = await req.json();

    if (!deviceToken) {
      return NextResponse.json(
        { error: "deviceToken is required" },
        { status: 400 }
      );
    }

    await connectDB();

    await DeviceToken.findOneAndUpdate(
      { deviceToken },
      { deviceToken },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("save-device-token error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
