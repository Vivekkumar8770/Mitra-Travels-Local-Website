"use client";

import Link from "next/link";
import { Home } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function labelFor(segment: string) {
  return decodeURIComponent(segment)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function SiteBreadcrumbBar() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  if (!segments.length || segments[0] === "admin") return null;

  return (
    <div className="site-breadcrumb-bar">
      <div className="container-shell">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link href="/" className="inline-flex items-center gap-1.5"><Home className="size-3.5" />Home</Link></BreadcrumbLink>
            </BreadcrumbItem>
            {segments.map((segment, index) => {
              const href = `/${segments.slice(0, index + 1).join("/")}`;
              const last = index === segments.length - 1;
              return (
                <span className="contents" key={href}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {last ? <BreadcrumbPage>{labelFor(segment)}</BreadcrumbPage> : <BreadcrumbLink asChild><Link href={href}>{labelFor(segment)}</Link></BreadcrumbLink>}
                  </BreadcrumbItem>
                </span>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
