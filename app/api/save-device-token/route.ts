import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import DeviceToken from "@/models/DeviceToken";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const { deviceToken } = await req.json();

    if (!deviceToken) {
      return NextResponse.json(
        { error: "deviceToken is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    await connectDB();

    await DeviceToken.findOneAndUpdate(
      { deviceToken },
      { deviceToken },
      { upsert: true, returnDocument: "after" }
    );

    return NextResponse.json({ success: true }, { headers: corsHeaders });
  } catch (error) {
    console.error("save-device-token error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
