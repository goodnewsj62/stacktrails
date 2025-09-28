"use client";
import { getImageProxyUrl } from "@/lib/utils";
import * as pdfjsLib from "pdfjs-dist";

import "pdfjs-dist/web/pdf_viewer.css";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaCopy,
  FaSearchMinus,
  FaSearchPlus,
} from "react-icons/fa";
import { FaHighlighter, FaRegCommentDots } from "react-icons/fa6";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

type Highlight = {
  page: number;
  text: string;
  lines: number[];
  comment?: string;
  id: string;
};

interface PdfViewerProps {
  url: string;
}

const initialState = {
  pageCount: 0,
  pdfDoc: undefined,
  scale: null,
};

type ViewerContextType = {
  setState: (v: typeof initialState) => void;
  pdfDoc: pdfjsLib.PDFDocumentProxy | undefined;
  scale: null | number;
  pageCount: number;
};

const ViewerProvider = createContext<ViewerContextType>(initialState as any);

export default function PdfViewer({ url }: PdfViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // const [pageCount, setPageCount] = useState(0);
  // const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | undefined>();
  // const [scale, setScale] = useState<number | null>(null); // computed once

  const [viewerState, setViewerState] = useState<ViewerContextType>(
    initialState as any
  );

  const { pdfDoc, scale } = viewerState;

  useEffect(() => {
    const loadPdf = async () => {
      const doc = await pdfjsLib.getDocument(getImageProxyUrl(url)).promise;
      setViewerState((s) => ({ ...s, pdfDoc: doc }));
      setViewerState((s) => ({ ...s, pageCount: doc.numPages }));
    };
    loadPdf();
  }, [url]);

  useEffect(() => {
    if (!pdfDoc) return;

    const renderAllPages = async () => {
      const container = containerRef.current!;
      container.innerHTML = ""; // clear before re-rendering

      for (let num = 1; num <= pdfDoc.numPages; num++) {
        const page = await pdfDoc.getPage(num);
        const unscaledVp = page.getViewport({ scale: 1 });

        // compute scale once from container width (same for all pages)
        let effectiveScale = scale;
        if (scale === null) {
          const containerWidth = container.clientWidth;
          effectiveScale = containerWidth / unscaledVp.width;
          setViewerState((s) => ({ ...s, scale: effectiveScale }));
        }

        const vp = page.getViewport({ scale: effectiveScale! });

        // Wrapper for canvas + overlay
        const wrapper = document.createElement("div");
        wrapper.className = "relative mb-4";

        // Canvas for PDF page
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        canvas.width = vp.width;
        canvas.height = vp.height;
        canvas.style.width = `${vp.width}px`;
        canvas.style.height = `${vp.height}px`;
        canvas.className = "block";

        // Overlay div (absolute positioned)
        const overlay = document.createElement("div");
        overlay.className = "absolute top-0 left-0 pointer-events-none"; // we can toggle pointer-events later
        overlay.style.width = `${vp.width}px`;
        overlay.style.height = `${vp.height}px`;
        overlay.style.border = `4px solid green`;
        overlay.style.zIndex = "10";

        wrapper.appendChild(canvas);
        wrapper.appendChild(overlay);
        container.appendChild(wrapper);

        const outputScale = window.devicePixelRatio || 1;
        const transform =
          outputScale !== 1
            ? [outputScale, 0, 0, outputScale, 0, 0]
            : undefined;

        await page.render({
          canvasContext: ctx,
          viewport: vp,
          transform,
          canvas,
        }).promise;
      }
    };

    renderAllPages();
  }, [pdfDoc, scale]);

  return (
    <ViewerProvider value={{ ...viewerState }}>
      <div className="w-full relative pt-10 h-full flex flex-col items-center bg-[#242323]">
        <PDFControls />
        <div
          id="pdf-container"
          ref={containerRef}
          className="relative w-full max-w-[800px] overflow-y-auto h-full border-2 m-auto flex flex-col items-center"
        ></div>
      </div>
    </ViewerProvider>
  );
}

function PDFControls() {
  const { pageCount } = useContext(ViewerProvider);

  return (
    <div className="bg-[#504f4f] text-white flex items-center justify-between px-4 h-10 absolute left-0 top-0 w-full md:px-6 lg:px-8">
      {/* Left Controls (Tools + Page Navigation) */}
      <div className="flex items-center gap-4">
        {/* Page Navigation */}
        <div className="flex items-center gap-2">
          <button type="button" className="cursor-pointer hover:text-gray-300">
            <FaAngleLeft />
          </button>
          <div className="flex items-center gap-1">
            <input
              className="w-8 px-1 bg-white text-black text-center rounded"
              value={"1"}
              type="text"
            />
            <span>/</span>
            <span>{pageCount}</span>
          </div>
          <button type="button" className="cursor-pointer hover:text-gray-300">
            <FaAngleRight />
          </button>
        </div>

        {/* Tools */}
        <div className="flex items-center gap-4">
          <button type="button" className="cursor-pointer hover:text-gray-300">
            <FaHighlighter />
          </button>
          <button type="button" className="cursor-pointer hover:text-gray-300">
            <FaRegCommentDots />
          </button>
          <button type="button" className="cursor-pointer hover:text-gray-300">
            <FaCopy />
          </button>
        </div>
      </div>

      {/* Right Controls (Zoom) */}
      <div className="flex items-center gap-2">
        <button type="button" className="cursor-pointer hover:text-gray-300">
          <FaSearchMinus />
        </button>
        <span className="text-sm">100%</span>
        <button type="button" className="cursor-pointer hover:text-gray-300">
          <FaSearchPlus />
        </button>
      </div>
    </div>
  );
}
