import { verifyMessage } from "viem";
import { db } from "../common/db";
import { getMessage } from "../utils/tools";

export const getProposals = async () => {
  try {
    const { data, error } = await db
      .from("proposal")
      .select("*")
      .order("id", { ascending: false });
    if (error) {
      console.error(error);
      return [];
    }
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getVoteHistory = async (
  proposalId: string | null,
  address: string | null
) => {
  if (!proposalId || !address) return null;
  try {
    const { data, error } = await db
      .from("vote_logs")
      .select("*")
      .eq("proposal_id", proposalId)
      .eq("voter", address?.toLowerCase());
    if (error) {
      console.error(error);
      return null;
    }
    return data ? data[0] : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const vote = async (
  proposalId: string | null,
  address: string | null,
  optionId: string | null,
  valume: string | null,
  signature: string | null
) => {
  if (!proposalId || !address) return false;
  try {
    const message = getMessage(proposalId, optionId);
    const result = await verifyMessage({
      address: address as `0x${string}`,
      message,
      signature: signature as `0x${string}`,
    });
    if (!result) {
      return false;
    }
    const { data, error } = await db.rpc("vote", {
      p_id: Number(proposalId),
      p_address: address?.toLowerCase(),
      p_option_id: Number(optionId),
      p_valume: Number(valume),
    });
    if (error) {
      console.error(error);
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
