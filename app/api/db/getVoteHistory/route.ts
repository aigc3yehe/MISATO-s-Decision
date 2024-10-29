import { getVoteHistory } from "@/app/actions/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const proposalId = searchParams.get("proposalId");
  const address = searchParams.get("address");
  const proposals = await getVoteHistory(proposalId, address);
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
