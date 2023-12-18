"use client";
import { useRef, useState } from "react";
import generatePDF from "react-to-pdf";

interface GeneratePdfProps {
  children: React.ReactNode;
}

const GeneratePdf = ({ children }: GeneratePdfProps) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [isDownnloading,setIsDownloading] = useState<boolean>(false)

  return (
    <main ref={targetRef}  className="bg-[#002548]">

      {isDownnloading && (
        <div className="absolute top-0 left-0 w-full h-full bg-[#002548] flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg">
            <h1 className="text-[#002548]">Downloading...</h1>
          </div>
        </div>
        
      )}

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
