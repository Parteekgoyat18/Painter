"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import VideoBackground from "@/components/background/VideoBackground";
import RingsBackground from "@/components/background/RingsBackground";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthCard() {
  const [mode, setMode] = useState("login");
  const isRegister = mode === "register";

  return (
    <div className="relative flex h-dvh items-center justify-center overflow-hidden bg-slate-900 p-4">
      <VideoBackground />
      <RingsBackground />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_400px_430px_at_center,_rgba(255,255,255,0.42)_0%,_rgba(255,255,255,0.16)_55%,_rgba(255,255,255,0)_78%)]"
      />

      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 flex w-full max-w-sm max-h-full flex-col items-center gap-4 overflow-y-auto px-4 py-6 sm:gap-5 sm:py-10"
        >
          <h1
            className="text-3xl font-bold tracking-tight text-[#1f4a34] sm:text-4xl"
            style={{ textShadow: "0 1px 10px rgba(255,255,255,0.9), 0 1px 3px rgba(255,255,255,0.9)" }}
          >
            {isRegister ? "Register" : "Login"}
          </h1>

          {mode === "login" ? (
            <LoginForm onSwitch={() => setMode("register")} />
          ) : (
            <RegisterForm onSwitch={() => setMode("login")} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
