import Link from "next/link"

const MisatoID = () => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col items-center justify-center gap-[20px] border border-black p-[20px]">
                <div className="avatar">
                    <div className="w-[90px] rounded-full">
                        <img src="/misato.png" />
                    </div>
                </div>
                <div className="font-bold">Misato</div>
                <div className="text-[12px]">
                    After wrapping up her Evangelion career, Misato has become your enthusiastic assistant! Like many young lady, she&apos;s into MBTI personality analysis and tarot readings, with her sights set on becoming a master in both.
                </div>
                <div className="text-[12px]">
                    <div className="flex flex-row">The voting rights token: $MISATO
                        <Link href="https://basescan.org/address/0x98f4779FcCb177A6D856dd1DfD78cd15B7cd2af5#code" target="_blank" prefetch={false} className="text-[#2B39FF] underline">
                            scan
                        </Link>
                    </div>
                    <div>Chain: BASE</div>
                </div>
            </div>
        </div>
    )
}

export default MisatoID