"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type Candidate = "cepeda" | "espriella";

interface CandidateToggleCtx {
  active: Candidate;
  toggle: () => void;
  set: (c: Candidate) => void;
}

const Ctx = createContext<CandidateToggleCtx>({
  active: "cepeda",
  toggle: () => {},
  set: () => {},
});

export function CandidateToggleProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<Candidate>("cepeda");

  const toggle = () => setActive((c) => (c === "cepeda" ? "espriella" : "cepeda"));
  const set = (c: Candidate) => setActive(c);

  return <Ctx.Provider value={{ active, toggle, set }}>{children}</Ctx.Provider>;
}

export function useCandidate() {
  return useContext(Ctx);
}
