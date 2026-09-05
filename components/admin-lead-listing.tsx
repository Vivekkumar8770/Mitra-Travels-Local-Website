"use client";

import { useMemo, useState } from "react";
import { Filter, Pencil, RotateCcw, Search, Trash2, X } from "lucide-react";
import { toast } from "sonner";

export type AdminEnquiry = {
  id: number;
  name: string;
  phone: string;
  email: string;
  destination: string;
  packageName: string;
  pickupCity: string;
  travelDate: string;
  travellers: number;
  message: string;
  status: string;
  notes: string;
  createdAt: string;
};

type FilterState = {
  name: string;
  phone: string;
  email: string;
  destination: string;
  packageName: string;
  status: string;
  travelFrom: string;
  travelTo: string;
  createdFrom: string;
  createdTo: string;
  travellers: string;
};

const statuses = ["All", "New", "Contacted", "Follow-up", "Quoted", "Converted", "Confirmed", "Closed"];
const emptyFilters: FilterState = { name: "", phone: "", email: "", destination: "", packageName: "", status: "All", travelFrom: "", travelTo: "", createdFrom: "", createdTo: "", travellers: "" };

function formatDate(value: string) {
  if (!value) return "Date flexible";
  const date = new Date(`${value.slice(0, 10)}T00:00:00`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function matches(value: string, filter: string) { return !filter || value.toLowerCase().includes(filter.toLowerCase()); }

export function AdminLeadListing({ items, onUpdated }: { items: AdminEnquiry[]; onUpdated: () => Promise<void> }) {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("All");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const [editingId, setEditingId] = useState<number | null>(null);

  const filtered = useMemo(() => items.filter((item) => {
    const haystack = `${item.name} ${item.phone} ${item.email} ${item.destination} ${item.packageName}`;
    const effectiveStatus = filters.status !== "All" ? filters.status : tab;
    const travelDate = item.travelDate?.slice(0, 10) || "";
    const createdDate = item.createdAt?.slice(0, 10) || "";
    return (effectiveStatus === "All" || item.status === effectiveStatus)
      && matches(haystack, query)
      && matches(item.name, filters.name)
      && matches(item.phone, filters.phone)
      && matches(item.email, filters.email)
      && matches(item.destination, filters.destination)
      && matches(item.packageName, filters.packageName)
      && (!filters.travelFrom || travelDate >= filters.travelFrom)
      && (!filters.travelTo || travelDate <= filters.travelTo)
      && (!filters.createdFrom || createdDate >= filters.createdFrom)
      && (!filters.createdTo || createdDate <= filters.createdTo)
      && (!filters.travellers || item.travellers === Number(filters.travellers));
  }), [items, query, tab, filters]);

  function setFilter(key: keyof FilterState, value: string) { setFilters((current) => ({ ...current, [key]: value })); }
  function resetFilters() { setQuery(""); setTab("All"); setFilters(emptyFilters); }

  async function update(item: AdminEnquiry, status: string, notes: string) {
    try {
      const response = await fetch("/api/enquiries", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: item.id, status, notes }) });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || "Unable to update enquiry.");
      toast.success("Enquiry updated");
      await onUpdated();
    } catch (error) { toast.error(error instanceof Error ? error.message : "Unable to update enquiry."); }
  }

  async function remove(item: AdminEnquiry) {
    if (!window.confirm(`Delete enquiry from ${item.name}? This cannot be undone.`)) return;
    try {
      const response = await fetch(`/api/enquiries?id=${item.id}`, { method: "DELETE" });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || "Unable to delete enquiry.");
      toast.success("Enquiry deleted");
      await onUpdated();
    } catch (error) { toast.error(error instanceof Error ? error.message : "Unable to delete enquiry."); }
  }

  return <section className="crm-enquiry-page">
    <div className="crm-enquiry-toolbar">
      <div className="admin-search"><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, phone, email, destination or package..." /></div>
      <button type="button" className={`admin-btn ${advancedOpen ? "primary" : ""}`} onClick={() => setAdvancedOpen((open) => !open)}><Filter />Advanced Filters</button>
      <button type="button" className="admin-btn" onClick={resetFilters}><RotateCcw />Reset</button>
    </div>
    {advancedOpen && <div className="crm-advanced-filters"><label><span>Customer name</span><input value={filters.name} onChange={(event) => setFilter("name", event.target.value)} /></label><label><span>Phone number</span><input value={filters.phone} onChange={(event) => setFilter("phone", event.target.value)} /></label><label><span>Email</span><input value={filters.email} onChange={(event) => setFilter("email", event.target.value)} /></label><label><span>Destination</span><input value={filters.destination} onChange={(event) => setFilter("destination", event.target.value)} /></label><label><span>Package</span><input value={filters.packageName} onChange={(event) => setFilter("packageName", event.target.value)} /></label><label><span>Status</span><select value={filters.status} onChange={(event) => setFilter("status", event.target.value)}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></label><label><span>Travel date from</span><input type="date" value={filters.travelFrom} onChange={(event) => setFilter("travelFrom", event.target.value)} /></label><label><span>Travel date to</span><input type="date" value={filters.travelTo} onChange={(event) => setFilter("travelTo", event.target.value)} /></label><label><span>Created from</span><input type="date" value={filters.createdFrom} onChange={(event) => setFilter("createdFrom", event.target.value)} /></label><label><span>Created to</span><input type="date" value={filters.createdTo} onChange={(event) => setFilter("createdTo", event.target.value)} /></label><label><span>Travellers</span><input type="number" min="1" value={filters.travellers} onChange={(event) => setFilter("travellers", event.target.value)} /></label><div className="crm-filter-actions"><button type="button" className="admin-btn primary" onClick={() => setAdvancedOpen(false)}>Apply Filters</button><button type="button" className="admin-btn" onClick={resetFilters}>Reset Filters</button></div></div>}
    <div className="lead-filter-row">{statuses.map((status) => <button type="button" key={status} className={tab === status ? "active" : ""} onClick={() => { setTab(status); setFilter("status", "All"); }}>{status}<small>{status === "All" ? items.length : items.filter((item) => item.status === status).length}</small></button>)}</div>
    <div className="crm-table-scroll"><table className="crm-enquiry-table"><thead><tr><th>No.</th><th>Customer</th><th>Contact</th><th>Travel plan</th><th>Travel date</th><th>Travellers</th><th>Status</th><th>Actions</th></tr></thead><tbody>{filtered.map((item, index) => <tr key={item.id}><td className="crm-number">{String(index + 1).padStart(2, "0")}</td><td><div className="crm-customer"><span className="lead-avatar">{item.name.trim().slice(0, 1).toUpperCase()}</span><span><b>{item.name}</b><small>Lead #{item.id}</small></span></div></td><td><div className="crm-cell-stack"><a href={`tel:${item.phone}`}>{item.phone}</a><small>{item.email || "No email provided"}</small></div></td><td><div className="crm-cell-stack"><b>{item.destination}</b><small>{item.packageName || "Custom enquiry"}</small></div></td><td>{formatDate(item.travelDate)}</td><td>{item.travellers} {item.travellers === 1 ? "Traveller" : "Travellers"}</td><td><span className={`lead-status status-${item.status.toLowerCase().replace(/[^a-z]+/g, "-")}`}>{item.status}</span></td><td><div className="crm-row-actions"><button type="button" className="admin-icon-btn" title="Edit enquiry" onClick={() => setEditingId(editingId === item.id ? null : item.id)}><Pencil /></button><button type="button" className="admin-icon-btn danger" title="Delete enquiry" onClick={() => void remove(item)}><Trash2 /></button></div></td></tr>)}{!filtered.length && <tr><td colSpan={8}><div className="empty-state">No enquiries match these filters.</div></td></tr>}</tbody></table></div>
    {editingId && <div className="crm-edit-panel"><div><b>Edit enquiry</b><button type="button" className="admin-icon-btn" onClick={() => setEditingId(null)}><X /></button></div>{(() => { const item = items.find((entry) => entry.id === editingId); if (!item) return null; return <div className="crm-edit-fields"><label><span>Status</span><select defaultValue={item.status} onChange={(event) => void update(item, event.target.value, item.notes)}>{statuses.slice(1).map((status) => <option key={status}>{status}</option>)}</select></label><label><span>Internal notes</span><textarea defaultValue={item.notes} rows={3} onBlur={(event) => void update(item, item.status, event.target.value)} /></label></div>; })()}</div>}
  </section>;
}
