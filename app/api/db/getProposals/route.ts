import { getProposals } from "@/app/actions/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const proposals = await getProposals();
  try {
    return NextResponse.json({
      data: proposals,
      message: "success",
    });
  } catch (error) {
    return NextResponse.json({
      data: [],
      message: "failed",
    });
  }
}
