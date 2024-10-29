import { Proposal } from "@/app/types/Proposal";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { getTimeRemaining } from "@/app/utils/tools";
import ProposalItem from "./ProposalItem";
import { IconInfoCircle } from "@tabler/icons-react"

const OngoingProposal = () => {
    const [openModal, setOpenModal] = useState(false);
    const [info, setInfo] = useState("");

    const { data, error, isLoading } = useSWR(
        "/api/db/getProposals",
        (url) => fetch(url).then((res) => res.json()), {
        revalidateOnFocus: false,
    }
    );

    return (
        <div className="w-full grid pc:grid-cols-2 grid-cols-1 gap-[20px]">
            {isLoading && <div className="w-screen h-screen fixed z-[1000] top-0 left-0 flex items-center justify-center bg-base-200">
                <span className="loading loading-spinner loading-lg" />
            </div>}
            {
                data?.data?.map((proposal: Proposal, index: number) => (
                    <div key={index} className="p-[20px] xl:w-[500px] pc:w-[400px] w-[320px] border border-black flex flex-col gap-3">
                        <div className="text-[20px] font-bold">
                            {proposal?.title}
                        </div>
                        <div className="flex flex-row items-center gap-[10px]">
                            <div className={`px-[10px] py-[5px] flex items-center justify-center ${!!proposal?.strategy?.info ? "cursor-pointer" : ""}`} style={{
                                background: proposal?.strategy?.bg ?? "#8DC68E"
                            }}
                                onClick={() => {
                                    if (!proposal?.strategy?.info) return
                                    setInfo(proposal?.strategy?.info ?? "")
                                    setOpenModal(true)
                                }}
                            >
                                {proposal?.strategy?.tag}
                                {
                                    !!proposal?.strategy?.info && (
                                        <IconInfoCircle className="w-[13px] h-[13px] ml-[3px]" color="black" />
                                    )
                                }
                            </div>
                            <div className="text-[12px] text-gray-500">
                                Ends in {getTimeRemaining(proposal?.end_time)}
                            </div>
                        </div>
                        <div className="text-[14px]">
                            {proposal?.description}
                        </div>
                        {
                            !!proposal?.matter && (
                                <Link href={proposal?.matter} target="_blank" prefetch={false}>
                                    <div className="flex flex-col text-[14px]">
                                        Please cast your vote on this matter.
                                        <div className="link link-primary">{proposal?.matter}</div>
                                    </div>
                                </Link>
                            )
                        }
                        <div className="text-[12px] text-gray-500">{proposal?.participants_count ?? 0} holders have voted</div>

                        <div role="tablist" className="tabs tabs-lifted">
                            <input type="radio" name={`vote-${index}`} role="tab" className="tab" aria-label="Vote" checked={true} />
                            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-5 gap-3">
                                <ProposalItem proposal={proposal} />
                            </div>
                            <input
                                type="radio"
                                name={`bribery-${index}`}
                                role="tab"
                                className="tab"
                                aria-label="Bribery"
                                disabled={true}
                                checked={false}
                            />
                            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6"></div>
                        </div>
                    </div>
                ))
            }
            <dialog id="tag_info" className="modal" open={openModal}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Info</h3>
                    <p className="py-4">{info}</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn" onClick={() => setOpenModal(false)}>Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default OngoingProposal;
