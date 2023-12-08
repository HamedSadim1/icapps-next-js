"use client";
import { useRef } from "react";
import generatePDF from "react-to-pdf";

interface GeneratePdfProps {
  children: React.ReactNode;
}

const GeneratePdf = ({ children }: GeneratePdfProps) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  return (
    <main ref={targetRef} className="bg-[#002548]">
      <button
        className="absolute bg-[#002548] text-white p-5 rounded-lg mt-3 ml-3"
        onClick={() => generatePDF(targetRef, { filename: "Stage.pdf" })}
      >
        Download PDF
      </button>
      {children}
    </main>
  );
};

export default GeneratePdf;
