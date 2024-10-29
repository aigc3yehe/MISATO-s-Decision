import { alchemy } from "../common/alchemy";

export const getTokenBalance = async (
  address: string,
  token: string,
  height?: number
) => {
  const res = await alchemy.core.getTokenBalances(address, [token]);
  console.debug("token balance:", res);
  return res?.tokenBalances?.[0]?.tokenBalance;
};
