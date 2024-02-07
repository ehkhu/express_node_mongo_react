"use client";
import { useState } from "react";
import { useTickets } from "./useTickets";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TicketRow } from "./TicketRow";
import { Empty } from "@/ui/Empty";

const tHeads = [
  "title",
  "description",
  "status",
  "created by",
  "Assign to",
  "created at",
  "",
];

export function TicketsTable() {
  const { isLoading, tickets, error } = useTickets();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  // let counts;

  if (isLoading) return "Loading...";
  if (error) return "Data Fatching Error";
  if (!tickets) return <Empty resourceName="tickets" />;
  if (!tickets.data.tickets.length) return <Empty resourceName="ticket" />;
  if (tickets) {
    // console.log(tickets.data.tickets);
  }

  function handelCheck(ticketId: number) {
    if (Array.from(selectedIds).includes(ticketId)) {
      removeTicketId(ticketId);
    } else {
      addNewTicketId(ticketId);
    }
  }

  // add a new ticketId
  const addNewTicketId = (newId: any) => {
    setSelectedIds((prevIds: any) => new Set([...prevIds, newId]));
  };

  const removeTicketId = (idToRemove: any) => {
    setSelectedIds((prevIds) => {
      const newIds = new Set(prevIds);
      newIds.delete(idToRemove);
      return newIds;
    });
  };
  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              {tHeads.map((row, index) => (
                <TableHead key={index}>
                  <span className="capitalize">{row}</span>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TBody
            data={tickets.data.tickets}
            render={(ticket: any) => (
              <TicketRow
                key={ticket._id}
                ticket={ticket}
                selectedIds={selectedIds}
                onHandlecheck={handelCheck}
              />
            )}
          />
          <TableFooter>
            <TableRow>
              <TableCell colSpan={tHeads.length + 1}>
                <div className="flex items-center justify-between">
                  <div className="flex-1 text-sm text-muted-foreground">
                    Total  {tickets.data.tickets.length} row(s)
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  );
}

function TBody({ data, render }: any) {
  if (!data.length)
    return (
      <TableBody>
        <TableRow>
          <TableCell>
            <Empty resourceName="ticket" />
          </TableCell>
        </TableRow>
      </TableBody>
    );
  return <TableBody>{data.map(render)}</TableBody>;
}
export default TicketsTable;
