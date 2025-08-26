"use client";

import React from "react";
import { MultiStepLoader as Loader } from "./ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";

interface MultiStepLoaderProps {
  loadingStates: { text: string }[];
  loading: boolean;
  duration?: number;
  onClose?: () => void;
}

export function MultiStepLoaderDemo({ loadingStates, loading, duration = 2000, onClose }: MultiStepLoaderProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative">
        <Loader loadingStates={loadingStates} loading={loading} duration={duration} />
        {loading && onClose && (
          <button
            className="fixed top-4 right-4 text-white z-[120]"
            onClick={onClose}
          >
            <IconSquareRoundedX className="h-10 w-10" />
          </button>
        )}
      </div>
    </div>
  );
}