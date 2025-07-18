import { testDbConnection } from "@/shared/utils/db.utils";
import { NextResponse } from "next/server";

export async function GET() {
  const isConnected = await testDbConnection();

  if (isConnected) {
    return NextResponse.json({
      success: true,
      message: "Database connection successful",
    });
  } else {
    return NextResponse.json(
      { success: false, message: "Database connection failed" },
      { status: 500 }
    );
  }
}
