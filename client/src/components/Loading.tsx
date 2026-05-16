import React from "react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050816] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] animate-ping" />

      {/* Loader Content */}
      <div className="relative flex flex-col items-center gap-6">
        {/* Spinner Ring */}
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-white/10" />
          <div className="absolute inset-0 rounded-full border-4 border-t-pink-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        </div>

        {/* Text */}
        <p className="text-gray-300 text-sm tracking-widest animate-pulse">
          Generating your interview strategy...
        </p>

        {/* Dots Loader */}
        <div className="flex gap-2">
          <span className="w-2.5 h-2.5 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2.5 h-2.5 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2.5 h-2.5 bg-pink-500 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;