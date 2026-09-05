"use client";

import { Landmark, Mountain } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PackageCard } from "@/components/package-card";
import type { TourPackage } from "@/lib/content";

export function PackageBrowser({ items }: { items: TourPackage[] }) {
  const all = items.filter((item) => item.active);
  return (
      <Tabs defaultValue="nepal" className="mt-10">
        <TabsList className="package-tabs h-auto rounded-xl bg-slate-100 p-1.5">
          <TabsTrigger value="nepal" className="package-tab rounded-lg px-5 py-3 text-sm data-[state=active]:bg-[#0a2a50] data-[state=active]:text-white"><Mountain className="size-4" />Nepal packages<span className="package-tab-caption">Himalayan journeys</span></TabsTrigger>
          <TabsTrigger value="india" className="package-tab rounded-lg px-5 py-3 text-sm data-[state=active]:bg-[#0a2a50] data-[state=active]:text-white"><Landmark className="size-4" />India packages<span className="package-tab-caption">Heritage & pilgrimage</span></TabsTrigger>
      </TabsList>
      <TabsContent value="nepal"><div className="package-browser-grid mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{all.filter((item) => item.country === "Nepal").map((item) => <PackageCard key={item.slug} item={item} />)}</div></TabsContent>
      <TabsContent value="india"><div className="package-browser-grid mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{all.filter((item) => item.country === "India").map((item) => <PackageCard key={item.slug} item={item} />)}</div></TabsContent>
    </Tabs>
  );
}
