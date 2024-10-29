import { create } from "zustand";

interface GroupCombatState {
  balance: { origin: bigint; formatted: string };
  setBalance: (balance: { origin: bigint; formatted: string }) => void;
}

export const useHolerStateStore = create<GroupCombatState>((set) => ({
  balance: { origin: BigInt(0), formatted: "0" },
  setBalance: (balance) => set({ balance }),
}));
