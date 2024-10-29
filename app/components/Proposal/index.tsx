import React, { useState } from "react";
import OngoingProposal from "./Ongoing";

const Proposal = () => {
    const [active, setActive] = useState<"ongoing" | "done">("ongoing");
    return (
        <div className="flex flex-col w-full">
            <ul className="menu menu-horizontal bg-base-200 rounded-box font-bold">
                <li>
                    <a className={`${active === "ongoing" ? "active" : ""}`} onClick={() => setActive("ongoing")}>
                        ONGOING
                    </a>
                </li>
                <li>
                    <a className={`${active === "done" ? "active" : ""}`} onClick={() => setActive("done")}>
                        DONE
                    </a>
                </li>
            </ul>
            <div className="w-full flex flex-col mt-[30px]">
                {
                    active === "ongoing" ? <OngoingProposal /> : <></>
                }
            </div>
        </div>
    )
}

export default Proposal;