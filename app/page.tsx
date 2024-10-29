"use client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Proposal from "./components/Proposal";
import Menu from "./components/Menu";
import MisatoID from "./components/ID";

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center pb-[50px] max-w-[100vw] overflow-x-hidden">
      <Header />
      <div className="w-full mt-[100px] pc:px-[50px] px-[20px]">
        <div className="flex flex-row items-start justify-between gap-[20px]">
          <div className="w-[200px]">
            <Menu />
          </div>
          <div className="flex-grow">
            <Proposal />
          </div>
          <div className="w-[260px]">
            <MisatoID />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
