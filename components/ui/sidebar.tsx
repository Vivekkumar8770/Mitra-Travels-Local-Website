import * as React from "react";

export function SidebarMenuSkeleton({ className = "" }: { className?: string }) {
  return <div className={`h-8 rounded-md bg-muted ${className}`.trim()} style={{ "--skeleton-width": "70%" } as React.CSSProperties} aria-hidden="true" />;
}
