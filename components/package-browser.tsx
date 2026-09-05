"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PackageCard } from "@/components/package-card";
import type { TourPackage } from "@/lib/content";

export function PackageBrowser({ items }: { items: TourPackage[] }) {
  const all = items.filter((item) => item.active);
  return (
    <Tabs defaultValue="nepal" className="mt-10">
      <TabsList className="h-auto rounded-full bg-slate-100 p-1.5">
        <TabsTrigger value="nepal" className="rounded-full px-6 py-3 text-base data-[state=active]:bg-[#0a2a50] data-[state=active]:text-white">Nepal packages</TabsTrigger>
        <TabsTrigger value="india" className="rounded-full px-6 py-3 text-base data-[state=active]:bg-[#0a2a50] data-[state=active]:text-white">India packages</TabsTrigger>
      </TabsList>
      <TabsContent value="nepal"><div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{all.filter((item) => item.country === "Nepal").map((item) => <PackageCard key={item.slug} item={item} />)}</div></TabsContent>
      <TabsContent value="india"><div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{all.filter((item) => item.country === "India").map((item) => <PackageCard key={item.slug} item={item} />)}</div></TabsContent>
    </Tabs>
  );
}
