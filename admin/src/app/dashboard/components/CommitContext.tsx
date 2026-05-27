"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "react-hot-toast";

interface CommitContextType {
  pendingCommits: number;
  setPendingCommits: (count: number) => void;
  commitAll: () => void;
  registerCommitAllHandler: (handler: () => void) => void;
}

const CommitContext = createContext<CommitContextType | undefined>(undefined);

export function CommitProvider({ children }: { children: ReactNode }) {
  const [pendingCommits, setPendingCommits] = useState(0);
  const [commitAllHandlers, setCommitAllHandlers] = useState<(() => void)[]>([]);

  const registerCommitAllHandler = React.useCallback((handler: () => void) => {
    setCommitAllHandlers((prev) => [...prev, handler]);
  }, []);

  const commitAll = () => {
    if (pendingCommits <= 1) return;

    // Execute all registered handlers (e.g. from Socials to save their local state)
    commitAllHandlers.forEach(handler => handler());

    setPendingCommits(0);
    toast.success("All changes successfully committed!");
  };

  return (
    <CommitContext.Provider value={{ pendingCommits, setPendingCommits, commitAll, registerCommitAllHandler }}>
      {children}
    </CommitContext.Provider>
  );
}

export function useCommit() {
  const context = useContext(CommitContext);
  if (!context) {
    throw new Error("useCommit must be used within a CommitProvider");
  }
  return context;
}
