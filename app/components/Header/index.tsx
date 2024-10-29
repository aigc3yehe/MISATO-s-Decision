import Link from "next/link"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useAccountEffect } from "wagmi";
import { useHolerStateStore } from "@/app/store/holder";
import { alchemy } from "@/app/common/alchemy";
import { MISATO_ADDRESS } from "@/app/const/contract";
import { formatEther } from "viem";
import { useEffect, useState } from "react";
import { getTokenBalance } from "@/app/actions/token";

const Header = () => {
    const { setBalance } = useHolerStateStore();
    const { address, isConnected } = useAccount();
    const [openHelp, setOpenHelp] = useState(false);

    useEffect(() => {
        if (isConnected && !!address) {
            getTokenBalance(address, MISATO_ADDRESS).then((res) => {
                if (!!res) {
                    setBalance({
                        origin: BigInt(res),
                        formatted: formatEther(BigInt(res))
                    })
                }
            })
        }
    }, [isConnected, address])

    return (
        <div className="navbar bg-base-100 fixed top-0 left-0 z-50 flex w-full h-[80px] items-center justify-between pc:px-[50px] px-[20px]">
            <div className="text-lg font-bold">
                MISATO&apos;s Decision
            </div>
            <div className="flex items-center gap-[50px]">
                <div className="flex items-center gap-[30px]">
                    <div className="cursor-pointer" onClick={() => setOpenHelp(true)}>
                        Help
                    </div>
                    <div>
                        Donation
                    </div>
                    <div>
                        Github
                    </div>
                </div>
                <div>
                    <ConnectButton />
                </div>
            </div>
            <dialog id="help_modal" className="modal" open={openHelp}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Help</h3>
                    <p className="py-4">When the vote is created, the system takes a snapshot of the voting rights tokens to determine your voting weight.</p>
                    <form method="dialog" className="modal-backdrop">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn" onClick={() => setOpenHelp(false)}>Close</button>
                    </form>
                </div>
            </dialog>
        </div>
    )
}

export default Header