export type LocalEnquiry = {
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
  status: "New" | "Contacted" | "Follow-up" | "Quoted" | "Converted" | "Confirmed" | "Closed";
  notes: string;
  createdAt: string;
  updatedAt: string;
};

type NewLocalEnquiry = Omit<LocalEnquiry, "id" | "status" | "notes" | "createdAt" | "updatedAt">;

const enquiries: LocalEnquiry[] = [];
let nextId = 1;

export function addLocalEnquiry(input: NewLocalEnquiry) {
  const now = new Date().toISOString();
  const enquiry: LocalEnquiry = { ...input, id: nextId++, status: "New", notes: "", createdAt: now, updatedAt: now };
  enquiries.unshift(enquiry);
  return enquiry;
}

export function listLocalEnquiries() {
  return enquiries;
}

export function updateLocalEnquiry(id: number, status: LocalEnquiry["status"], notes: string) {
  const enquiry = enquiries.find((item) => item.id === id);
  if (!enquiry) return false;
  enquiry.status = status;
  enquiry.notes = notes;
  enquiry.updatedAt = new Date().toISOString();
  return true;
}

export function deleteLocalEnquiry(id: number) {
  const index = enquiries.findIndex((item) => item.id === id);
  if (index < 0) return false;
  enquiries.splice(index, 1);
  return true;
}
