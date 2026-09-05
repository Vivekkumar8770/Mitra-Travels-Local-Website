export const leadStatuses = ["New", "Contacted", "Interested", "Follow-up", "Quotation Sent", "Booked", "Not Interested", "No Response", "Cancelled", "Lost"] as const;
export type LeadStatus = typeof leadStatuses[number];
export type LocalFollowUp = { id: number; enquiryId: number; followUpAt: string; method: string; conversationNotes: string; customerResponse: string; updatedStatus: string; nextFollowUpAt: string; addedBy: string; createdAt: string };
export type LocalEnquiry = { id: number; name: string; phone: string; alternatePhone: string; email: string; city: string; state: string; leadSource: string; destination: string; packageName: string; pickupCity: string; dropLocation: string; travelDate: string; travelEndDate: string; travellers: number; rooms: number; budget: string; message: string; status: LeadStatus; priority: string; nextFollowUpAt: string; assignedTo: string; quotationAmount: string; bookingStatus: string; dealValue: string; outcomeReason: string; notes: string; createdAt: string; updatedAt: string };
export type NewLocalEnquiry = Omit<LocalEnquiry, "id" | "createdAt" | "updatedAt">;

const enquiries: LocalEnquiry[] = [];
const followUps: LocalFollowUp[] = [];
let nextId = 1;
let nextFollowUpId = 1;

export function addLocalEnquiry(input: Omit<NewLocalEnquiry, "status" | "notes"> & Partial<Pick<NewLocalEnquiry, "status" | "notes">>) {
  const now = new Date().toISOString();
  const enquiry: LocalEnquiry = { ...input, id: nextId++, status: input.status || "New", notes: input.notes || "", createdAt: now, updatedAt: now };
  enquiries.unshift(enquiry);
  return enquiry;
}
export function listLocalEnquiries() { return enquiries; }
export function getLocalEnquiry(id: number) { return enquiries.find((item) => item.id === id); }
export function updateLocalEnquiry(id: number, changes: Partial<Omit<LocalEnquiry, "id" | "createdAt" | "updatedAt">>) {
  const enquiry = getLocalEnquiry(id);
  if (!enquiry) return false;
  Object.assign(enquiry, changes, { updatedAt: new Date().toISOString() });
  return true;
}
export function addLocalFollowUp(input: Omit<LocalFollowUp, "id" | "createdAt">) {
  const followUp = { ...input, id: nextFollowUpId++, createdAt: new Date().toISOString() };
  followUps.unshift(followUp);
  updateLocalEnquiry(input.enquiryId, { status: input.updatedStatus as LeadStatus, nextFollowUpAt: input.nextFollowUpAt });
  return followUp;
}
export function listLocalFollowUps(enquiryId: number) { return followUps.filter((item) => item.enquiryId === enquiryId); }
export function deleteLocalEnquiry(id: number) { const index = enquiries.findIndex((item) => item.id === id); if (index < 0) return false; enquiries.splice(index, 1); for (let followUpIndex = followUps.length - 1; followUpIndex >= 0; followUpIndex--) if (followUps[followUpIndex].enquiryId === id) followUps.splice(followUpIndex, 1); return true; }
