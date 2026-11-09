import type { ReactNode } from "react";

export default function BusyLabel({ busy, label, children }: { busy: boolean; label: string; children: ReactNode }) {
  return busy ? (
    <span className="inline-flex items-center justify-center gap-2" role="status" aria-live="polite">
      <span className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-current border-r-transparent" aria-hidden="true" />
      {label}
    </span>
  ) : children;
}
