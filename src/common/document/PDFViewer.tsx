"use client";

import { getImageProxyUrl } from "@/lib/utils";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";
import React, { createContext, useEffect, useRef, useState } from "react";
import PdfPage from "./PDFPage";
import PDFControls from "./components/PDFControl";

// --- PDF.js WORKER SETUP ---
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

// --- STATE AND CONTEXT DEFINITION ---
const initialState = {
  pdfDoc: undefined as pdfjsLib.PDFDocumentProxy | undefined,
  pageCount: 0,
  scale: null as number | null,
  tool: "select" as Tool,
  highlights: [] as Highlight[],
  currentPage: 1, // Start at page 1
};

type ViewerContextType = typeof initialState & {
  setState: React.Dispatch<React.SetStateAction<typeof initialState>>;
  addHighlight: (highlight: Omit<Highlight, "id">) => void;
  deleteHighlight: (id: string) => void;
};

export const ViewerContext = createContext<ViewerContextType>(null as any);

// --- MAIN VIEWER COMPONENT ---
export default function PdfViewer({ url }: { url: string }) {
  const [viewerState, setViewerState] = useState(initialState);
  const containerRef = useRef<HTMLDivElement>(null);

  // NEW: Store the observer instance in a ref
  const observer = useRef<IntersectionObserver | null>(null);

  // Load the PDF document
  useEffect(() => {
    const loadPdf = async () => {
      try {
        const doc = await pdfjsLib.getDocument(getImageProxyUrl(url)).promise;
        setViewerState((s) => ({
          ...s,
          pdfDoc: doc,
          pageCount: doc.numPages,
        }));
      } catch (error) {
        console.error("Failed to load PDF:", error);
      }
    };
    loadPdf();
  }, [url]);

  useEffect(() => {
    if (!containerRef.current) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Get the page number from the data attribute

            const pageNum = entry.target.getAttribute("data-page-index");
            if (pageNum) {
              setViewerState((s) => ({
                ...s,
                currentPage: parseInt(pageNum, 10),
              }));
            }
          }
        });
      },
      {
        root: containerRef.current, // The scrollable container
        threshold: 0.3, // 50% of the page must be visible
        // rootMargin: `-40px 0px 0px 0px`,
      }
    );

    // Cleanup function to disconnect the observer
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []); // Run this effect only once

  // Function to add a new highlight
  const addHighlight = (highlight: Omit<Highlight, "id">) => {
    setViewerState((s) => ({
      ...s,
      highlights: [
        ...s.highlights,
        { ...highlight, id: `${Date.now()}-${Math.random()}` },
      ],
    }));
  };

  // Function to delete a highlight
  const deleteHighlight = (id: string) => {
    setViewerState((s) => ({
      ...s,
      highlights: s.highlights.filter((h) => h.id !== id),
    }));
  };

  return (
    <ViewerContext.Provider
      value={{
        ...viewerState,
        setState: setViewerState,
        addHighlight,
        deleteHighlight,
      }}
    >
      <div className="w-full pt-10 relative h-full flex flex-col items-center bg-[#242323]">
        <PDFControls />
        <div
          id="pdf-container"
          ref={containerRef}
          className="relative w-full max-w-[800px] overflow-y-auto h-full m-auto"
        >
          {viewerState.pdfDoc &&
            Array.from({ length: viewerState.pageCount }, (_, i) => (
              <PdfPage
                key={i + 1}
                pageNum={i + 1}
                containerRef={containerRef as any}
                observer={observer.current}
              />
            ))}
        </div>
      </div>
    </ViewerContext.Provider>
  );
}
