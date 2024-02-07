import axios from "@/lib/axios";

export async function getTickets() {
  const response = await axios.get(
    "/api/v1/tickets",
  );
  return response.data;
}

export async function getAllTickets() {
  const response = await axios.get(
    "/api/all_expense_types");
  return response.data;
}

export async function storeTicket(newTicket:any) {
  return axios.post("/api/v1/tickets", newTicket)
}

export async function updateTicket(ticket:any,id:number) {
  return axios.patch("/api/v1/tickets/"+id, ticket)
}

export async function destoryTicket(id:number) {
  return axios.delete("/api/v1/tickets/"+id)
}

export async function reviewTicket(id:number,info:any) {
  return axios.patch("/api/v1/tickets/review/"+id,info)
}

export async function getTicket({id}:any) {
  const response = await axios.get(
    "/api/v1/tickets/"+id);
  return response.data;
}