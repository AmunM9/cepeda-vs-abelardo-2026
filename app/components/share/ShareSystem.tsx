"use client";

import { useState, useCallback } from "react";
import ShareCard1x1 from "./ShareCard1x1";
import ShareCard9x16 from "./ShareCard9x16";
import ShareFAB from "./ShareFAB";
import Toast from "./Toast";

export default function ShareSystem() {
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleToast = useCallback((msg: string) => {
    setToastMsg(msg);
  }, []);

  const dismissToast = useCallback(() => {
    setToastMsg(null);
  }, []);

  return (
    <>
      {/* Off-screen cards for html2canvas capture */}
      <ShareCard1x1 />
      <ShareCard9x16 />

      {/* Floating action button */}
      <ShareFAB onToast={handleToast} />

      {/* Toast notifications */}
      <Toast message={toastMsg} onDismiss={dismissToast} />
    </>
  );
}

export { default as ShareCTA } from "./ShareCTA";
