import { useHolerStateStore } from "@/app/store/holder";
import { Proposal } from "@/app/types/Proposal";
import { toast } from "react-toastify";
import useSWR from "swr";
import { signMessage } from '@wagmi/core'
import { config } from "@/app/common/wallet"
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { formatCurrency, formatPercentage, getMessage } from "@/app/utils/tools";

const ProposalItem = ({ proposal, mutateAll }: { proposal: Proposal, mutateAll: () => void }) => {
    const { balance } = useHolerStateStore();
    const [selectedOption, setSelectedOption] = useState<number>();
    const { address, isConnected } = useAccount();
    const [isVoting, setIsVoting] = useState(false);

    const { data, error, isLoading, mutate } = useSWR(
        `/api/db/getVoteHistory?proposalId=${proposal?.id}&address=${address}`,
        (url: string) => fetch(url).then((res) => res.json()), {
        revalidateOnFocus: false,
    }
    );

    const voteHandle = async () => {
        if (isVoting || isLoading) return
        if (!isConnected || !address) {
            toast("Please connect your wallet first!")
            return
        }
        if (selectedOption == null || selectedOption == undefined) {
            toast("Please select an option to vote!")
            return
        }
        if (Number(balance.formatted) == 0) {
            toast("You don't have any $vMSATO to vote!")
            return
        }
        if (!proposal?.id) {
            toast("Proposal ID is not available!")
            return
        }
        setIsVoting(true);
        try {
            const message = getMessage(proposal?.id, selectedOption);
            console.debug("sign message:", message)
            const signature = await signMessage(config, { message });

            const voteResult = await fetch(`/api/db/vote?proposalId=${proposal?.id}&address=${address}&optionId=${selectedOption}&valume=${parseInt(balance.formatted)}&signature=${signature}`);
            const response = await voteResult.json();
            if (!response?.data) {
                toast("Vote failed!")
                setIsVoting(false);
                return
            }
            await mutate();
            await mutateAll();
            setIsVoting(false);
            toast("Vote success!")
        } catch (error) {
            toast("Something went wrong!")
            setIsVoting(false);
        }
    }

    return <>
        {
            proposal?.options?.map((option: any, index: number) => (
                <div key={index}>
                    <div className={`flex flex-col p-[10px] ${selectedOption === index ? "bg-base-300 border border-black" : ""} hover:bg-base-300 hover:border-black hover:border cursor-pointer gap-3 text-[14px]`} onClick={() => setSelectedOption(index)}>
                        <div>{option?.name}</div>
                        {
                            !isLoading && !!data?.data && (
                                <div>
                                    {data?.data?.option_id == index ? "✅ " : ''}
                                    {!!proposal?.valume ? formatPercentage((proposal?.options?.[index]?.valume) ?? 0, proposal?.valume) : "0%"}
                                </div>
                            )
                        }
                    </div>
                </div>
            ))
        }
        {
            (isLoading || !data?.data) && (
                <div className="flex flex-col gap-1 mt-3">
                    <button className="btn btn-neutral" onClick={voteHandle}>{isLoading || isVoting ? <span className="loading loading-spinner loading-sm" /> : `Vote(${formatCurrency(Number(balance.formatted))} $vMSATO)`} </button>
                    <div className="text-[12px] text-gray-500">
                        This will not cost any tokens, just a signature to confirm your identity.
                    </div>
                </div>
            )
        }
        {
            !isLoading && !!data?.data && (
                <div>
                    Voted ({proposal?.valume} $vMSATO)
                </div>
            )
        }
    </>
}

export default ProposalItem;