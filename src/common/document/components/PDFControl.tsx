import "pdfjs-dist/web/pdf_viewer.css";
import { useContext, useEffect, useState } from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaCopy,
  FaSearchMinus,
  FaSearchPlus,
} from "react-icons/fa";
import { FaHighlighter, FaRegCommentDots } from "react-icons/fa6";
import { ViewerContext } from "../PDFViewer";

export default function PDFControls() {
  const { pageCount, tool, setState, scale, currentPage } =
    useContext(ViewerContext);

  const [inputValue, setInputValue] = useState(String(currentPage));

  useEffect(() => {
    setInputValue(String(currentPage));
  }, [currentPage]);

  const navigateToPage = (page: number) => {
    if (!(page <= pageCount && page >= 1)) {
      return;
    }

    setState((s) => ({ ...s, currentPage: page }));
    const target = document.querySelector(`[data-page-index="${page}"]`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const setTool = (t: Tool) => {
    setState((s) => ({ ...s, tool: t }));
  };

  const zoomIn = () => {
    setState((s) => ({ ...s, scale: s.scale ? s.scale * 1.2 : 1.2 }));
  };

  const zoomOut = () => {
    setState((s) => ({ ...s, scale: s.scale ? s.scale / 1.2 : 1 }));
  };

  return (
    <div className="bg-[#504f4f] text-white flex items-center justify-between px-4 h-10 absolute left-0 top-0 w-full md:px-6 lg:px-8 z-50">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="cursor-pointer hover:text-gray-300"
            onClick={() => navigateToPage(currentPage - 1)}
          >
            <FaAngleLeft />
          </button>
          <div className="flex items-center gap-1">
            <input
              className="w-12 px-1 bg-white text-black text-center rounded"
              value={inputValue}
              type="text"
              onChange={(e) => setInputValue(e.target.value)} // just update local state
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const num = Number(inputValue);
                  if (!Number.isNaN(num)) {
                    navigateToPage(num);
                  }
                }
              }}
              onBlur={() => {
                // If user clicks away, also try to navigate
                const num = Number(inputValue);
                if (!Number.isNaN(num)) {
                  navigateToPage(num);
                } else {
                  // reset if invalid
                  setInputValue(String(currentPage));
                }
              }}
            />
            <span>/</span>
            <span>{pageCount}</span>
          </div>
          <button
            type="button"
            className="cursor-pointer hover:text-gray-300"
            onClick={() => navigateToPage(currentPage + 1)}
          >
            <FaAngleRight />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setTool("highlight")}
            className={`cursor-pointer hover:text-gray-300 ${
              tool === "highlight" ? "text-yellow-400" : ""
            }`}
          >
            <FaHighlighter />
          </button>
          <button
            type="button"
            onClick={() => setTool("comment")}
            className={`cursor-pointer hover:text-gray-300 ${
              tool === "comment" ? "text-blue-400" : ""
            }`}
          >
            <FaRegCommentDots />
          </button>
          <button
            type="button"
            onClick={() => setTool("copy")}
            className={`cursor-pointer hover:text-gray-300 ${
              tool === "copy" ? "text-green-400" : ""
            }`}
          >
            <FaCopy />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="cursor-pointer hover:text-gray-300"
          onClick={zoomOut}
        >
          <FaSearchMinus />
        </button>
        <span className="text-sm">{Math.floor((scale || 1) * 100)}%</span>
        <button
          type="button"
          className="cursor-pointer hover:text-gray-300"
          onClick={zoomIn}
        >
          <FaSearchPlus />
        </button>
      </div>
    </div>
  );
}
