import Link from "next/link"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useAccountEffect } from "wagmi";
import { useHolerStateStore } from "@/app/store/holder";
import { alchemy } from "@/app/common/alchemy";
import { MISATO_ADDRESS } from "@/app/const/contract";
import { formatEther } from "viem";
import { useEffect, useState } from "react";
import { getTokenBalance } from "@/app/actions/token";
import { toast } from "react-toastify";

const Header = () => {
    const { setBalance } = useHolerStateStore();
    const { address, isConnected } = useAccount();
    const [openHelp, setOpenHelp] = useState(false);
    const [openDonation, setOpenDonation] = useState(false);

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
                    <div className="cursor-pointer" onClick={() => setOpenDonation(true)}>
                        Donation
                    </div>
                    <Link href="https://github.com/aigc3yehe/MISATO-s-Decision" target="_blank" prefetch={false}>
                        <div>
                            Github
                        </div>
                    </Link>
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
            <dialog id="donation_modal" className="modal" open={openDonation}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">0xD09F961A030746b5836383bcA2558f9ec4113659</h3>
                    <div className="text-[#313FBC] cursor-pointer mt-[5px] mb-[20px]" onClick={() => navigator.clipboard.writeText("0xD09F961A030746b5836383bcA2558f9ec4113659").then(() => toast("Copied!"))}>Copy</div>
                    <p className="py-4">MISATO&apos;s Decision will continue to be developed as a decentralized AI agent training protocol.
                        We will strive to give back to every donor.</p>
                    <form method="dialog" className="modal-backdrop">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn" onClick={() => setOpenDonation(false)}>Close</button>
                    </form>
                </div>
            </dialog>
        </div>
    )
}

export default Header