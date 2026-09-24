"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const fieldClass =
  "w-full rounded-none border-0 border-b-[3px] border-[#c99a2e] bg-transparent py-2.5 pl-7 font-semibold tracking-wide text-[#fdf9ef] caret-[#e6c157] placeholder-[#fdf9ef]/65 outline-none [text-shadow:0_1px_6px_rgba(0,0,0,0.85),_0_1px_2px_rgba(0,0,0,0.9)] transition focus:border-[#e6c157] focus:shadow-[0_4px_10px_-2px_rgba(201,154,46,0.55)]";

const iconClass =
  "pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-[#c99a2e]";

export default function LoginForm({ onSwitch }) {
  const router = useRouter();
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const update = (field) => (e) =>
    setValues((v) => ({ ...v, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      router.push("/welcome");
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <div className="relative">
        <Mail className={iconClass} />
        <input
          type="email"
          required
          placeholder="Email"
          value={values.email}
          onChange={update("email")}
          className={`${fieldClass} pr-1`}
        />
      </div>

      <div className="relative">
        <Lock className={iconClass} />
        <input
          type={showPassword ? "text" : "password"}
          required
          placeholder="Password"
          value={values.password}
          onChange={update("password")}
          className={`${fieldClass} pr-7`}
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-1 top-1/2 -translate-y-1/2 text-[#c99a2e] transition hover:text-[#e6c157]"
        >
          {showPassword ? (
            <EyeOff className="h-[18px] w-[18px] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]" />
          ) : (
            <Eye className="h-[18px] w-[18px] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]" />
          )}
        </button>
      </div>

      {error && (
        <p className="rounded-full bg-red-50 px-4 py-2 text-center text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="group relative w-full overflow-hidden rounded-full py-3 text-base font-semibold text-white shadow-lg shadow-black/20 transition disabled:opacity-60"
      >
        <span className="absolute inset-y-0 left-0 flex h-full w-[200%] transition-transform duration-700 ease-in-out group-hover:-translate-x-1/2">
          <span
            className="h-full w-1/2 shrink-0"
            style={{ background: "linear-gradient(135deg, #b3541e 50%, #c99a2e 50%)" }}
          />
          <span
            className="h-full w-1/2 shrink-0"
            style={{ background: "linear-gradient(135deg, #c99a2e 50%, #b3541e 50%)" }}
          />
        </span>
        <span className="relative">
          {loading ? "Signing in..." : "Sign In"}
        </span>
      </button>

      <div className="flex items-center justify-center gap-6 text-sm">
        <button
          type="button"
          className="font-semibold text-[#fdf9ef]/90 underline-offset-4 [text-shadow:0_1px_6px_rgba(0,0,0,0.85),_0_1px_2px_rgba(0,0,0,0.9)] transition hover:text-[#c99a2e] hover:underline"
        >
          Forgot Password
        </button>
        <button
          type="button"
          onClick={onSwitch}
          className="font-semibold text-[#fdf9ef]/90 underline-offset-4 [text-shadow:0_1px_6px_rgba(0,0,0,0.85),_0_1px_2px_rgba(0,0,0,0.9)] transition hover:text-[#c99a2e] hover:underline"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}
