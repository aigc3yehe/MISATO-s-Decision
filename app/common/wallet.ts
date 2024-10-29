import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "viem";
import { base } from "viem/chains";

export const config = getDefaultConfig({
  appName: "MISATO's DECISION",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID ?? "",
  chains: [base],
  ssr: true,
  transports: {
    [base.id]: http(),
  },
});
