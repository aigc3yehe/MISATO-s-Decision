import { vote } from "@/app/actions/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const proposalId = searchParams.get("proposalId");
  const address = searchParams.get("address");
  const optionId = searchParams.get("optionId");
  const valume = searchParams.get("valume");
  const signature = searchParams.get("signature");
  const result = await vote(proposalId, address, optionId, valume, signature);
  try {
    return NextResponse.json({
      data: result,
      message: result ? "success" : "failed",
    });
  } catch (error) {
    return NextResponse.json({
      data: false,
      message: "failed",
    });
  }
}
