"use client";

import { Minus, Plus, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { RxExit } from "react-icons/rx";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

type ReactPdfModule = {
  Document: typeof import("react-pdf").Document;
  Page: typeof import("react-pdf").Page;
  pdfjs: typeof import("react-pdf").pdfjs;
};

type PdfViewerProps = {
  src: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function PdfViewer({ src, title, isOpen, onClose }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageWidth, setPageWidth] = useState(700);
  const [pdfModule, setPdfModule] = useState<ReactPdfModule | null>(null);
  const [zoom, setZoom] = useState(1);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadPdfModule = async () => {
      const mod = await import("react-pdf");
      const { Document, Page, pdfjs } = mod;

      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url,
      ).toString();

      if (isMounted) {
        setPdfModule({ Document, Page, pdfjs });
      }
    };

    loadPdfModule();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const updatePageWidth = () => {
      const viewportWidth = window.innerWidth;
      const baseWidth = Math.min(viewportWidth * 0.8, 760);
      setPageWidth(baseWidth * zoom);
    };

    updatePageWidth();
    window.addEventListener("resize", updatePageWidth);

    return () => window.removeEventListener("resize", updatePageWidth);
  }, [isOpen, zoom]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !scrollRef.current) return;

    const container = scrollRef.current;

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
        setZoom((prev) => {
          const next = Math.min(2.2, Math.max(0.8, prev + (event.deltaY < 0 ? 0.1 : -0.1)));
          return Number(next.toFixed(2));
        });
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => container.removeEventListener("wheel", handleWheel);
  }, [isOpen]);

  const changeZoom = (value: number) => {
    setZoom((prev) => Number(Math.min(2.2, Math.max(0.8, prev + value)).toFixed(2)));
  };

  if (!isOpen) return null;

  if (!pdfModule) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-md p-4">
        <div className="rounded-xl border border-white/20 bg-white/[0.08] px-6 py-4 text-sm text-gray-200 font-mono shadow-2xl backdrop-blur-2xl">
          Loading PDF…
        </div>
      </div>
    );
  }

  const { Document, Page } = pdfModule;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-md p-4">
      <div className="relative isolate w-full max-w-5xl overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-white/[0.13] via-white/[0.07] to-white/[0.04] shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl backdrop-saturate-150">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
        <div className="flex items-center justify-between gap-4 border-b border-white/15 bg-white/[0.04] px-4 py-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-blue-300 font-mono">
              PDF Preview
            </p>
            <h3 className="mt-1 text-md font-semibold text-white">{title}</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Zoom out"
              onClick={() => changeZoom(-0.1)}
              className="rounded-full border border-white/10 bg-white/5 p-2 text-gray-200 transition hover:border-blue-400 hover:text-white"
            >
              <Minus className="h-4 w-4" />
            </button>
            <div className="min-w-[64px] text-center text-xs font-mono text-blue-200">
              {Math.round(zoom * 100)}%
            </div>
            <button
              type="button"
              aria-label="Zoom in"
              onClick={() => changeZoom(0.1)}
              className="rounded-full border border-white/10 bg-white/5 p-2 text-gray-200 transition hover:border-blue-400 hover:text-white"
            >
              <Plus className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Reset zoom"
              onClick={() => setZoom(1)}
              className="rounded-full border border-white/10 bg-white/5 p-2 text-gray-200 transition hover:border-blue-400 hover:text-white"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Close PDF preview"
              onClick={onClose}
              className="rounded-full border border-white/10 bg-white/5 p-2 text-gray-200 transition hover:border-blue-400 hover:text-white"
            >
              <RxExit className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="max-h-[80vh] overflow-auto bg-black/15 p-4"
        >
          <div className="flex justify-center">
            <Document
              file={src}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              loading={<div className="py-12 text-center text-sm text-gray-300 font-mono">Loading PDF…</div>}
              error={<div className="py-12 text-center text-sm text-red-300 font-mono">Unable to load PDF.</div>}
            >
              {numPages ? (
                Array.from(new Array(numPages), (_, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    width={pageWidth}
                    className="mx-auto mb-4 rounded-xl shadow-lg shadow-slate-950/60"
                  />
                ))
              ) : null}
            </Document>
          </div>
        </div>
      </div>
    </div>
  );
}
